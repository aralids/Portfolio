from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render

def index(request):
  template = loader.get_template('app/index.html')
  return HttpResponse(template.render({}, request))
def temple(request):
  user = request.POST['username']
  return render(request, 'app/temple.html', {'user': user})
def gastroobscura(request):
  template = loader.get_template('app/gastroobscura.html')
  return HttpResponse(template.render({}, request))
def vitamins(request):
  template = loader.get_template('app/vitamins.html')
  return HttpResponse(template.render({}, request))
