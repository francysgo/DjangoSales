from django.shortcuts import render
from django.views.generic import TemplateView
from django.db.models import Sum, Avg
from .models import(
	Proveedor,
	Entradas,
	Inventario
	)

class IndexView(TemplateView):
    
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context

class EntradasView(TemplateView):

    template_name = "entradas.html"

    def get_context_data(self, **kwargs):
        context = super(EntradasView, self).get_context_data(**kwargs)
        context['entradas'] = Entradas.objects.all()
        return context