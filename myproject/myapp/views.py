from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .utils import get_facebook_photos

@login_required
def profile_view(request):
    photos = get_facebook_photos(request.user)
    return render(request, 'tu_aplicacion/profile.html', {'photos': photos})
