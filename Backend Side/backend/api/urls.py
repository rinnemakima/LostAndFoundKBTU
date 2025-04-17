from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import logout_view
from .views import *

urlpatterns = [
    path('token/login/', obtain_auth_token, name='api_token_auth'), 
    path('token/logout/', logout_view, name='api_token_logout'),    
    path('lost-items/', lost_item_list),
    path('found-items/', found_item_list),
    path('lost-items/<int:id>/', LostItemDetailView.as_view()),
    path('found-items/<int:id>/', FoundItemDetailView.as_view()),
    path('matches/', match_item_list),  
    path('matches/<int:id>/', MatchItemDetailView.as_view()),  
    path('lost-items/recent/', recent_lost_items_view),

    
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateView.as_view(), name='user-detail'),

]