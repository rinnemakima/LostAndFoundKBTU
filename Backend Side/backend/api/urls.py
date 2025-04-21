from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from rest_framework.routers import DefaultRouter
from .views import logout_view
from .views import *


urlpatterns = [
   path('token/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    path('lost-items/', lost_item_list),
    path('found-items/', found_item_list),
    path('lost-items/<int:id>/', LostItemDetailView.as_view()),
    path('found-items/<int:id>/', FoundItemDetailView.as_view()),
    path('matches/', match_item_list),  
    path('matches/<int:id>/', MatchItemDetailView.as_view()),  
    path('lost-items/recent/', recent_lost_items_view),
    path("public-lost-items/", public_lost_items),
    path("public-found-items/", public_found_items),
    
    path('register/', RegisterView.as_view(), name='register'),

    path('api/found-items/purge/', FoundItemPurge.as_view()),

]
