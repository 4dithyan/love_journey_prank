// Ultimate Love Journey - Script.js

// Global variables
let userName = '';
let currentLevel = 1;
let audioEnabled = true;
let musicPlaying = false;
let backgroundMusic = null;
let clickSound = null;

// DOM Elements
const elements = {
    landingPage: document.getElementById('landingPage'),
    aiScanScreen: document.getElementById('aiScanScreen'),
    levelScreens: document.getElementById('levelScreens'),
    userNameInput: document.getElementById('userNameInput'),
    startJourneyBtn: document.getElementById('startJourneyBtn'),
    scanProgress: document.getElementById('scanProgress'),
    scanStatusText: document.getElementById('scanStatusText'),
    levelProgressBar: document.getElementById('levelProgressBar'),
    currentLevel: document.getElementById('currentLevel'),
    level1: document.getElementById('level1'),
    level2: document.getElementById('level2'),
    level3: document.getElementById('level3'),
    level4: document.getElementById('level4'),
    level1Progress: document.getElementById('level1Progress'),
    crushResult: document.getElementById('crushResult'),
    crushMessage: document.getElementById('crushMessage'),
    level1NextBtn: document.getElementById('level1NextBtn'),
    calculateLoyaltyBtn: document.getElementById('calculateLoyaltyBtn'),
    loyaltyResult: document.getElementById('loyaltyResult'),
    loyaltyPercentage: document.getElementById('loyaltyPercentage'),
    loyaltyDescription: document.getElementById('loyaltyDescription'),
    weddingYear: document.getElementById('weddingYear'),
    partnerType: document.getElementById('partnerType'),
    homeType: document.getElementById('homeType'),
    kidsCount: document.getElementById('kidsCount'),
    predictNextBtn: document.getElementById('predictNextBtn'),
    finalResult: document.getElementById('finalResult'),
    finalUserName: document.getElementById('finalUserName'),
    restartBtn: document.getElementById('restartBtn'),
    shareBtn: document.getElementById('shareBtn'),
    musicToggle: document.getElementById('musicToggle'),
    soundToggle: document.getElementById('soundToggle')
};

// Status messages for AI scan
const scanMessages = [
    "Connecting to Cupid Server...",
    "Scanning WhatsApp...",
    "Analyzing Heartbeat...",
    "Checking Instagram...",
    "Reviewing Facebook...",
    "Monitoring TikTok...",
    "Accessing Snapchat...",
    "Calculating Compatibility...",
    "Analyzing Chat History...",
    "Detecting Love Signals..."
];

// Crush messages
const crushMessages = [
    "OMG! It's your neighbor Sarah! She's been checking your Instagram stories daily! 😍",
    "Your ex is still watching your stories... awkward! 😳",
    "Someone from your high school class has been messaging you secretly! 💕",
    "Your coffee shop barista remembers your order AND your name! ☕️❤️",
    "The person sitting behind you in class thinks you're absolutely gorgeous! 👀",
    "Your gym buddy wants to 'work out together' more often 😉",
    "That cute librarian keeps recommending books you'd like! 📚💘",
    "Your Uber driver asked about you specifically! 🚗😍",
    "Someone's been leaving flowers at your door! 🌸",
    "Your friend's friend keeps asking about you! 🤭"
];

// Partner types
const partnerTypes = [
    "Adventurous Soul",
    "Homebody Chef",
    "Fitness Enthusiast", 
    "Bookworm Scholar",
    "Travel Addict",
    "Music Lover",
    "Artistic Soul",
    "Tech Genius",
    "Animal Lover",
    "Foodie Explorer"
];

// Home types
const homeTypes = [
    "Beach Villa",
    "Mountain Cabin",
    "City Loft",
    "Suburban House",
    "Treehouse",
    "Tiny House",
    "Castle",
    "Floating House",
    "Underground Cave",
    "Space Station"
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Create floating hearts background
    createHeartsBackground();
    
    // Initialize audio
    initializeAudio();
    
    // Make sure landing page is visible and show it with animation
    elements.landingPage.style.display = 'block';
    elements.landingPage.classList.add('animate-fade-in');
    
    // Hide other screens initially
    elements.aiScanScreen.style.display = 'none';
    elements.levelScreens.style.display = 'none';
}

function setupEventListeners() {
    // Start journey button
    elements.startJourneyBtn.addEventListener('click', startJourney);
    
    // Level 1 next button
    elements.level1NextBtn.addEventListener('click', () => showLevel(2));
    
    // Calculate loyalty button
    elements.calculateLoyaltyBtn.addEventListener('click', calculateLoyalty);
    
    // Predict next button
    elements.predictNextBtn.addEventListener('click', () => showLevel(4));
    
    // Restart button
    elements.restartBtn.addEventListener('click', restartJourney);
    
    // Share button
    elements.shareBtn.addEventListener('click', shareResult);
    
    // Audio toggle buttons
    elements.musicToggle.addEventListener('click', toggleMusic);
    elements.soundToggle.addEventListener('click', toggleSound);
}

