
document.addEventListener('DOMContentLoaded', function () {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const burgerBtn = document.getElementById('burger-menu-btn');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    burgerBtn.classList.remove('burger-active');
                }
            }
        });
    });


    // Animate elements on scroll
    function animateOnScroll() {
        // Fade up sections
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Animate section headings
        gsap.utils.toArray('section h2').forEach(heading => {
            gsap.from(heading, {
                opacity: 0,
                y: -20,
                duration: 0.8,
                scrollTrigger: {
                    trigger: heading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Animate progress bars
        gsap.utils.toArray('.bg-gray-200 > div').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';

            gsap.to(bar, {
                width: width,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 85%"
                }
            });
        });

        // Create a floating animation for the hero image
        gsap.to('.float-animation', {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    // Call animations
    animateOnScroll();

    // Form validation and submission
    const contactForm = document.querySelector('footer form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('border-red-400');
            } else {
                nameInput.classList.remove('border-red-400');
            }

            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                isValid = false;
                emailInput.classList.add('border-red-400');
            } else {
                emailInput.classList.remove('border-red-400');
            }

            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.classList.add('border-red-400');
            } else {
                messageInput.classList.remove('border-red-400');
            }

            if (isValid) {
                // Show success message (in real app would submit to server)
                const originalButtonText = contactForm.querySelector('button').textContent;
                contactForm.querySelector('button').textContent = 'Отправлено!';
                contactForm.querySelector('button').classList.add('bg-green-500');

                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.querySelector('button').textContent = originalButtonText;
                    contactForm.querySelector('button').classList.remove('bg-green-500');
                }, 3000);
            }
        });
    }

    // Testimonials carousel
    const testimonials = document.querySelectorAll('.testimonials-container .testimonial');
    if (testimonials.length > 0) {
        let currentIndex = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.classList.add('active');
                    testimonial.classList.remove('hidden');
                } else {
                    testimonial.classList.remove('active');
                    testimonial.classList.add('hidden');
                }
            });
        }

        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }

        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        }

        // Set up navigation if exists
        const nextBtn = document.querySelector('.testimonial-next');
        const prevBtn = document.querySelector('.testimonial-prev');

        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

        // Auto rotate testimonials
        setInterval(nextTestimonial, 5000);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-[-100px] opacity-0 max-w-xs z-50`;

        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-blue-500', 'text-white');
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-y-[-100px]', 'opacity-0');
        }, 10);

        // Animate out
        setTimeout(() => {
            notification.classList.add('translate-y-[-100px]', 'opacity-0');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Example usage for try free button
    const tryFreeBtn = document.querySelector('a[href="#"].inline-block.bg-white');
    if (tryFreeBtn) {
        tryFreeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Спасибо за интерес! Регистрация начата.', 'success');
        });
    }

    // Add hover effects for better interactivity
    const interactiveElements = document.querySelectorAll('a, button, .hover\\:shadow-lg');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power1.out"
            });
        });

        element.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power1.out"
            });
        });
    });
});