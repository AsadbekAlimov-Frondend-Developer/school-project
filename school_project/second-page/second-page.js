// Тема (темная/светлая)
document.addEventListener('DOMContentLoaded', function() {
    // Переключение темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Меняем иконку в зависимости от темы
            const themeIcon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // Сохраняем выбор темы в localStorage
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
        
        // Применение сохранённой темы при загрузке
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            const themeIcon = themeToggle.querySelector('i');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // FAQ аккордеон
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            // Скрываем/показываем содержимое
            targetContent.classList.toggle('hidden');
            
            // Вращаем иконку стрелки
            const icon = this.querySelector('i');
            if (targetContent.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Обработка кнопок "Попробовать бесплатно"
    const tryFreeButtons = document.querySelectorAll('.try-free-btn');
    const overlay = document.querySelector('.overlay');
    const formPopup = document.querySelector('.form-popup');
    
    // Проверяем, есть ли элементы на странице
    if (tryFreeButtons.length && overlay && formPopup) {
        // Показываем форму при нажатии на кнопки
        tryFreeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                overlay.style.display = 'block';
                formPopup.style.display = 'block';
            });
        });
        
        // Скрываем форму при нажатии на оверлей
        overlay.addEventListener('click', function() {
            overlay.style.display = 'none';
            formPopup.style.display = 'none';
        });
        
        // Скрываем форму при нажатии на кнопку закрытия
        const closeFormBtn = document.querySelector('.close-form-btn');
        if (closeFormBtn) {
            closeFormBtn.addEventListener('click', function() {
                overlay.style.display = 'none';
                formPopup.style.display = 'none';
            });
        }
    }
    
    // Загрузка дополнительных отзывов
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
                        img:'../assets/images/testimonial-user-cover-1.png',
                        name: 'Елена С.',
                        role: 'Мама ученицы 4 класса',
                        rating: 5,
                        text: 'Дочка очень любит заниматься с виртуальным помощником. Ей особенно нравится, что она может задавать любые вопросы без стеснения, и получать понятные ответы.'
                    },
                    // ---1
                    {
                        img:'../assets/images/pupil1.jpg',
                        name: ' Артём К.',
                        role: 'Ученик 10 класса',
                        rating: 4,
                        text: 'Помогло подготовиться к ЕГЭ. Очень удобно, что можно заниматься в любое время и в любом месте. Сложные темы стали гораздо понятнее.'
                    },
                    // ---2
                    {
                        img:'../assets/images/beginner_teacher.jpg',
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
    
    // Валидация форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('border-red-500');
                    
                    // Добавляем сообщение об ошибке, если его еще нет
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('p');
                        errorMessage.className = 'text-red-500 text-xs mt-1 error-message';
                        errorMessage.textContent = 'Это поле обязательно для заполнения';
                        input.insertAdjacentElement('afterend', errorMessage);
                    }
                } else {
                    input.classList.remove('border-red-500');
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                    
                    // Проверка email
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            isValid = false;
                            input.classList.add('border-red-500');
                            
                            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                                const errorMessage = document.createElement('p');
                                errorMessage.className = 'text-red-500 text-xs mt-1 error-message';
                                errorMessage.textContent = 'Пожалуйста, введите корректный email';
                                input.insertAdjacentElement('afterend', errorMessage);
                            }
                        }
                    }
                }
            });
            
            if (isValid) {
                // Имитация отправки формы
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Отправка...';
                submitBtn.disabled = true;
                
                // В реальном проекте здесь будет отправка AJAX-запроса
                setTimeout(() => {
                    // Сбрасываем форму и показываем сообщение об успешной отправке
                    this.reset();
                    
                    // Создаем и показываем сообщение об успехе
                    const successMessage = document.createElement('div');
                    successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
                    successMessage.innerHTML = `
                        <span class="block sm:inline">Спасибо! Ваше сообщение отправлено успешно.</span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <i class="fas fa-times"></i>
                        </span>
                    `;
                    
                    this.prepend(successMessage);
                    
                    // Восстанавливаем кнопку
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Скрываем сообщение через 5 секунд
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                    
                    // Обработчик для закрытия сообщения
                    const closeBtn = successMessage.querySelector('i.fa-times');
                    closeBtn.addEventListener('click', function() {
                        successMessage.remove();
                    });
                }, 1500);
            }
        });
        
        // Убираем сообщение об ошибке при фокусе на поле
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('border-red-500');
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                    this.nextElementSibling.remove();
                }
            });
        });
    });
    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // Добавляем классы для анимации к нужным элементам
    const sectionsToAnimate = document.querySelectorAll('section > div > div.grid > div');
    sectionsToAnimate.forEach(section => {
        section.classList.add('animate-on-scroll', 'opacity-0', 'transform', 'translate-y-8');
    });
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            transition: all 0.8s ease;
        }
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Запускаем анимацию при скролле
    window.addEventListener('scroll', animateOnScroll);
    // Запускаем один раз при загрузке страницы
    animateOnScroll();
    
    // Плавный скролл при клике на ссылки навигации
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Функция для маркера прогресса в родительском кабинете (пример)
function initProgressChart() {
    // Эта функция может быть расширена в будущем для интеграции с библиотеками визуализации
    const progressMarkers = document.querySelectorAll('.progress-marker');
    progressMarkers.forEach(marker => {
        const value = parseInt(marker.getAttribute('data-value'));
        marker.style.width = `${value}%`;
    });
}

// Функция для обработки модалок (всплывающих окон)
function initModals() {
    // Если необходимо добавить более сложную логику работы с модальными окнами
    // Этот код можно расширить для обработки различных типов модальных окон
    console.log('Modals initialized');
}

// Инициализация всех интерактивных элементов
function initInteractive() {
    // Вызов функций инициализации компонентов
    initProgressChart();
    initModals();
    
    // Другие инициализации можно добавить здесь
}

// Запуск после полной загрузки страницы
window.addEventListener('load', initInteractive);
// ---------------------------------------------------------------------------------------------
// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
if (localStorage.getItem('theme') === 'dark') {
  htmlElement.classList.add('dark');
}
themeToggle.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});