function initializeAudio() {
    // Create background music audio element
    backgroundMusic = new Audio();
    backgroundMusic.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'; // Placeholder base64 audio
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    
    // Create click sound audio element
    clickSound = new Audio();
    clickSound.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'; // Placeholder base64 audio
    clickSound.volume = 0.5;
}

function createHeartsBackground() {
    const container = document.getElementById('heartsContainer');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'heart';
        
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = size + 'px';
        
        // Random animation delay
        heart.style.animationDelay = Math.random() * 6 + 's';
        
        // Random animation duration
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        container.appendChild(heart);
    }
}

function startJourney() {
    // Validate input
    userName = elements.userNameInput.value.trim();
    if (!userName) {
        elements.userNameInput.classList.add('shake');
        setTimeout(() => {
            elements.userNameInput.classList.remove('shake');
        }, 500);
        playClickSound();
        return;
    }
    
    // Play click sound
    playClickSound();
    
    // Add fade out effect to landing page
    elements.landingPage.style.opacity = '0';
    elements.landingPage.style.transition = 'opacity 0.5s ease';
    
    // Hide landing page and show AI scan screen after a delay
    setTimeout(() => {
        elements.landingPage.style.display = 'none';
        elements.landingPage.style.opacity = '1'; // Reset for next time
        
        // Show AI scan screen
        elements.aiScanScreen.style.display = 'block';
        elements.aiScanScreen.classList.remove('d-none'); // Make sure it's not hidden by d-none class
        
        // Start AI scan simulation
        startAIScan();
    }, 500);
}

function startAIScan() {
    let progress = 0;
    let messageIndex = 0;
    
    const scanInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(scanInterval);
            
            // Show level 1 after scan completes
            setTimeout(() => {
                elements.aiScanScreen.style.opacity = '0';
                elements.aiScanScreen.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    elements.aiScanScreen.style.display = 'none';
                    elements.aiScanScreen.style.opacity = '1'; // Reset for next time
                    showLevel(1);
                }, 500);
            }, 1000);
        }
        
        // Update progress bar
        elements.scanProgress.style.width = progress + '%';
        
        // Update status text periodically
        if (messageIndex < scanMessages.length && Math.floor(progress / 10) > messageIndex) {
            elements.scanStatusText.textContent = scanMessages[messageIndex];
            messageIndex++;
        }
    }, 300);
}

function showLevel(level) {
    // Play click sound
    playClickSound();
    
    // Update current level display
    elements.currentLevel.textContent = level;
    
    // Update progress bar
    const progressPercent = ((level - 1) / 4) * 100;
    elements.levelProgressBar.style.width = progressPercent + '%';
    
    // Show specific level with smooth transition
    setTimeout(() => {
        // First make sure levelScreens container is visible
        elements.levelScreens.style.display = 'block';
        elements.levelScreens.classList.remove('d-none');
        
        // Hide all levels first
        elements.level1.style.display = 'none';
        elements.level2.style.display = 'none';
        elements.level3.style.display = 'none';
        elements.level4.style.display = 'none';
        
        // Show specific level
        switch(level) {
            case 1:
                // Make sure level screens container is visible
                elements.levelScreens.style.display = 'block';
                elements.levelScreens.classList.remove('d-none');
                
                elements.level1.style.display = 'block';
                elements.level1.classList.remove('d-none');
                startLevel1();
                break;
            case 2:
                // Make sure level screens container is visible
                elements.levelScreens.style.display = 'block';
                elements.levelScreens.classList.remove('d-none');
                
                elements.level2.style.display = 'block';
                elements.level2.classList.remove('d-none');
                break;
            case 3:
                // Make sure level screens container is visible
                elements.levelScreens.style.display = 'block';
                elements.levelScreens.classList.remove('d-none');
                
                elements.level3.style.display = 'block';
                elements.level3.classList.remove('d-none');
                startLevel3();
                break;
            case 4:
                // Make sure level screens container is visible
                elements.levelScreens.style.display = 'block';
                elements.levelScreens.classList.remove('d-none');
                
                elements.level4.style.display = 'block';
                elements.level4.classList.remove('d-none');
                setTimeout(() => {
                    showLevel4();
                }, 100);
                break;
        }
        
        currentLevel = level;
    }, 100);
}

