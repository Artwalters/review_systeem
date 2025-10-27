// Google Reviews URL en Email worden dynamisch geladen uit client config
// Zie config/clients.js voor client specifieke instellingen
function getGoogleReviewUrl() {
    const config = getCurrentClientConfig();
    return config ? config.googleReviewUrl : '';
}

function getBusinessEmail() {
    const config = getCurrentClientConfig();
    return config ? config.email.recipientEmail : '';
}

// Selecteer alle elementen
const stars = document.querySelectorAll('.star');
const ratingSection = document.getElementById('ratingSection');
const feedbackSection = document.getElementById('feedbackSection');
const thankYouSection = document.getElementById('thankYouSection');
const feedbackForm = document.getElementById('feedbackForm');
const logo = document.getElementById('logo');

let selectedRating = 0;

// Initial page load animation with GSAP
window.addEventListener('load', () => {
    gsap.from('.container', {
        duration: 0.6,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.out'
    });

    gsap.from('.logo', {
        duration: 0.5,
        opacity: 0,
        y: -20,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.from('h1', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        delay: 0.4,
        ease: 'power2.out'
    });

    gsap.from('.stars', {
        duration: 0.7,
        opacity: 0,
        y: 30,
        delay: 0.5,
        ease: 'back.out(1.2)'
    });

    gsap.from('.rating-text', {
        duration: 0.5,
        opacity: 0,
        delay: 0.7,
        ease: 'power2.out'
    });

    gsap.from('.divider', {
        duration: 0.6,
        width: 0,
        delay: 0.9,
        ease: 'power2.out'
    });

    gsap.from('.quick-links-title', {
        duration: 0.5,
        opacity: 0,
        delay: 1,
        ease: 'power2.out'
    });

    gsap.fromTo('.social-link',
        {
            opacity: 0,
            scale: 0
        },
        {
            duration: 0.5,
            opacity: 1,
            scale: 1,
            delay: 1.1,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }
    );
});

// Social links hover animations
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    const icon = link.querySelector('i');

    link.addEventListener('mouseenter', function() {
        // Subtle scale on icon only
        gsap.to(icon, {
            duration: 0.3,
            scale: 1.15,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mouseleave', function() {
        // Reset icon scale
        gsap.to(icon, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// Sterren hover effect
stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
        highlightStars(index + 1);

        // Subtle scale animation on hover
        gsap.to(star, {
            duration: 0.3,
            scale: 1.15,
            ease: 'power2.out'
        });
    });

    star.addEventListener('mouseleave', () => {
        if (!star.classList.contains('selected')) {
            gsap.to(star, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        }
    });

    star.addEventListener('click', () => {
        selectedRating = index + 1;
        selectStars(selectedRating);

        // Animate star selection with GSAP
        gsap.to(star, {
            duration: 0.3,
            scale: 1.3,
            rotation: 15,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });

        handleRating(selectedRating);
    });
});

// Reset hover effect wanneer muis weggaat
document.querySelector('.stars').addEventListener('mouseleave', () => {
    if (selectedRating === 0) {
        resetStars();
    } else {
        selectStars(selectedRating);
    }
});

// Highlight sterren bij hover
function highlightStars(count) {
    stars.forEach((star, index) => {
        if (index < count) {
            star.classList.add('hovered');
        } else {
            star.classList.remove('hovered');
        }
    });
}

// Selecteer sterren bij klik
function selectStars(count) {
    stars.forEach((star, index) => {
        if (index < count) {
            star.classList.add('selected');
            star.innerHTML = '&#9733;'; // Gevulde ster
        } else {
            star.classList.remove('selected');
            star.innerHTML = '&#9734;'; // Lege ster
        }
        star.classList.remove('hovered');
    });
}

// Reset alle sterren
function resetStars() {
    stars.forEach(star => {
        star.classList.remove('hovered', 'selected');
        star.innerHTML = '&#9734;';
    });
}

// Handel rating af
function handleRating(rating) {
    console.log(`Rating gegeven: ${rating} sterren`);

    if (rating === 5) {
        // Bij 5 sterren: animeer en redirect naar Google Reviews
        gsap.to('.rating-section', {
            duration: 0.4,
            opacity: 0,
            scale: 0.95,
            ease: 'power2.in',
            onComplete: () => {
                window.location.href = getGoogleReviewUrl();
            }
        });
    } else {
        // Bij 4 sterren of minder: toon feedback formulier met animatie
        const timeline = gsap.timeline();

        timeline.to('.rating-section', {
            duration: 0.4,
            opacity: 0,
            y: -20,
            ease: 'power2.in',
            onComplete: () => {
                ratingSection.style.display = 'none';
                feedbackSection.classList.add('visible');
            }
        });

        timeline.from('.feedback-section h2', {
            duration: 0.5,
            opacity: 0,
            y: 30,
            ease: 'power2.out'
        }, '-=0.1');

        timeline.from('.form-group', {
            duration: 0.5,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3');

        timeline.fromTo('.submit-btn',
            {
                opacity: 0,
                scale: 0.9
            },
            {
                duration: 0.4,
                opacity: 1,
                scale: 1,
                ease: 'back.out(1.5)'
            }, '-=0.2');
    }
}

// Formulier verzenden
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        rating: selectedRating,
        name: document.getElementById('name').value || 'Anoniem',
        email: document.getElementById('email').value || 'Geen email opgegeven',
        feedback: document.getElementById('feedback').value
    };

    console.log('Feedback verzonden:', formData);

    // Verstuur email
    sendFeedbackEmail(formData);

    // Toon bedankt bericht met animatie
    const timeline = gsap.timeline();

    timeline.to('.feedback-section', {
        duration: 0.4,
        opacity: 0,
        x: -30,
        ease: 'power2.in',
        onComplete: () => {
            feedbackSection.classList.remove('visible');
            thankYouSection.classList.add('visible');
        }
    });

    timeline.from('.thank-you-icon', {
        duration: 0.6,
        scale: 0,
        rotation: 180,
        ease: 'back.out(1.7)'
    });

    timeline.from('.thank-you-section h2', {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
    }, '-=0.3');

    timeline.from('.thank-you-section p', {
        duration: 0.5,
        opacity: 0,
        y: 15,
        ease: 'power2.out'
    }, '-=0.3');

    timeline.from('.google-review-prompt', {
        duration: 0.5,
        opacity: 0,
        y: 10,
        ease: 'power2.out'
    }, '-=0.2');
});

// Email verzenden functie
function sendFeedbackEmail(data) {
    // Probeer EmailJS te gebruiken als de configuratie is ingesteld
    if (typeof sendEmailViaEmailJS !== 'undefined') {
        sendEmailViaEmailJS(data);
        return;
    }

    // Fallback: log naar console
    console.log('EmailJS niet geconfigureerd. Feedback data:');
    console.log('Rating:', data.rating, 'sterren');
    console.log('Naam:', data.name);
    console.log('Email:', data.email);
    console.log('Feedback:', data.feedback);
    console.log('\nOm emails te versturen, configureer EmailJS in emailjs-config.js');
}
