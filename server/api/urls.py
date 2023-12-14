from django.urls import re_path,path

from . import views

urlpatterns = [
path('viewallunits/', views.view_all_units,name='viewallunits'),
    path('viewallunits/', views.view_all_units,name='viewallunits'),
    path('viewunitbyid/<int:Id>/',views.view_unit_by_id,name='viewunitbyid'),
    path('viewalldevices/',views.view_all_devices,name='viewalldevices'),
    path('viewdevicebyid/<int:Id>',views.view_device_by_id,name='viewdevicebyid'),
    path('save_log_line/', views.save_log_line, name='save_log_line'),
    path('set_assignee/', views.set_assignee, name='set_assignee'),
    path('signup/', views.signup),
    path('login/', views.login),
    path('test_token/', views.test_token),
    path('logout/', views.logout),
path('create_crpf_unit/', views.create_crpf_unit, name='create_crpf_unit'),
    path('create_crpf_device/', views.create_crpf_device, name='create_crpf_device'),
    path('create_threat_info/', views.create_threat_info, name='create_threat_info'),
]
