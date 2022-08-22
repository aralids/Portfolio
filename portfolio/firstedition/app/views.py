from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse

def index(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render({}, request))
def temple(request):
  template = loader.get_template('temple.html')
  return HttpResponse(template.render({}, request))
def gastroobscura(request):
  template = loader.get_template('gastroobscura.html')
  return HttpResponse(template.render({}, request))
def vitamins(request):
  template = loader.get_template('vitamins.html')
  return HttpResponse(template.render({}, request))
