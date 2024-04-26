from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.views import LogoutView
from .utils import SentimentAnalyzer
from .models import CustomUser
from django.http import JsonResponse





isUserAuthonicated = False

model = ''
vectorizer = ''
# Create your views here.
def home(request):
    return render(request,"home.html")


def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email,password=password)
        if user is not None:
             # Redirect to a success page
            login(request,user)
            print('Login Success...')
            return redirect('home')
        else:
            # Return an 'invalid login' error message
            return render(request, 'login.html', {'error_message': 'Invalid login'})
    else:
        return render(request, 'login.html')


def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        fullname = request.POST.get('fullname')
        username = "".join(fullname.split(" ")).lower()
        user = CustomUser.objects.create_user(username=username,email=email,password=password,fullname=fullname)
        if user is not None:
             # Redirect to a success page
            print(user)
            return redirect('home')
        else:
            # Return an 'invalid login' error message
            return render(request, 'register.html', {'error_message': 'Invalid login'})
    else:
        return render(request, 'register.html')


# read the text get SentimentScore by extracting pickle file and retun sentiment score
@login_required
def write(request):
    if request.method == 'POST':
        # Assuming you have a form with a textarea named 'text'
        text = request.POST.get('textToCheckSentiment')

        analyzer = SentimentAnalyzer()
        text_vector = analyzer.text_vectorizer(text)
        sentiment = analyzer.predict_sentiment(text_vector)        
        # Pass the sentiment score to the template

        print(sentiment)
        return JsonResponse(sentiment)
    
    
    return render(request, 'write.html')