from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Item
from .serializer import ItemSerializer
from backend import serializer
# Create your views here.

@api_view(['GET','POST'])
def getlist(request):
    if request.method == 'GET':
        list = Item.objects.all()
        serializer = ItemSerializer(list,many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data
        item = Item.objects.create(
            data = data
        )
        serializer = ItemSerializer(item, many=False)
        return Response(serializer.data)

@api_view(['DELETE','PUT'])
def getitem(request,pk):
    if request.method == 'DELETE':
        item = Item.objects.get(id=pk)
        item.delete()
        return Response('Note was deleted')

    if request.method == 'PUT':
        data0 = request.data
        item = Item.objects.get(id=pk)
        item.data = data0
        item.save()
        serializer = ItemSerializer(item, many=False)

        return Response(serializer.data)
    