from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render
from django.http import JsonResponse
from .models import User, Entry, Place
from datetime import datetime, date
import time
import geopy.distance


def index(request):
  template = loader.get_template('app/index.html')
  return HttpResponse(template.render({}, request))

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
  u = request.POST.get("username")
  password = request.POST.get("password")
  print("password: ", password)
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
  u = request.POST.get("username")
  p = request.POST.get("password")
  return render(request, 'app/gastroobscura.html', {'username': u,
                                                    'password': p})

def vitamins(request):
  u = request.POST.get("username")
  p = request.POST.get("password")
  return render(request, 'app/vitamins.html', {'username': u,
                                               'password': p})
