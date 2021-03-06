from django.conf.urls import url
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'job', views.CreateJobViewSet)

urlpatterns = [
    url(r'^api/(?P<pk>\d+)/$', views.api_job_detail, name='api_job_detail'),
    url(r'^(?P<pk>\d+)/$', views.job_detail, name='job_detail'),

    url(r'^api/jobs/$', views.api_job_list, name='api_job_list'),
    url(r'^$', views.job_list, name='job_list'),
]

urlpatterns += router.urls