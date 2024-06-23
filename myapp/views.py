# Create your views here.
# myapp/views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def profile(request):
    user = request.user
    context = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }
    return render(request, 'profile.html', context)
