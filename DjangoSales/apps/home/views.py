from django.shortcuts import render
from django.views.generic import TemplateView

class IndexVentaView(TemplateView):
    template_name = "venta/index.html"