// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate on scroll
    const animatedElements = [
        document.getElementById('practice-advice-title'),
        document.getElementById('experts-title'),
        document.getElementById('description-text'),
        document.getElementById('card-1'),
        document.getElementById('card-2'),
        document.getElementById('card-3'),
        document.getElementById('card-4')
    ];

    // Function to check if an element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate elements when they come into view
    function animateOnScroll() {
        animatedElements.forEach(element => {
            if (element && isInViewport(element) && element.classList.contains('opacity-0')) {
                // Remove the opacity-0 and translate-y classes to trigger animation
                element.classList.remove('opacity-0', 'translate-y-4', 'translate-y-8');
                // Add animation styles
                element.style.opacity = 1;
                element.style.transform = 'translate(0px, 0px)';
            }
        });
    }

    // Initial check for elements in view when page loads
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Progress bar animation for gamification card
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.challenge .bg-red-500');
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width || '70%';
            bar.style.width = '70%';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = targetWidth;
            }, 300);
        });
    }

    // Call progress bar animation after initial animations
    setTimeout(animateProgressBars, 1500);// Function to handle badge hover effects
    function setupBadgeInteractions() {
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.classList.remove('bg-red-100');
                this.classList.add('bg-red-200');
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'all 0.3s ease';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.classList.remove('bg-red-200');
                this.classList.add('bg-red-100');
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Setup card hover interactions
    function setupCardInteractions() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'translateY(-5px)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'translateY(0px)';
                }
            });
        });
    }

    // Setup reward icons interactions
    function setupRewardIconsInteractions() {
        const rewardIcons = document.querySelectorAll('.rewards-icons i');
        rewardIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(10deg) scale(1.2)';
                this.style.transition = 'all 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0deg) scale(1)';
            });
        });
    }

    // Call setup functions
    setupBadgeInteractions();
    setupCardInteractions();
    setupRewardIconsInteractions();

    // Handle links click events
    const allLinks = document.querySelectorAll('.card-content a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const linkText = this.textContent.trim();
            console.log(`Link clicked: ${linkText}`);
            
            // Add your custom logic here for different links
            if (linkText === 'Все достижения') {
                showAllAchievements();
            } else if (linkText === 'Обменять баллы') {
                showRewardsExchange();
            } else if (linkText === 'Подробный план') {
                showDetailedPlan();
            } else if (linkText === 'Все задания') {
                showAllChallenges();
            }
        });
    });// Functions to handle specific link actions
    function showAllAchievements() {
        // Example implementation: create a modal to show all achievements
        createModal('Все достижения', `
            <div class="achievements-grid grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="achievement-item p-3 border rounded-lg text-center">
                    <i class="fas fa-trophy text-yellow-500 text-2xl mb-2"></i>
                    <p class="text-sm font-medium">Мастер алгебры</p>
                    <p class="text-xs text-gray-500">Решено 50 задач</p>
                </div>
                <div class="achievement-item p-3 border rounded-lg text-center">
                    <i class="fas fa-book text-yellow-500 text-2xl mb-2"></i>
                    <p class="text-sm font-medium">Грамотей</p>
                    <p class="text-xs text-gray-500">Изучено 100 правил</p>
                </div>
                <div class="achievement-item p-3 border rounded-lg text-center">
                    <i class="fas fa-landmark text-yellow-500 text-2xl mb-2"></i>
                    <p class="text-sm font-medium">Историк</p>
                    <p class="text-xs text-gray-500">Пройдено 10 тестов</p>
                </div>
                <!-- Add more achievements here -->
            </div>
        `);
    }

    function showRewardsExchange() {
        createModal('Обменять баллы', `
            <div class="rewards-exchange p-4">
                <p class="mb-4">У вас <span class="font-bold text-red-500">570</span> баллов</p>
                <div class="rewards-list space-y-3">
                    <div class="reward-item flex justify-between items-center p-3 border rounded-lg">
                        <div>
                            <p class="font-medium">Подсказка на тесте</p>
                            <p class="text-sm text-gray-500">Получите подсказку на любом тесте</p>
                        </div>
                        <button class="bg-red-500 text-white px-4 py-1 rounded">100 баллов</button>
                    </div>
                    <div class="reward-item flex justify-between items-center p-3 border rounded-lg">
                        <div>
                            <p class="font-medium">Дополнительное время</p>
                            <p class="text-sm text-gray-500">+5 минут для любого задания</p>
                        </div>
                        <button class="bg-red-500 text-white px-4 py-1 rounded">200 баллов</button>
                    </div>
                </div>
            </div>
        `);
    }

    function showDetailedPlan() {
        createModal('Подробный план обучения', `
            <div class="learning-plan p-4">
                <div class="plan-item mb-4 pb-4 border-b">
                    <h3 class="font-medium mb-2">Математика</h3>
                    <ul class="text-sm text-gray-600 space-y-2">
                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i>Квадратные уравнения</li>
                        <li><i class="fas fa-circle text-yellow-500 mr-2"></i>Практика уравнений (рекомендуется)</li>
                        <li><i class="fas fa-circle text-gray-300 mr-2"></i>Системы уравнений</li>
                    </ul>
                </div>
                <div class="plan-item mb-4 pb-4 border-b">
                    <h3 class="font-medium mb-2">Физика</h3>
                    <ul class="text-sm text-gray-600 space-y-2">
                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i>Механика</li>
                        <li><i class="fas fa-circle text-gray-300 mr-2"></i>Тест по оптике (рекомендуется)</li>
                    </ul>
                </div>
            </div>
        `);
    }

    function showAllChallenges() {
        createModal('Все задания', `
            <div class="challenges-list p-4">
                <div class="challenge mb-4 pb-4 border-b">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-medium w-full">Серия побед</h3>
                        <span class="text-red-500">7/10 дней</span>
                    </div>
                    <div class="w-full bg-gray-300 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full" style="width: 70% !important;"></div>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Занимайтесь каждый день, чтобы получить 100 баллов!</p>
                </div>
                <div class="challenge mb-4 pb-4 border-b">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-medium">Математический гений</h3>
                        <span class="text-red-500">15/30 заданий</span>
                    </div>
                    <div class="w-full bg-gray-300 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full" style="width: 50%"></div>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Решите 30 задач по математике</p>
                </div>
            </div>
        `);
    }

    // Function to create a modal
    function createModal(title, content) {
        // Check if modal already exists and remove it
        const existingModal = document.querySelector('.custom-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'custom-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-lg w-full max-w-lg mx-4';
        
        modalContent.innerHTML = `
            <div class="border-b p-4 flex justify-between items-center">
                <h3 class="font-bold text-lg">${title}</h3>
                <button class="modal-close text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body p-4">
                ${content}
            </div>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Add event listener to close button
        const closeButton = modalContent.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            modalOverlay.remove();
        });
        
        // Close modal when clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });
    }
});

// --------------------------------------------subject--------------------------------------------------------------------
// Add this JavaScript code to your page
document.addEventListener('DOMContentLoaded', function() {
    // Find all links that contain the text "Другие школьные предметы"
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
      if (link.textContent.trim() === 'Другие школьные предметы' || 
          link.innerHTML.includes('Другие школьные предметы')) {
        // Add click event listener to each matching link
        link.addEventListener('click', function(event) {
          event.preventDefault();
          showMoreSubjects();
        });
      }
    });
    
    // Function to show the subjects modal
    function showMoreSubjects() {
      // Create modal container
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '1000';
      
      // Create modal content
      const modalContent = document.createElement('div');
      modalContent.style.backgroundColor = 'white';
      modalContent.style.borderRadius = '8px';
      modalContent.style.padding = '20px';
      modalContent.style.maxWidth = '600px';
      modalContent.style.width = '90%';
      modalContent.style.maxHeight = '80vh';
      modalContent.style.overflowY = 'auto';
      
      // Modal header
      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.marginBottom = '20px';
      
      const title = document.createElement('h3');
      title.textContent = 'Другие школьные предметы';
      title.style.fontSize = '1.25rem';
      title.style.fontWeight = 'bold';
      
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.fontSize = '1.5rem';
      closeBtn.style.border = 'none';
      closeBtn.style.background = 'none';
      closeBtn.style.cursor = 'pointer';
      closeBtn.addEventListener('click', () => modal.remove());
      
      header.appendChild(title);
      header.appendChild(closeBtn);
      
      // Subjects grid
      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
      grid.style.gap = '15px';
      
      // Subject list
      const subjects = [
        'Химия', 'Биология', 'География', 'Литература', 
        'Английский язык', 'Информатика', 'Обществознание', 
        'Экономика', 'Астрономия', 'Геометрия'
      ];
      
      subjects.forEach(subject => {
        const subjectItem = document.createElement('div');
        subjectItem.style.padding = '10px';
        subjectItem.style.borderRadius = '6px';
        subjectItem.style.backgroundColor = '#f8f8f8';
        subjectItem.style.display = 'flex';
        subjectItem.style.alignItems = 'center';
        subjectItem.style.cursor = 'pointer';
        subjectItem.addEventListener('mouseover', () => {
          subjectItem.style.backgroundColor = '#fee2e2'; // Light red on hover
        });
        subjectItem.addEventListener('mouseout', () => {
          subjectItem.style.backgroundColor = '#f8f8f8';
        });
        
        const iconBox = document.createElement('div');
        iconBox.style.width = '32px';
        iconBox.style.height = '32px';
        iconBox.style.borderRadius = '6px';
        iconBox.style.backgroundColor = '#ef4444'; // Red-500
        iconBox.style.display = 'flex';
        iconBox.style.alignItems = 'center';
        iconBox.style.justifyContent = 'center';
        iconBox.style.marginRight = '10px';
        
        // Use text as icon since we don't know if Font Awesome is loaded
        iconBox.textContent = '📚';
        iconBox.style.color = 'white';
        iconBox.style.fontSize = '14px';
        
        const subjectName = document.createElement('span');
        subjectName.textContent = subject;
        
        subjectItem.appendChild(iconBox);
        subjectItem.appendChild(subjectName);
        grid.appendChild(subjectItem);
      });
      
      // Assemble modal
      modalContent.appendChild(header);
      modalContent.appendChild(grid);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      
      // Close when clicking outside
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.remove();
        }
      });
    }
  });