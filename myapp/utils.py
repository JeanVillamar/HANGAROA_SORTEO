import requests
from allauth.socialaccount.models import SocialAccount, SocialToken

def get_facebook_photos(user):
    try:
        social_account = SocialAccount.objects.get(user=user, provider='facebook')
        token = SocialToken.objects.get(account=social_account).token
        url = f'https://graph.facebook.com/v20.0/me/photos?type=uploaded&access_token={token}'
        response = requests.get(url)
        photos = response.json().get('data', [])
        photo_urls = [f'https://graph.facebook.com/{photo["id"]}/picture?access_token={token}' for photo in photos]
        return photo_urls
    except SocialAccount.DoesNotExist:
        return []
