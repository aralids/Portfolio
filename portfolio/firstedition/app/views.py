from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render
from django.http import JsonResponse
from .models import User, Entry
from datetime import datetime
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
    obj, created = user.entry_set.get_or_create(day=datetime.today().strftime('%Y-%m-%d'))
    if created:
      obj.save()
    new_line = request.POST.get('line')
    new_line_list = new_line.split()
    response = ''
    for i in range(0, len(new_line_list), 4):
      four = ' '.join(new_line_list[i:i+4])
      if not (four in obj.drawing):
        obj.drawing += four + " "
        obj.save()
        response += four + " "
  return HttpResponse(response)

def temple(request):
  username = ''
  user = User.objects.get(username='')
  entries = user.entry_set.all()
  paths = []
  for entry in entries:
    drawing = entry.drawing
    drawing_list = drawing.split()
    drawing_list = [int(parameter) for parameter in drawing_list]
    for i in range(0, len(drawing_list), 4):
      path = drawing_list[i:i+4]
      paths.append(path)
  return render(request, 'app/temple.html', {'username': '',
                                             'entries': entries,
                                             'paths': paths})

def gastroobscura(request):
  template = loader.get_template('app/gastroobscura.html')
  return HttpResponse(template.render({}, request))

def vitamins(request):
  template = loader.get_template('app/vitamins.html')
  return HttpResponse(template.render({}, request))
