import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

import django
django.setup()

from django.core.management import call_command
from api.models import Place
from requests_html import HTMLSession

session = HTMLSession()

for i in range(35,43):
    r = session.get("https://www.atlasobscura.com/cool-places-to-eat?page=" + str(i))
    cards = r.html.find(".Card")
    print(i)
    for j in range(0, len(cards)):
        lat = float(cards[j].search("lat={} ")[0].replace('"', ''))
        lng = float(cards[j].search("lng={} ")[0].replace('"', ''))
        try:
            city = cards[j].search("city={} d")[0].replace('"', '')
        except TypeError:
            city = ""
        try:
            country = cards[j].search('country={} h')[0].replace('"', '')
        except TypeError:
            country = ""
        link = "https://www.atlasobscura.com" + cards[j].search('href={}>')[0].replace('"', '')
        newr = session.get(link)
        try:
            title = newr.html.find("h1", first=True).text
        except TypeError:
            title = ""
        except AttributeError:
            title = ""
        try:
            address = newr.html.find("address div")[0].text
        except IndexError:
            address = ""
        images = newr.html.find(".js-item-image:not(.slick-cloned) a img")
        image_links = []
        for image_link in images:
            image_link = image_link.search("src={}>")[0].replace('"', '')
            image_links.append(image_link)
        
        print(title, len(image_links), "\n")
        image_links = " ".join(image_links)
        new_place = Place(title=title, city=city, country=country, latitude=lat, longtitude=lng, adress=address, image_links=image_links, link=link)
        new_place.save()
