// Initialize GSAP ScrollTrigger animations for sections
document.addEventListener('DOMContentLoaded', function () {
    // Animate "How It Works" steps
    gsap.utils.toArray('[data-step]').forEach((step, i) => {
        gsap.from(step, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            delay: i * 0.2
        });
    });

    // Animate subject cards
    gsap.utils.toArray('.grid-cols-2 > div').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            delay: i * 0.1
        });
    });

    // Progress chart with Chart.js
});
document.addEventListener('DOMContentLoaded', function() {
    // ScrollTrigger initialization for header elements
    gsap.registerPlugin(ScrollTrigger);
    
    // Header animations
    gsap.to('#practice-advice-title', {
      scrollTrigger: {
        trigger: '.practice-advice-container',
        start: 'top 80%',
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.7
    });
    
    gsap.to('#experts-title', {
      scrollTrigger: {
        trigger: '.practice-advice-container',
        start: 'top 80%',
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.3
    });
    
    gsap.to('#description-text', {
      scrollTrigger: {
        trigger: '.practice-advice-container',
        start: 'top 80%',
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.5
    });
    
    // Card animations with staggered delay
    const cards = ['#card-1', '#card-2', '#card-3', '#card-4'];
    
    cards.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: '.cards-container',
          start: 'top 80%',
          once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2 * index
      });
    });
  });