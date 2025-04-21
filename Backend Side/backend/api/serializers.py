from rest_framework import serializers
from .models import User, MatchItem, LostItem, FoundItem
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField()
    email = serializers.EmailField()
    phone_number = serializers.CharField(allow_blank=True, required=False)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)



class LostItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    class Meta:
        model = LostItem
        fields = ['name', 'description', 'category', 'color', 'location', 'date', 'image', 'user']
        read_only_fields = ['user']



class FoundItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    class Meta:
        model = FoundItem
        fields = ['name', 'description', 'category', 'color', 'location', 'date', 'image', 'user']
        read_only_fields = ['user']


class MatchItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    lost_item = LostItemSerializer()
    found_item = FoundItemSerializer()
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return MatchItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.lost_item_id = validated_data.get('lost_item', instance.lost_item_id)
        instance.found_item_id = validated_data.get('found_item', instance.found_item_id)
        instance.save()
        return instance
    
    class Meta:
        model = MatchItem
        fields = ['id', 'lost_item', 'found_item', 'created_at']

class MatchItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchItem
        fields = ['id', 'lost_item', 'found_item']