function startLevel1() {
    // Make sure level1 is visible
    elements.level1.style.display = 'block';
    elements.level1.classList.remove('d-none');
    
    // Simulate level 1 progress
    let progress = 0;
    const level1Interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(level1Interval);
            
            // Show crush result
            setTimeout(() => {
                const randomCrush = crushMessages[Math.floor(Math.random() * crushMessages.length)];
                elements.crushMessage.textContent = randomCrush;
                
                // Make sure the result card is visible with proper styling
                elements.crushResult.style.display = 'block';
                elements.crushResult.classList.remove('d-none');
                elements.crushResult.classList.add('result-card', 'bg-white', 'bg-opacity-20', 'rounded-3', 'p-4', 'mb-4');
                
                // Show next button
                setTimeout(() => {
                    elements.level1NextBtn.style.display = 'inline-block';
                    elements.level1NextBtn.classList.remove('d-none');
                }, 1000);
            }, 500);
        }
        
        elements.level1Progress.style.width = progress + '%';
    }, 200);
    
    // Safety timeout to prevent getting stuck
    setTimeout(() => {
        if (progress < 100) {
            clearInterval(level1Interval);
            progress = 100;
            elements.level1Progress.style.width = '100%';
            
            // Show crush result
            setTimeout(() => {
                const randomCrush = crushMessages[Math.floor(Math.random() * crushMessages.length)];
                elements.crushMessage.textContent = randomCrush;
                
                // Make sure the result card is visible with proper styling
                elements.crushResult.style.display = 'block';
                elements.crushResult.classList.remove('d-none');
                elements.crushResult.classList.add('result-card', 'bg-white', 'bg-opacity-20', 'rounded-3', 'p-4', 'mb-4');
                
                // Show next button
                setTimeout(() => {
                    elements.level1NextBtn.style.display = 'inline-block';
                    elements.level1NextBtn.classList.remove('d-none');
                }, 1000);
            }, 500);
        }
    }, 5000); // 5 second timeout as safety measure
}

function calculateLoyalty() {
    // Play click sound
    playClickSound();
    
    // Check if all questions are answered
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    
    if (!q1 || !q2 || !q3) {
        // Show error animation
        const container = document.querySelector('.questions-container');
        if (container) {
            container.classList.add('shake');
            setTimeout(() => {
                container.classList.remove('shake');
            }, 500);
        }
        return;
    }
    
    // Calculate loyalty percentage based on answers
    let loyaltyScore = 0;
    
    // Question 1 scoring
    if (q1.value === 'never') loyaltyScore += 33;
    else if (q1.value === 'sometimes') loyaltyScore += 17;
    else loyaltyScore += 0;
    
    // Question 2 scoring
    if (q2.value === 'trust') loyaltyScore += 33;
    else if (q2.value === 'wonder') loyaltyScore += 17;
    else loyaltyScore += 0;
    
    // Question 3 scoring
    if (q3.value === 'ignore') loyaltyScore += 34;
    else if (q3.value === 'glance') loyaltyScore += 17;
    else loyaltyScore += 0;
    
    // Ensure score doesn't exceed 100
    loyaltyScore = Math.min(100, loyaltyScore);
    
    // Display results with animation
    elements.loyaltyPercentage.textContent = loyaltyScore + '%';
    
    // Set loyalty description based on score
    let description = '';
    if (loyaltyScore >= 90) {
        description = 'Super Stalker Material! 🔍';
    } else if (loyaltyScore >= 70) {
        description = 'Pretty Suspicious Behavior 🤔';
    } else if (loyaltyScore >= 50) {
        description = 'Normal Relationship Anxiety 😬';
    } else if (loyaltyScore >= 30) {
        description = 'Trust Issues Much? 😵‍💫';
    } else {
        description = 'Complete Freedom! 🕊️';
    }
    
    elements.loyaltyDescription.textContent = description;
    
    // Show loyalty result with proper styling
    elements.loyaltyResult.style.display = 'block';
    elements.loyaltyResult.classList.remove('d-none');
    elements.loyaltyResult.classList.add('result-card', 'bg-white', 'bg-opacity-20', 'rounded-3', 'p-4', 'mt-4');
    
    // Change button text and functionality
    elements.calculateLoyaltyBtn.textContent = 'Next Level ➡️';
    
    // Update button click handler to go to level 3
    elements.calculateLoyaltyBtn.onclick = function() {
        showLevel(3);
    };
}

