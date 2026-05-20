from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from .serializers import QuestsSerializer, CommunityManagersSerializer
from .models import Quest, Community_Manager
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned
from qdrant_client import QdrantClient
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv
from .paginations import CustomPagination
load_dotenv()
path = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(path, "transformer")


class QuestSearchingView(APIView):
    # permission_classes = (IsAuthenticated,)
    pagination_class = CustomPagination
    serializer_class = QuestsSerializer
    serializer_class2 = CommunityManagersSerializer
    encoder = SentenceTransformer(path)
    qdrant = QdrantClient(
        url=os.getenv("QDRANT_HOST"),
        api_key=os.getenv("QDRANT_API_KEY"),
    )

    def get(self, request, format=None):
        from django.db.models import Q
        query = request.query_params.get('query', None)
        if query is not None:
            # Search for quests where the query matches quest_name, description, or region (case-insensitive)
            quests = Quest.objects.filter(
                Q(quest_name__icontains=query) |
                Q(description__icontains=query) |
                Q(region__icontains=query)
            )
            serializer = self.serializer_class(quests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
