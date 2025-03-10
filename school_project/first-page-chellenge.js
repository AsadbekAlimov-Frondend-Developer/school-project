function Function() {
    // Prevent multiple initializations
    if (window.gameActive) {
        return;
    }
    
    // Mark as active
    window.gameActive = true;
    
    // Game state
    const gameState = {
        points: 0,
        level: 1,
        streak: 7,
        challenges: [
            { id: 1, name: "Быстрая реакция", description: "Нажмите на появляющиеся цели", completed: false, reward: 50 },
            { id: 2, name: "Точность", description: "Попадите по 10 целям подряд", completed: false, reward: 100 },
            { id: 3, name: "Мастерство", description: "Наберите 500 очков", completed: false, reward: 200 }
        ],
        highScore: 0,
        lastPlayed: null
    };
    
    // Try to load saved state
    try {
        const saved = localStorage.getItem('gameProgressState');
        if (saved) {
            const parsedState = JSON.parse(saved);
            Object.assign(gameState, parsedState);
        }
    } catch (e) {
        console.error('Failed to load game state');
    }
    
    // Save game state
    function saveGameState() {
        localStorage.setItem('gameProgressState', JSON.stringify(gameState));
    }
    
    // Create game container
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    gameContainer.style.position = 'fixed';
    gameContainer.style.top = '0';
    gameContainer.style.left = '0';
    gameContainer.style.width = '100%';
    gameContainer.style.height = '100%';
    gameContainer.style.backgroundColor = 'rgba(0,0,0,0.85)';
    gameContainer.style.zIndex = '9999';
    gameContainer.style.display = 'flex';
    gameContainer.style.flexDirection = 'column';
    gameContainer.style.alignItems = 'center';
    gameContainer.style.justifyContent = 'center';
    gameContainer.style.fontFamily = 'Arial, sans-serif';
    
    // Create game UI
    gameContainer.innerHTML = `
        <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 24px; cursor: pointer;" id="close-game">×</div>
        
        <div style="background-color: rgba(255,255,255,0.1); border-radius: 10px; padding: 20px; width: 90%; max-width: 600px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <div style="color: white;">
                    <div style="font-size: 14px; opacity: 0.7;">Уровень</div>
                    <div style="font-size: 24px; font-weight: bold;" id="game-level">${gameState.level}</div>
                </div>
                
                <div style="color: white; text-align: center;">
                    <div style="font-size: 14px; opacity: 0.7;">Серия</div>
                    <div style="font-size: 24px; font-weight: bold;" id="game-streak">${gameState.streak} дней</div>
                </div>
                
                <div style="color: white; text-align: right;">
                    <div style="font-size: 14px; opacity: 0.7;">Очки</div>
                    <div style="font-size: 24px; font-weight: bold;" id="game-score">${gameState.points}</div>
                </div>
            </div>
            
            <div style="height: 6px; background-color: rgba(255,255,255,0.2); border-radius: 3px; margin-bottom: 15px;">
                <div id="level-progress" style="height: 100%; background-color: #FF5252; border-radius: 3px; width: ${(gameState.points % 500) / 5}%;"></div>
            </div>
            
            <div style="color: white; font-size: 14px; opacity: 0.7; text-align: center; margin-bottom: 10px;">Испытания</div>
            
            <div id="challenges-container">
                ${gameState.challenges.map(challenge => `
                    <div class="game-challenge" style="background-color: rgba(255,255,255,0.05); border-radius: 5px; padding: 10px; margin-bottom: 10px; color: white; ${challenge.completed ? 'border-left: 3px solid #4CAF50;' : ''}">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <div style="font-weight: bold;">${challenge.name}</div>
                            <div style="color: #FF5252;">+${challenge.reward}</div>
                        </div>
                        <div style="font-size: 12px; opacity: 0.7;">${challenge.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div id="game-arena" style="background-color: rgba(255,255,255,0.05); border-radius: 10px; width: 90%; max-width: 600px; height: 300px; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 20px;">Аркадная мини-игра</div>
                <button id="start-game" style="background-color: #FF5252; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; cursor: pointer;">Начать игру</button>
            </div>
        </div>
        
        <div style="color: white; margin-top: 20px; font-size: 14px; opacity: 0.7;">
            Рекорд: <span id="high-score">${gameState.highScore}</span>
        </div>
    `;
    
    // Add game container to body
    document.body.appendChild(gameContainer);
    
    // Game variables
    let gameRunning = false;
    let currentScore = 0;
    let targetsHit = 0;
    let consecutiveHits = 0;
    let maxConsecutiveHits = 0;
    let missedTargets = 0;
    
    // Get DOM elements
    const closeButton = document.getElementById('close-game');
    const startButton = document.getElementById('start-game');
    const gameArena = document.getElementById('game-arena');
    const scoreDisplay = document.getElementById('game-score');
    const levelDisplay = document.getElementById('game-level');
    const levelProgress = document.getElementById('level-progress');
    const highScoreDisplay = document.getElementById('high-score');
    
    // Close game
    closeButton.addEventListener('click', () => {
        gameContainer.remove();
        window.gameActive = false;
    });
    
    // Start game
    startButton.addEventListener('click', startGame);
    
    function startGame() {
        // Clear arena
        gameArena.innerHTML = '';
        
        // Set up game state
        gameRunning = true;
        currentScore = 0;
        targetsHit = 0;
        consecutiveHits = 0;
        maxConsecutiveHits = 0;
        missedTargets = 0;
        
        // Create score display
        const scoreElement = document.createElement('div');
        scoreElement.style.position = 'absolute';
        scoreElement.style.top = '10px';
        scoreElement.style.right = '10px';
        scoreElement.style.color = 'white';
        scoreElement.style.fontSize = '20px';
        scoreElement.textContent = currentScore;
        gameArena.appendChild(scoreElement);
        
        // Start spawning targets
        const gameInterval = setInterval(() => {
            if (!gameRunning) {
                clearInterval(gameInterval);
                return;
            }
            
            // Create target
            createTarget();
            
            // Check if streak challenge is completed
            if (maxConsecutiveHits >= 10 && !gameState.challenges[1].completed) {
                completeChallenge(1);
            }
            
            // Check if points challenge is completed
            if (gameState.points >= 500 && !gameState.challenges[2].completed) {
                completeChallenge(2);
            }
            
            // Update score display
            scoreElement.textContent = currentScore;
            
            // End game if too many misses
            if (missedTargets >= 5) {
                endGame();
                clearInterval(gameInterval);
            }
        }, 1000);
        
        // Create first target
        createTarget();
    }
    
    function createTarget() {
        // Create target element
        const target = document.createElement('div');
        target.className = 'game-target';
        
        // Random size between 20-50px
        const size = Math.floor(Math.random() * 30) + 20;
        
        // Random position within arena
        const maxX = gameArena.offsetWidth - size;
        const maxY = gameArena.offsetHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        // Set target styles
        target.style.position = 'absolute';
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        target.style.borderRadius = '50%';
        target.style.backgroundColor = '#FF5252';
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        target.style.cursor = 'pointer';
        target.style.transition = 'transform 0.1s ease, opacity 0.3s ease';
        
        // Add target to arena
        gameArena.appendChild(target);
        
        // Target click handler
        target.addEventListener('click', () => {
            // Calculate points based on size (smaller = more points)
            const points = Math.floor(100 / (size / 20));
            currentScore += points;
            
            // Show points animation
            showPointsAnimation(posX, posY, points);
            
            // Remove target
            target.remove();
            
            // Track hits
            targetsHit++;
            consecutiveHits++;
            maxConsecutiveHits = Math.max(maxConsecutiveHits, consecutiveHits);
            
            // Complete challenge 1 if hitting 5 targets
            if (targetsHit >= 5 && !gameState.challenges[0].completed) {
                completeChallenge(0);
            }
        });
        
        // Remove target after timeout and count as miss
        setTimeout(() => {
            if (document.body.contains(target)) {
                target.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(target)) {
                        target.remove();
                        if (gameRunning) {
                            missedTargets++;
                            consecutiveHits = 0;
                        }
                    }
                }, 300);
            }
        }, 2000);
    }
    
    function showPointsAnimation(x, y, points) {
        // Create points element
        const pointsElement = document.createElement('div');
        pointsElement.textContent = `+${points}`;
        pointsElement.style.position = 'absolute';
        pointsElement.style.left = `${x}px`;
        pointsElement.style.top = `${y}px`;
        pointsElement.style.color = 'white';
        pointsElement.style.fontWeight = 'bold';
        pointsElement.style.fontSize = '16px';
        pointsElement.style.pointerEvents = 'none';
        pointsElement.style.animation = 'float-up 1s forwards';
        
        // Add animation style if not already added
        if (!document.getElementById('game-animations')) {
            const animStyle = document.createElement('style');
            animStyle.id = 'game-animations';
            animStyle.textContent = `
                @keyframes float-up {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-30px); opacity: 0; }
                }
            `;
            document.head.appendChild(animStyle);
        }
        
        // Add to arena and remove after animation
        gameArena.appendChild(pointsElement);
        setTimeout(() => pointsElement.remove(), 1000);
    }
    
    function endGame() {
        // Stop game
        gameRunning = false;
        
        // Update game state
        gameState.points += currentScore;
        
        // Check for level up
        const newLevel = Math.floor(gameState.points / 500) + 1;
        if (newLevel > gameState.level) {
            showLevelUpAnimation(newLevel);
            gameState.level = newLevel;
        }
        
        // Update high score
        if (currentScore > gameState.highScore) {
            gameState.highScore = currentScore;
            highScoreDisplay.textContent = gameState.highScore;
            showNotification('Новый рекорд!', `${currentScore} очков`);
        }
        
        // Update streak
        const today = new Date().toDateString();
        if (gameState.lastPlayed !== today) {
            gameState.streak++;
            gameState.lastPlayed = today;
            document.getElementById('game-streak').textContent = `${gameState.streak} дней`;
        }
        
        // Update UI
        scoreDisplay.textContent = gameState.points;
        levelDisplay.textContent = gameState.level;
        levelProgress.style.width = `${(gameState.points % 500) / 5}%`;
        
        // Save state
        saveGameState();
        
        // Show result screen
        gameArena.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center; width: 80%;">
                <div style="font-size: 28px; margin-bottom: 10px;">Игра окончена</div>
                <div style="font-size: 18px; margin-bottom: 20px;">Вы набрали: ${currentScore} очков</div>
                <div style="margin-bottom: 15px;">
                    <div style="font-size: 14px; opacity: 0.7; margin-bottom: 5px;">Статистика:</div>
                    <div style="display: flex; justify-content: space-between; font-size: 14px;">
                        <div>Попаданий: ${targetsHit}</div>
                        <div>Макс. серия: ${maxConsecutiveHits}</div>
                    </div>
                </div>
                <button id="restart-game" style="background-color: #FF5252; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; cursor: pointer;">Играть снова</button>
            </div>
        `;
        
        // Add restart button handler
        document.getElementById('restart-game').addEventListener('click', startGame);
    }
    
    function completeChallenge(index) {
        const challenge = gameState.challenges[index];
        if (challenge.completed) return;
        
        // Mark as completed
        challenge.completed = true;
        
        // Add points
        gameState.points += challenge.reward;
        scoreDisplay.textContent = gameState.points;
        
        // Update UI
        const challengesContainer = document.getElementById('challenges-container');
        if (challengesContainer) {
            const challengeElements = challengesContainer.querySelectorAll('.game-challenge');
            if (challengeElements[index]) {
                challengeElements[index].style.borderLeft = '3px solid #4CAF50';
            }
        }
        
        // Show notification
        showNotification('Испытание выполнено!', `${challenge.name}: +${challenge.reward} очков`);
        
        // Save state
        saveGameState();
    }
    
    function showLevelUpAnimation(newLevel) {
        // Create level up overlay
        const levelUpOverlay = document.createElement('div');
        levelUpOverlay.style.position = 'absolute';
        levelUpOverlay.style.top = '0';
        levelUpOverlay.style.left = '0';
        levelUpOverlay.style.width = '100%';
        levelUpOverlay.style.height = '100%';
        levelUpOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        levelUpOverlay.style.display = 'flex';
        levelUpOverlay.style.justifyContent = 'center';
        levelUpOverlay.style.alignItems = 'center';
        levelUpOverlay.style.zIndex = '10000';
        levelUpOverlay.style.animation = 'fade-in 0.5s forwards';
        
        // Level up content
        levelUpOverlay.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="font-size: 28px; margin-bottom: 10px;">Уровень повышен!</div>
                <div style="font-size: 48px; color: #FF5252; margin-bottom: 20px;">${newLevel}</div>
                <div style="font-size: 16px;">Новые испытания разблокированы</div>
            </div>
        `;
        
        // Add animation style if not exists
        if (!document.getElementById('level-up-animations')) {
            const animStyle = document.createElement('style');
            animStyle.id = 'level-up-animations';
            animStyle.textContent = `
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(animStyle);
        }
        
        // Add to game container
        gameContainer.appendChild(levelUpOverlay);
        
        // Remove after animation
        setTimeout(() => {
            levelUpOverlay.style.opacity = '0';
            levelUpOverlay.style.transition = 'opacity 0.5s ease';
            setTimeout(() => levelUpOverlay.remove(), 500);
        }, 3000);
    }
    
    function showNotification(title, message) {
        // Create notification
        const notification = document.createElement('div');
        notification.style.position = 'absolute';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'rgba(0,0,0,0.8)';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.borderLeft = '3px solid #FF5252';
        notification.style.zIndex = '10001';
        notification.style.transform = 'translateX(120%)';
        notification.style.transition = 'transform 0.3s ease';
        notification.style.maxWidth = '300px';
        
        // Notification content
        notification.innerHTML = `
            <div style="margin-bottom: 5px; font-weight: bold;">${title}</div>
            <div style="font-size: 14px; opacity: 0.8;">${message}</div>
        `;
        
        // Add to game container
        gameContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after timeout
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}