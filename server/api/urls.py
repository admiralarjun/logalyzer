from django.urls import re_path,path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.views import serve
from . import views

urlpatterns = [
    #CRPF Units Urls
    path('create_crpf_unit/', views.create_crpf_unit, name='create_crpf_unit'),
    path('view_all_units/', views.view_all_units,name='viewallunits'),
    path('view_unit_by_id/<int:Id>/',views.view_unit_by_id,name='viewunitbyid'),
    path('update_crpf_unit/<int:Id>/', views.update_crpf_unit, name='update_crpf_unit'),
    path('delete_crpf_unit/<int:Id>/', views.delete_crpf_unit, name='delete_crpf_unit'),
    #CRPF Devices Urls
    path('create_crpf_device/', views.create_crpf_device, name='create_crpf_device'),
    path('view_all_devices/',views.view_all_devices,name='viewalldevices'),
    path('get_devices_by_unit/<int:crpf_unit_id>/', views.get_devices_by_unit, name='get_devices_by_unit'),
    path('view_device_by_id/<int:Id>/',views.view_device_by_id,name='view_device_by_id'),
    path('update_crpf_device/<int:Id>/', views.update_crpf_device, name='update_crpf_device'),
    path('delete_crpf_device/<int:Id>/', views.delete_crpf_device, name='delete_crpf_device'),
    #Users Urls
    path('view_all_users/',views.view_all_users, name='viewallusers'),
    path('update_user/<int:Id>/', views.update_user, name='update_user'),
    path('view_user_by_id/<int:Id>/',views.view_user_by_id,name='viewuserbyid'),
    path('delete_user/<int:Id>/', views.delete_user, name='delete_user'),
    #Playbook Urls
    path('add_playbook/',views.add_playbook,name='addplaybook'),
    path('view_all_playbooks/',views.view_all_playbooks,name='viewallplaybooks'),
    path('view_playbook_by_id/<int:Id>',views.view_playbook_by_id,name='viewplaybookbyid'),
    path('update_playbook/<int:Id>/', views.update_playbook, name='update_playbook'),
    path('delete_playbook/<int:Id>/', views.delete_playbook, name='delete_playbook'),
    #Threats Urls
    path('create_threat_info/', views.create_threat_info, name='create_threat_info'),
    path('process_csv_file/', views.process_csv_file, name='process_csv_file'),
    path('create_threat_info_process/', views.create_threat_info_process, name='create_threat_info_process'),
    path('view_all_threats/',views.view_all_threats_info,name='viewallthreats'),
    path('view_threat_by_id/<int:Id>',views.view_threat_by_id,name='viewthreatbyid'),
    path('update_threat_info/<int:Id>/', views.update_threat_info, name='update_threat_info'),
    path('delete_threat_info/<int:Id>/', views.delete_threat_info, name='delete_threat_info'),
    #Alerts Urls
    path('view_all_alerts/',views.view_all_alerts,name='viewallalerts'),
    path('view_alert_by_id/<int:Id>', views.view_alert_by_id, name='viewtheartsbyid'),
    path('get_alerts_by_username/<str:username>/', views.get_alerts_by_username, name='get_alerts_by_username'),
    path('get_unassigned_alerts/', views.get_unassigned_alerts, name='get_unassigned_alerts'),
    path('get_unresolved_alerts/', views.get_unresolved_alerts, name='get_unresolved_alerts'),
    path('get_resolved_alerts/', views.get_resolved_alerts, name='get_resolved_alerts'),
    path('get_ignored_alerts/', views.get_ignored_alerts, name='get_ignored_alerts'),
    path('get_alerts_by_crpf_device/<int:crpf_device_id>', views.get_alerts_by_crpf_device, name='get_alerts_by_crpf_device'),
    path('get_alerts_by_crpf_unit/<int:crpf_unit_id>', views.get_alerts_by_crpf_unit, name='get_alerts_by_crpf_unit'),
    path('get_alerts_stats_by_crpf_unit/<int:crpf_unit_id>/', views.get_alerts_stats_by_crpf_unit,name='get_alerts_stats_by_crpf_unit'),
    path('get_alerts_stats_all_units/', views.get_alerts_stats_all_units, name='get_alerts_stats_all_units'),
    path('set_assignee/', views.set_assignee, name='set_assignee'),
    path('update_alert/<int:Id>/', views.update_alert, name='update_alert'),
    path('update_alert_status/<int:Id>/', views.update_alert_status, name='update_alert_status'),
    path('delete_alert/<int:Id>/', views.delete_alert, name='delete_alert'),
    #LogLine Urls
    path('save_log_line/', views.save_log_line, name='save_log_line'),
    path('view_log_line_by_id/<int:Id>', views.view_logline_by_id, name='view_log_line_by_id'),
    path('get_log_lines_by_device/<int:crpf_device_id>/', views.get_log_lines_by_device, name='get_log_lines_by_device'),
    path('get_log_lines_by_unit/<int:crpf_unit_id>/', views.get_log_lines_by_unit, name='get_log_lines_by_unit'),
    path('update_log_line/<int:Id>/', views.update_log_line, name='update_log_line'),
    path('delete_log_line/<int:Id>/', views.delete_log_line, name='delete_log_line'),

    #Authentication Urls
    path('signup/', views.signup),
    path('login/', views.login),
    path('test_token/', views.test_token),
    path('logout/', views.logout),
    #Upload Image
    path('upload/',views.upload_profile_pic),
    path('profile/<int:Id>',views.get_profile_pic),
    #Special Urls
    path('get_alert_all_details/',views.get_full_alert_details),
    #MAil test
    path('sendmail/',views.send_mail_to_someone)

]
