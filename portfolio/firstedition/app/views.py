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
  first_entry = user.entry_set.all()[4]
  first_entry_line_list = first_entry.drawing.split()
  return render(request, 'app/temple.html', {'username': '', 'entry': int(first_entry_line_list[0])})
def gastroobscura(request):
  template = loader.get_template('app/gastroobscura.html')
  return HttpResponse(template.render({}, request))
def vitamins(request):
  template = loader.get_template('app/vitamins.html')
  return HttpResponse(template.render({}, request))
