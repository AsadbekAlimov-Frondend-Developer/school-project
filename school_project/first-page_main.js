const themeToggle = document.querySelector('.fixed.bottom-5.right-5 button');
if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        // Изменение иконки
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }

        // Сохраняем предпочтение пользователя в localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Проверяем сохраненные настройки темы
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Добавляем стили для темной темы
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    body.dark-mode {
        background-color: #1a1a2e;
        color: #e6e6e6;
    }
    body.dark-mode header {
        background: linear-gradient(to right, #3b2970, #2d3748);
    }
    body.dark-mode #hero {
        background: linear-gradient(to bottom, #2d3748, #1a1a2e);
    }
    
    body.dark-mode section:not(#hero) {
        background-color: #1a1a2e;
    }
    
    body.dark-mode .bg-white {
        background-color: #2a2a3c;
    }
    
    body.dark-mode .text-gray-800,
    body.dark-mode .text-gray-700,
    body.dark-mode .text-gray-600 {
        color: #d1d5db;
    }
    
    body.dark-mode .bg-gray-50 {
        background-color: #252538;
    }
    
    body.dark-mode input,
    body.dark-mode textarea,
    body.dark-mode select {
        background-color: #3a3a4e;
        border-color: #4b4b63;
        color: #e6e6e6;
    }
    
    body.dark-mode footer {
        background-color: #111122;
    }
`;
document.head.appendChild(darkModeStyles);
// -----------------------------------------------------------------------------------
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Имитация загрузки (в реальном проекте здесь будет AJAX-запрос)
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Загрузка...';
        this.disabled = true;
        
        setTimeout(() => {
            // Дополнительные отзывы
            const additionalTestimonials = [
                {
                    img:'assets/images/testimonial-user-cover-1.png',
                    name: 'Елена С.',
                    role: 'Мама ученицы 4 класса',
                    rating: 5,
                    text: 'Дочка очень любит заниматься с виртуальным помощником. Ей особенно нравится, что она может задавать любые вопросы без стеснения, и получать понятные ответы.'
                },
                // ---1
                {
                    img:'assets/images/pupil1.jpg',
                    name: ' Артём К.',
                    role: 'Ученик 10 класса',
                    rating: 4,
                    text: 'Помогло подготовиться к ЕГЭ. Очень удобно, что можно заниматься в любое время и в любом месте. Сложные темы стали гораздо понятнее.'
                },
                // ---2
                {
                    img:'assets/images/beginner_teacher.jpg',
                    name: 'Ольга В.',
                    role: 'Учитель начальных классов',
                    rating: 5,
                    text: 'Рекомендую своим ученикам как дополнительный инструмент для закрепления материала. Объяснения действительно адаптированы под разный уровень знаний.'
                },
                // ----3
            ];
            
            // Добавляем отзывы на страницу
            const testimonialContainer = document.getElementById('testimonials-container');
            additionalTestimonials.forEach(testimonial => {
                const stars = Array(5).fill('').map((_, i) => 
                    i < testimonial.rating 
                        ? '<i class="fas fa-star"></i>' 
                        : i + 0.5 === testimonial.rating 
                            ? '<i class="fas fa-star-half-alt"></i>' 
                            : '<i class="far fa-star"></i>'
                ).join('');
                
                const testimonialHTML = `
                    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 opacity-0 transform translate-y-4" style="transition: all 0.5s ease;">
                        <div class="flex items-center mb-4">
                            <img src="${testimonial.img}" alt="Фото пользователя" class="h-12 w-12 rounded-full object-cover">
                            <div class="ml-4">
                                <h4 class="font-bold text-gray-800">${testimonial.name}</h4>
                                <p class="text-gray-600 text-sm">${testimonial.role}</p>
                            </div>
                        </div>
                        <div class="mb-3">
                            <span class="text-yellow-400">
                                ${stars}
                            </span>
                        </div>
                        <p class="text-gray-700">${testimonial.text}</p>
                    </div>
                `;
                
                testimonialContainer.insertAdjacentHTML('beforeend', testimonialHTML);
            });
            
            // Анимация появления новых отзывов
            const newTestimonials = testimonialContainer.querySelectorAll('.opacity-0');
            setTimeout(() => {
                newTestimonials.forEach(item => {
                    item.classList.remove('opacity-0', 'transform', 'translate-y-4');
                });
            }, 100);
            
            // Скрываем кнопку после загрузки всех отзывов
            this.innerHTML = 'Все отзывы загружены';
            this.classList.remove('bg-indigo-100', 'hover:bg-indigo-200', 'text-indigo-700');
            this.classList.add('bg-gray-100', 'text-gray-500', 'cursor-default');
            this.style.pointerEvents = 'none';
        }, 1500);
    });
}
// --------------------------------------------------------------------------------------
