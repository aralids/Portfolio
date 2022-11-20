from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render
from django.http import JsonResponse
from .models import User, Entry
from datetime import datetime, date
import time

def index(request):
  template = loader.get_template('app/index.html')
  return HttpResponse(template.render({}, request))

def update(request):
  user = User.objects.get(username='')
  entries = user.entry_set.all()
  for entry in entries:
    drawing = entry.drawing
    drawing_list = drawing.split()
    drawing_list = [int(parameter) for parameter in drawing_list]
    paths = []
    for i in range(0, len(drawing_list), 4):
      path = drawing_list[i:i+4]
      paths.append(path)
  if request.method == "POST":
    date = request.POST.get('day')
    obj, created = user.entry_set.get_or_create(day=date)
    print("date from JS: ", date)
    if created:
      obj.save()
    new_line = request.POST.get('line')
    obj.drawing += new_line
    obj.save()
  return HttpResponse("")

def temple(request):
  u = request.POST.get("username")
  print("username: ", u)
  user = User.objects.get(username=u)
  entries = user.entry_set.all()
  log = {}
  paths = []
  for entry in entries:
    drawing = entry.drawing
    drawing_list = drawing.split()
    drawing_list = [int(parameter) for parameter in drawing_list]
    for i in range(0, len(drawing_list), 4):
      path = drawing_list[i:i+4]
      paths.append(path)
    log[entry.day] = paths
    paths = []
  print(log)
  return render(request, 'app/temple.html', {'entries': log,
                                             'username': u})

def gastroobscura(request):
  u = request.POST.get("username")
  return render(request, 'app/gastroobscura.html', {'username': u})

def vitamins(request):
  u = request.POST.get("username")
  return render(request, 'app/vitamins.html', {'username': u})
