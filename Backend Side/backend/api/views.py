
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import FoundItem, LostItem, MatchItem
from .serializers import FoundItemSerializer, LostItemSerializer, MatchItemSerializer, UserSerializer

from django.contrib.auth.models import User
from rest_framework import viewsets
from django.contrib.auth import get_user_model

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class UserListCreateView(ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class UserRetrieveUpdateView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({"message": "Logged out successfully."})

@api_view(http_method_names=["GET", "POST"]) 
@permission_classes([IsAuthenticated])
def lost_item_list(request):
    if request.method == "GET":
        items = LostItem.objects.all()
        serializer = LostItemSerializer(items, many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = LostItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(http_method_names=["GET", "POST"]) 
@permission_classes([IsAuthenticated])
def found_item_list(request):
    if request.method == "GET":
        items = FoundItem.objects.all()
        serializer = FoundItemSerializer(items, many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = FoundItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def match_item_list(request):
    if request.method == 'GET':
        matches = MatchItem.objects.all()
        serializer = MatchItemSerializer(matches, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MatchItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LostItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            return LostItem.objects.get(id=id)
        except LostItem.DoesNotExist as e:
            return Response({"error" : str(e)}, status=status.HTTP_404_NOT_FOUND)
        

    def get(self, request, id):
        item = self.get_object(id)
        serializer = LostItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        item = self.get_object(id)

        serializer = LostItemSerializer(instance = item, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    

    def delete(self, request, id):
        item = self.get_object(id)
        item.delete()
        return Response({"message": "lost item was deleted"}, status=status.HTTP_200_OK)


class FoundItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            return FoundItem.objects.get(id=id)
        except FoundItem.DoesNotExist as e:
            return Response({"error" : str(e)}, status=status.HTTP_404_NOT_FOUND)
        

    def get(self, request, id):
        item = self.get_object(id)
        serializer = FoundItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        item = self.get_object(id)

        serializer = FoundItemSerializer(instance = item, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    

    def delete(self, request, id):
        item = self.get_object(id)
        item.delete()
        return Response({"message": "found item was deleted"}, status=status.HTTP_200_OK)


class MatchItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            return MatchItem.objects.get(id=id)
        except MatchItem.DoesNotExist as e:
            return Response({"error" : str(e)}, status=status.HTTP_404_NOT_FOUND)
        

    def get(self, request, id):
        match = self.get_object(id)
        serializer = MatchItemSerializer(match)
        return Response(serializer.data)

    def put(self, request, id):
        match = self.get_object(id)
        serializer = MatchItemSerializer(match, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        match = self.get_object(id)
        match.delete()
        return Response({"message": "match item was deleted"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_lost_items_view(request):
    recent_items = LostItem.objects.recent_lost_items()
    serializer = LostItemSerializer(recent_items, many=True)
    return Response(serializer.data)


