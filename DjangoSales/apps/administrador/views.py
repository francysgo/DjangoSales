from django.shortcuts import render, HttpResponseRedirect
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .forms import ProveedorForm, ProductoForm, EntradasForm
from .models import(
	Proveedor,
	Producto,
	Inventario,
    CatalogoCategoria,
    CatalogoUnidades
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
            return HttpResponseRedirect('/venta/')

class IndexView(TemplateView):

    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return super(IndexView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/venta/')


class ProductoView(TemplateView):

    template_name = "productos.html"

    def get_context_data(self, **kwargs):
        context = super(ProductoView, self).get_context_data(**kwargs)
        context['form'] = ProductoForm()
        return context

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return super(ProductoView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/venta/')

class ProveedoresView(TemplateView):
    template_name = "proveedores.html"

    def get_context_data(self, **kwargs):
        context = super(ProveedoresView, self).get_context_data(**kwargs)
        context['proveedores'] = Proveedor.objects.all()
        context.update(proveedor_form=ProveedorForm())
        return context

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return super(ProveedoresView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/venta/')

class InventarioView(TemplateView):
    
    template_name = "inventario.html"

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return super(InventarioView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/venta/')


class CategoriasView(TemplateView):
    template_name = "categorias.html"

    def get_context_data(self, **kwargs):
        context = super(CategoriasView, self).get_context_data(**kwargs)
        context['categorias'] = CatalogoCategoria.objects.all()
        #context.update(categoria_form=CategoriaForm())
        return context

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return super(CategoriasView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/venta/')

class UnidadesView(TemplateView):
    template_name="unidades.html"

    def get_context_data(self,**kwargs):
        context=super(UnidadesView,self).get_context_data(**kwargs)
        context['unidades']=CatalogoUnidades.objects.all()
        return context

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return super(UnidadesView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/venta/')

class EntradasView(TemplateView):
    template_name="entradas.html"

    def get_context_data(self, **kwargs):
        context = super(EntradasView, self).get_context_data(**kwargs)
        context['form'] = EntradasForm()
        return context

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if request.user.tipo == 'Administrador':
            return super(EntradasView, self).dispatch(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/venta/')
