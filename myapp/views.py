

# myapp/views.py

from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def profile(request):
    user = request.user
    context = {
        'name': user.get_full_name(),
        'email': user.email,
        'username': user.username,
    }
    return render(request, 'profile.html', context)
