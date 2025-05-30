from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Project, Skill, Experience, ContactMessage
from .forms import ContactForm
from django.core.mail import send_mail
from django.conf import settings

def home(request):
    return render(request, 'portfolio/home.html')

def about(request):
    return render(request, 'portfolio/about.html')

def skills(request):
    skills = Skill.objects.all()
    return render(request, 'portfolio/skills.html', {'skills': skills})

def projects(request):
    projects = Project.objects.all()
    return render(request, 'portfolio/projects.html', {'projects': projects})

def experience(request):
    experiences = Experience.objects.all()
    return render(request, 'portfolio/experience.html', {'experiences': experiences})

def certifications(request):
    return render(request, 'portfolio/certificats.html')


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_instance = form.save()

            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']  # ✅ Champ récupéré
            message = form.cleaned_data['message']

            full_message = f"Message de : {name}\nAdresse : {email}\nObjet : {subject}\n\nContenu :\n{message}"

            try:
                send_mail(
                    subject=subject,
                    message=full_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.DEFAULT_FROM_EMAIL],
                    fail_silently=False,
                )
                messages.success(request, "Votre message a bien été envoyé !")
            except Exception as e:
                messages.error(request, f"Une erreur est survenue : {e}")

            return redirect('contact')
        else:
            messages.error(request, "Veuillez corriger les erreurs dans le formulaire.")
    else:
        form = ContactForm()

    return render(request, 'portfolio/contact.html', {'form': form})
