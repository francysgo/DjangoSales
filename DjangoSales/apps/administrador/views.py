from django.shortcuts import render, HttpResponseRedirect
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import(
	Proveedor,
	Entradas,
	Inventario
	)

class RedirectView(TemplateView):
    

    def get_context_data(self, **kwargs):
        context = super(RedirectView, self).get_context_data(**kwargs)
        return context
 
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return HttpResponseRedirect('/administrador/')
        else:
            return HttpResponseRedirect('/ventas/')

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