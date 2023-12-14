"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,include
from . import views


urlpatterns = [
path('viewallunits', views.view_all_units,name='viewallunits'),
    path('viewunitbyid/<int:Id>/',views.view_unit_by_id,name='viewunitbyid'),
    path('viewalldevices',views.view_all_devices,name='viewalldevices'),
    path('viewdevicebyid/<int:Id>',views.view_device_by_id,name='viewdevicebyid'),
    path('save_log_line/', views.save_log_line, name='save_log_line'),
    path('set_assignee/', views.set_assignee, name='set_assignee'),
]
