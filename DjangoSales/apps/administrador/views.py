from django.shortcuts import render, HttpResponseRedirect
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .forms import ProveedorForm, ProductoForm
from .serializers import ProductoSerializer
from rest_framework.views import APIView
from .models import(
	Proveedor,
	Producto,
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


class ProductoView(TemplateView):

    template_name = "productos.html"

    def get_context_data(self, **kwargs):
        context = super(ProductoView, self).get_context_data(**kwargs)
        context['form'] = ProductoForm()
        return context

class ProveedoresView(TemplateView):
	template_name = "proveedores.html"

	def get_context_data(self, **kwargs):
		context = super(ProveedoresView, self).get_context_data(**kwargs)
		context['proveedores'] = Proveedor.objects.all()
		context.update(proveedor_form=ProveedorForm())
		return context

class ProdcutosApiView(APIView):

    serializer_class = ProductoSerializer

    def get(self, request, id=None, format=None):
        productos = Producto.objects.all()
        response = self.serializer_class(productos, many=True)
        return Response(response.data)