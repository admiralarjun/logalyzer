from django.urls import re_path,path

from . import views

urlpatterns = [
    path('viewallunits', views.view_all_units,name='viewallunits'),
    path('viewunitbyid/<int:Id>/',views.view_unit_by_id,name='viewunitbyid'),
    path('viewalldevices',views.view_all_devices,name='viewalldevices'),
    path('viewdevicebyid/<int:Id>',views.view_device_by_id,name='viewdevicebyid'),
    path('viewallusers',views.view_all_user, name='viewallusers'),
    path('viewuserbyid',views.view_user_by_id,name='viewuserbyid'),
    path('addplaybook',views.add_playbook,name='addplaybook'),
    path('viewallplaybooks',views.view_all_playbooks,name='viewallplaybooks'),
    path('save_log_line/', views.save_log_line, name='save_log_line'),
]