function startLevel3() {
    // Make sure level3 is visible
    elements.level3.style.display = 'block';
    elements.level3.classList.remove('d-none');
    
    // Generate random predictions
    const year = 2025 + Math.floor(Math.random() * 10);
    const partner = partnerTypes[Math.floor(Math.random() * partnerTypes.length)];
    const home = homeTypes[Math.floor(Math.random() * homeTypes.length)];
    const kids = Math.floor(Math.random() * 5);
    
    // Update prediction displays
    elements.weddingYear.textContent = year;
    elements.partnerType.textContent = partner;
    elements.homeType.textContent = home;
    elements.kidsCount.textContent = kids;
    
    // Add flip animation to cards
    const cards = document.querySelectorAll('.prediction-cards .card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'rotateY(360deg)';
            card.style.transition = 'transform 0.6s ease';
        }, index * 200);
    });
    
    // Make sure the "See Future" button is visible
    setTimeout(() => {
        elements.predictNextBtn.style.display = 'inline-block';
        elements.predictNextBtn.classList.remove('d-none');
    }, 1000);
}

function showLevel4() {
    // Make sure levelScreens is visible
    elements.levelScreens.style.display = 'block';
    elements.levelScreens.classList.remove('d-none');
    
    // Make sure level4 is visible
    elements.level4.style.display = 'block';
    elements.level4.classList.remove('d-none');
    
    // Play click sound
    playClickSound();
    
    // Show final result after delay
    setTimeout(() => {
        elements.finalUserName.textContent = userName;
        
        // Show the final result with proper styling
        elements.finalResult.style.display = 'block';
        elements.finalResult.classList.remove('d-none');
        elements.finalResult.classList.add('result-card', 'bg-white', 'bg-opacity-20', 'rounded-3', 'p-4');
        
        // Trigger confetti effect
        createConfettiEffect();
    }, 2000);
}

function createConfettiEffect() {
    // Create confetti effect using CSS animations
    const confettiElements = [];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['❤️', '💕', '💖', '✨', '🎉', '🎊'][Math.floor(Math.random() * 6)];
        confetti.style.position = 'fixed';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.zIndex = '9999';
        confetti.style.userSelect = 'none';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        // Add keyframe animation dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(confetti);
        confettiElements.push(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

function restartJourney() {
    // Play click sound
    playClickSound();
    
    // Reset all states
    elements.userNameInput.value = '';
    elements.scanProgress.style.width = '0%';
    elements.levelProgressBar.style.width = '0%';
    elements.currentLevel.textContent = '1';
    
    // Hide all level screens
    elements.aiScanScreen.style.display = 'none';
    elements.levelScreens.style.display = 'none';
    
    // Hide all level content
    elements.level1.style.display = 'none';
    elements.level2.style.display = 'none';
    elements.level3.style.display = 'none';
    elements.level4.style.display = 'none';
    
    // Hide result elements
    elements.crushResult.style.display = 'none';
    elements.loyaltyResult.style.display = 'none';
    elements.finalResult.style.display = 'none';
    
    // Reset loyalty test
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    elements.calculateLoyaltyBtn.textContent = 'Calculate Loyalty ➡️';
    elements.calculateLoyaltyBtn.onclick = calculateLoyalty;
    
    // Show landing page
    elements.landingPage.style.display = 'block';
    elements.landingPage.classList.add('animate-fade-in');
    
    // Also hide level screens since we're restarting
    elements.levelScreens.style.display = 'none';
}

function shareResult() {
    // Play click sound
    playClickSound();
    
    // Create share message
    const shareText = `Just completed the Ultimate Love Journey! ${userName} is "${elements.loyaltyDescription.textContent}" with a loyalty score of ${elements.loyaltyPercentage.textContent}. Still Single 😎🔥 #UltimateLoveJourney`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: 'Ultimate Love Journey Result',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Result copied to clipboard! Share it with your friends!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy result. Please share manually.');
        });
    }
}

function toggleMusic() {
    if (musicPlaying) {
        backgroundMusic.pause();
        elements.musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicPlaying = false;
    } else {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        elements.musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicPlaying = true;
    }
}

function toggleSound() {
    audioEnabled = !audioEnabled;
    if (audioEnabled) {
        elements.soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        elements.soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function playClickSound() {
    if (audioEnabled && clickSound) {
        // Create new audio instance to allow overlapping sounds
        const sound = new Audio(clickSound.src);
        sound.volume = clickSound.volume;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Adjust layout based on new window size
    adjustLayout();
});

function adjustLayout() {
    // Adjust any layout elements that might need resizing
    const windowHeight = window.innerHeight;
    const container = document.querySelector('.container-fluid');
    
    if (container) {
        container.style.height = windowHeight + 'px';
    }
}

// Initialize layout
adjustLayout();

// Add touch device detection for better UX
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    document.body.classList.add('touch-device');
}

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Allow escape key to restart journey if on final screen
    if (e.key === 'Escape' && elements.finalResult.style.display !== 'none') {
        restartJourney();
    }
});

// Performance optimization: Debounce resize event
let resizeTimeout;
window.addEventListener('resize', function() {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(adjustLayout, 250);
});