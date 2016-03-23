from django.shortcuts import render

# Create your views here.

def homepage(request):
    return render(request, 'TestLab/indexVTK.html', {})

def embedViz(request):
    return render(request, 'TestLab/embedViz.html', {})
