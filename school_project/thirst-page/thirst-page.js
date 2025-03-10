// Функция для плавной прокрутки к разделам при нажатии на навигационные ссылки
document.addEventListener('DOMContentLoaded', function() {
    // Находим все ссылки навигации
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Добавляем обработчик событий для каждой ссылки
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем идентификатор раздела из атрибута href
            const targetId = this.getAttribute('href');
            
            // Проверяем, не является ли это ссылкой в никуда
            if (targetId === '#') return;
            
            // Находим целевой элемент
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Плавно прокручиваем к элементу
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Небольшой отступ сверху
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Обработка FAQ раскрывающихся элементов
    const faqButtons = document.querySelectorAll('#support .border-b button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Находим содержимое FAQ после кнопки
            const content = this.nextElementSibling;
            
            // Переключаем класс скрытия
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                this.querySelector('i').classList.remove('fa-chevron-up');
                this.querySelector('i').classList.add('fa-chevron-down');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                this.querySelector('i').classList.remove('fa-chevron-down');
                this.querySelector('i').classList.add('fa-chevron-up');
            }
        });
    });
    
    // Инициализация формы обратной связи
    const contactForm = document.querySelector('#support form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            
            // Проверка заполнения полей
            if (!name || !email || !message) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Имитация отправки данных
            showNotification('Ваше сообщение успешно отправлено!', 'success');
            
            // Сброс формы
            this.reset();
        });
    }
    
    // Переключение темы (светлая/темная)
    const themeToggle = document.querySelector('.fixed.bottom-5.right-5 button');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
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
    
    // Добавляем функции для анимации прогресс-баров
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.bg-indigo-600.h-2.5.rounded-full');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Запускаем анимацию прогресс-баров при прокрутке до раздела
    const progressSection = document.getElementById('progress');
    if (progressSection) {
        window.addEventListener('scroll', function() {
            const position = progressSection.getBoundingClientRect();
            
            // Если раздел видим в окне просмотра
            if (position.top < window.innerHeight && position.bottom >= 0) {
                animateProgressBars();
                // Удаляем обработчик, чтобы анимация была только один раз
                window.removeEventListener('scroll', this);
            }
        });
    }
    
    // Функция для отображения уведомлений
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform translate-y-0 opacity-100`;
        
        // Стилизуем уведомление в зависимости от типа
        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-blue-500', 'text-white');
        }
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-y-[-20px]');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Добавляем функцию для кнопки "Начать бесплатно"
    const startButtons = document.querySelectorAll('button:not([type="submit"])');
    startButtons.forEach(button => {
        if (button.textContent.trim() === 'Начать бесплатно' || button.textContent.trim() === 'Узнать больше') {
            button.addEventListener('click', function() {
                showNotification('Функция будет доступна после полной настройки платформы', 'info');
            });
        }
    });
    
    // Создаем мобильное меню для маленьких экранов
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'md:hidden text-white text-2xl';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Вставляем кнопку меню в шапку
        header.querySelector('.flex.items-center').appendChild(mobileMenuButton);
        
        // Находим навигационное меню
        const nav = header.querySelector('nav');
        nav.classList.add('hidden', 'md:flex');
        
        // Обработчик клика по кнопке мобильного меню
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('hidden');
            
            // Меняем иконку
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    };
    
    createMobileMenu();
    
    // Анимация появления блоков при прокрутке
    function animateOnScroll() {
        const elements = document.querySelectorAll('.bg-white, .bg-blue-50, .bg-green-50, .bg-purple-50, .bg-amber-50, .rounded-xl');
        
        elements.forEach(element => {
            // Добавляем классы для анимации
            element.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-10');
            
            // Функция проверки видимости элемента
            const isInViewport = () => {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.bottom >= 0
                );
            };
            
            // Функция анимации при видимости
            const animateIfVisible = () => {
                if (isInViewport()) {
                    element.classList.remove('opacity-0', 'translate-y-10');
                    element.classList.add('opacity-100', 'translate-y-0');
                }
            };
            
            // Запускаем проверку при прокрутке
            window.addEventListener('scroll', animateIfVisible);
            
            // Проверяем видимость при загрузке
            animateIfVisible();
        });
    }
    
    animateOnScroll();
    
    // Функция модального окна для логина
    function setupLoginModal() {
        const loginButton = document.querySelector('button.bg-white.text-purple-700');
        
        if (loginButton) {
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
            modal.id = 'loginModal';
            
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">Вход в аккаунт</h3>
                        <button id="closeLoginModal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form id="loginForm">
                        <div class="mb-4">
                            <label for="loginEmail" class="block text-gray-700 mb-2">Email</label>
                            <input type="email" id="loginEmail" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        <div class="mb-6">
                            <label for="loginPassword" class="block text-gray-700 mb-2">Пароль</label>
                            <input type="password" id="loginPassword" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors w-full">
                            Войти
                        </button>
                        <div class="text-center mt-4 text-gray-600">
                            <a href="#" class="text-indigo-600 hover:underline">Забыли пароль?</a>
                        </div>
                        <div class="text-center mt-4 text-gray-600">
                            Нет аккаунта? <a href="#" class="text-indigo-600 hover:underline">Зарегистрироваться</a>
                        </div>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Обработчик клика на кнопку логина
            loginButton.addEventListener('click', function() {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
            });
            
            // Обработчик клика на кнопку закрытия
            document.getElementById('closeLoginModal').addEventListener('click', function() {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Возвращаем прокрутку
            });
            
            // Закрытие модального окна при клике вне его области
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Обработчик отправки формы логина
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Получаем данные формы
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Проверка заполнения полей
                if (!email || !password) {
                    showNotification('Пожалуйста, заполните все поля', 'error');
                    return;
                }
                
                // Имитация проверки логина
                showNotification('Успешный вход в систему!', 'success');
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Очистка формы
                this.reset();
            });
        }
    }
    
    setupLoginModal();
});

// --------------------------------------------------------------------------------------------------------------------------------

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