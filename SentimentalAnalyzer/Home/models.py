from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
import uuid

 
# Create your models here.

     
class CustomUserManager(BaseUserManager):
     def create_user(self,email,password,**extra_fields):
          
          if not email:
               raise ValueError("Email must be Set")
       
          email = self.normalize_email(email)
          extra_fields.setdefault('username', email)
          user = self.model(**extra_fields)
          user.set_password(password)
          user.save(using=self._db)
          return user

     def create_superuser(self,email,password,*args,**extra_fields):
          extra_fields.setdefault('is_staff',True)
          extra_fields.setdefault('is_superuser',True)
          return self.create_user(email,password,*args,**extra_fields)

class CustomUser(AbstractUser):
     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
     USERNAME_FIELD = 'email'
     email = models.EmailField(unique=True)
     fullname =  models.CharField(max_length=50)
     updated_at = models.DateTimeField(auto_now=True)
     is_staff = models.BooleanField(default=False)
     is_active = models.BooleanField(default=True)

     REQUIRED_FIELDS = []

 
     obj = CustomUserManager()

     class Meta:
          ordering = ('-date_joined',)
     
     def __str__(self):
          return self.email
     
     def save(self,*args, **kwargs):
          if not self.username:
               # to_assaign = "".join(self.fullname.split(" ")).lower()

               # if CustomUser.objects.filter(username=to_assaign).exists():

               #      to_assaign = to_assaign+str(CustomUser.objects.all().count())
               
               self.username = self.email
          super().save(*args,**kwargs)

 