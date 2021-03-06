"""nextstepapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf.urls import include
from django.contrib.auth import views as auth_views
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('token-auth/', obtain_jwt_token),
    url(r'authenticate/', include('custom_user.urls')),
    url(r'^login/', auth_views.login),
    url(r'^logout/', auth_views.logout),
    url('admin/', admin.site.urls),
    url(r'resume/', include('resume.urls')),
    url(r'company/', include('company.urls')),
    url(r'job/', include('job.urls')),
    #url(r'', include('website.urls')),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [  
    re_path('', TemplateView.as_view(template_name='index.html'))
    ]
