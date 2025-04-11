from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import FoundItem, LostItem, MatchItem, User

@admin.register(LostItem)
class LostItemAdmin(admin.ModelAdmin):
    pass


@admin.register(FoundItem)
class FoundItemAdmin(admin.ModelAdmin):
    pass

@admin.register(MatchItem)
class MatchItemAdmin(admin.ModelAdmin):
    pass
@admin.register(User)
class CustomUserAdmin(UserAdmin):
   
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone_number',)}),
    )
    list_display = UserAdmin.list_display + ('phone_number',)
