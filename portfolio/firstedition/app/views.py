from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render
from .models import User, Entry

def index(request):
  template = loader.get_template('app/index.html')
  return HttpResponse(template.render({}, request))
def temple(request):
  username = request.POST['username']
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
  return render(request, 'app/temple.html', {'username': '', 'entries': entries, 'paths': paths})
def gastroobscura(request):
  template = loader.get_template('app/gastroobscura.html')
  return HttpResponse(template.render({}, request))
def vitamins(request):
  template = loader.get_template('app/vitamins.html')
  return HttpResponse(template.render({}, request))
