from django import forms
from .models import Proveedor
from django.utils import six
from djng.forms import NgModelFormMixin, NgModelForm,NgDeclarativeFieldsMetaclass, NgFormValidationMixin

class ProveedorForm(NgFormValidationMixin ,  NgModelForm):
    nombre = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control'}),error_messages={'required': 'Please let us know what to call you!'})
    direccion = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control'}),error_messages={'required': 'Please let us know what to call you!'})
    telefono = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control'}),error_messages={'required': 'Please let us know what to call you!'})
    correo = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control'}),error_messages={'required': 'Please let us know what to call you!'})


    class Meta:
        model = Proveedor
        fields = ('nombre', 'telefono','correo','direccion')
        def __init__(self, *args, **kwargs):
            form = super(ProveedorForm, self).__init__(*args, **kwargs)
            for visible in form.visible_fields():
                visible.field.widget.attrs['class'] = 'form-control'
