from django.shortcuts import render

# Create your views here.

def homepage(request):
    return render(request, 'TestLab/index.html', {})

def embedPRVW(request):
    return render(request, 'TestLab/embed.html', {})
