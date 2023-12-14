from django.urls import re_path,path

from . import views

urlpatterns = [
    #CRPF Units Urls
    path('viewallunits', views.view_all_units,name='viewallunits'),
    path('viewunitbyid/<int:Id>/',views.view_unit_by_id,name='viewunitbyid'),
    #CRPF Devices Urls
    path('viewalldevices',views.view_all_devices,name='viewalldevices'),
    path('viewdevicebyid/<int:Id>',views.view_device_by_id,name='viewdevicebyid'),
    #Users Urls
    path('viewallusers',views.view_all_users, name='viewallusers'),
    path('viewuserbyid',views.view_user_by_id,name='viewuserbyid'),
    #Playbook Urls
    path('addplaybook',views.add_playbook,name='addplaybook'),
    path('viewallplaybooks',views.view_all_playbooks,name='viewallplaybooks'),
    path('viewplaybookbyid/<int:Id>',views.view_playbook_by_id,name='viewplaybookbyid'),
    #Threats Urls
    path('viewallthreats',views.view_all_threats_info,name='viewallthreats'),
    path('viewthreatbyid/<int:Id>',views.view_threat_by_id,name='viewthreatbyid'),
    #Alerts Urls
    path('viewallalerts',views.view_all_alerts,name='viewallalerts'),
    path('viewalertbyid/<int:Id>', views.view_alert_by_id, name='viewtheartsbyid'),


    path('save_log_line/', views.save_log_line, name='save_log_line'),
    path('set_assignee/', views.set_assignee, name='set_assignee'),
]
