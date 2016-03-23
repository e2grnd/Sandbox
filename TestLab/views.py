from django.shortcuts import render

# Create your views here.

def homepage(request):
    return render(request, 'TestLab/index_VTK.html', {})

def embedPRVW(request):
    return render(request, 'TestLab/embed.html', {})

def embedViz(request):
    return render(request, 'TestLab/embedViz.html', {})
