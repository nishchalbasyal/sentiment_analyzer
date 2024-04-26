from django.urls import path;
from .views import home, user_login,register,write,LogoutView;

urlpatterns = [
    path('',home,name="home"),
    path('login',user_login,name="login"),
    path('register',register,name="register"),
    path('checkscore',write,name="checkScore"),
    path('logout', LogoutView.as_view(), name="logout"),

]
