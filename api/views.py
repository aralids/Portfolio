from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render
from django.http import JsonResponse
from .models import User, Entry, Place
from datetime import datetime, date
import time
import geopy.distance
import django
from django.core.exceptions import ObjectDoesNotExist
from requests_html import HTMLSession

def index(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render({}, request))

def save_associations(request):
  print("save_assoc request: ", request.POST)
  user = User.objects.get(username=request.POST.get('username'))
  day = request.POST.get('day')
  entry = user.entry_set.get(day=day)
  obj, created = entry.associations_set.get_or_create(entry=entry)
  if created:
    print("Created!")
    obj.save()
  print("object.text: ", obj.text)
  obj.text = request.POST.get('new_text')
  print("object.text: ", obj.text)
  obj.images = request.POST.get('new_images')
  obj.links = request.POST.get('new_links')
  obj.save()
  return HttpResponse("")

def get_associations(request):
  print("get_associations(): ", request.POST)
  user = User.objects.get(username=request.POST.get('user'))
  day = request.POST.get('day')
  entry = user.entry_set.get(day=day)
  print("entry: ", entry)
  try:
    associations = entry.associations_set.all()[0]
    text = associations.text
    images = associations.files.split()
    images_actual_links = []
    session = HTMLSession()
    for image in images:
      r = session.get(image)
      actual_image = r.html.find('#image-viewer-container img')[0].search(' src={} ')[0]
      images_actual_links.append(actual_image)

    videos = associations.links.split()
    videos_actual_links = []
    for video in videos:
      actual_video = video.replace("watch?v=", "embed/")
      videos_actual_links.append(actual_video)

    
    associations = {"text":text, "images":images, "videos":videos, "imagesActual":images_actual_links, "videosActual":videos_actual_links}
    print("associations: ", associations)
  except IndexError:
    associations = {"text":"", "images":[], "videos":[], "imagesActual":[], "videosActual":[]}
  return JsonResponse(associations)

def update(request):
  user = User.objects.get(username=request.POST.get('username'))
  print("username: ", user)
  entries = user.entry_set.all()
  if request.method == "POST":
    date = request.POST.get('day')
    obj, created = user.entry_set.get_or_create(day=date)
    if created:
      obj.save()
    new_line = request.POST.get('line')
    print("obj.drawing", obj.drawing)
    obj.drawing += new_line
    print("obj.drawing mid", obj.drawing)
    obj.save()
    print("obj.drawing new", obj.drawing)
  return HttpResponse("")

def temple(request):
  a = django.middleware.csrf.get_token(request)
  u = request.POST.get("username")
  password = request.POST.get("password")
  user = User.objects.get(username=u)
  entries = user.entry_set.all()
  log = {}
  paths = []
  color = ""
  for entry in entries:
    log[(color, entry.day)] = []
    drawing = entry.drawing
    drawing_list = drawing.split()

    i = 0
    print("log[(color, entry.day)]: ", log[(color, entry.day)])
    while i < len(drawing_list):
      if drawing_list[i].startswith("#"):
        if paths != []:
          try:
            log[(color, entry.day)] += paths
          except KeyError:
            log[(color, entry.day)] = paths
          paths = []
        color = drawing_list[i]
        i += 1
        continue
      else:
        path = [int(parameter) for parameter in drawing_list[i:i+4]]
        paths.append(path)
        i += 4
        continue
    try:
      log[(color, entry.day)] += paths
    except KeyError:
      log[(color, entry.day)] = paths
    paths = []
  print(log)
  return render(request, 'app/temple.html', {'entries': log,
                                             'username': u,
                                             'password': password})

def get_geolocation(request):
  geoloc = request.POST.get("geoloc").split()
  geoloc = (float(geoloc[0]), float(geoloc[1]))
  places_coords = Place.objects.values_list('latitude', 'longtitude')
  places_distance = []
  for i in range(0, len(places_coords)):
    distance = geopy.distance.geodesic(geoloc, places_coords[i]).km
    places_distance.append(distance)
  smallest_k_elements_indices = sorted(range(len(places_distance)), key = lambda sub: places_distance[sub])[:5]

  smallest_k_elements = []
  for i in range(0, len(smallest_k_elements_indices)):
    smallest_k_elements.append(places_coords[smallest_k_elements_indices[i]])

  closest_k_places = []
  for i in range(0, len(smallest_k_elements)):
    closest_k_places.append(Place.objects.get(latitude = smallest_k_elements[i][0],
                                              longtitude = smallest_k_elements[i][1]))

  closest_k_places_values = {}
  for i in range(0, len(closest_k_places)):
    title = closest_k_places[i].title
    address = closest_k_places[i].adress.split("\n")
    link = closest_k_places[i].link
    image_links = closest_k_places[i].image_links.split()
    latitude = closest_k_places[i].latitude
    longitude = closest_k_places[i].longtitude
    place_values = {
      "title": title,
      "address": address,
      "link": link,
      "image_links": image_links,
      "latitude": latitude,
      "longitude": longitude
    }
    closest_k_places_values[i] = place_values
  print("place_values: ", closest_k_places_values)
  return JsonResponse(closest_k_places_values)

def gastroobscura(request):
  u = request.GET.get("username")
  p = request.GET.get("password")
  return render(request, 'app/gastroobscura.html', {'username': u,
                                                    'password': p})

def vitamins(request):
  u = request.GET.get("username")
  p = request.GET.get("password")
  return render(request, 'app/vitamins.html', {'username': u,
                                               'password': p})
