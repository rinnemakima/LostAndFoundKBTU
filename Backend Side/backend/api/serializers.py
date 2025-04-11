from rest_framework import serializers

from rest_framework import serializers
from .models import User, MatchItem, LostItem, FoundItem

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField()
    phone_number = serializers.CharField(allow_blank=True, required=False)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.save()
        return instance


class MatchItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    lost_item = serializers.IntegerField()
    found_item = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return MatchItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.lost_item_id = validated_data.get('lost_item', instance.lost_item_id)
        instance.found_item_id = validated_data.get('found_item', instance.found_item_id)
        instance.save()
        return instance


class LostItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LostItem
        fields = ('id', 'name', 'description', 'location', 'date', 'image', 'user')
        read_only_fields = ['user']

class FoundItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoundItem
        fields = ('id', 'name', 'description', 'location', 'date', 'image', 'user')
        read_only_fields = ['user']


