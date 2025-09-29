// Sell page specific JavaScript
console.log('Sell script file is loading...');
alert('Sell script file is loading...');

let currentStep = 1;
let collection = [];
let accountData = {};

// Initialize the sell page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sell script loaded and DOM ready');
    alert('Sell script loaded!');
    initializeSellPage();
    setupEventListeners();
});

function initializeSellPage() {
    updateProgressBar();
    updateStepIndicators();
    showStep(1);
}

function setupEventListeners() {
    // Step 1: Scan Collection
    const captureBtn = document.getElementById('captureBtn');
    const allDoneBtn = document.getElementById('allDoneBtn');
    const helpBtn = document.getElementById('helpBtn');
    
    if (captureBtn) {
        captureBtn.addEventListener('click', captureCard);
    }
    
    if (allDoneBtn) {
        console.log('All Done button found, adding event listener');
        allDoneBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('All Done button clicked!');
            alert('Button clicked - this should work!');
            if (collection.length > 0) {
                console.log('Moving to next step');
                nextStep();
            } else {
                // For testing purposes, allow proceeding without cards
                if (confirm('No cards scanned yet. Would you like to continue anyway for testing purposes?')) {
                    console.log('Proceeding without cards for testing');
                    nextStep();
                } else {
                    alert('Please scan at least one card before continuing.');
                }
            }
        });
    } else {
        console.error('All Done button not found!');
        alert('All Done button not found in JavaScript!');
    }
    
    if (helpBtn) {
        helpBtn.addEventListener('click', openHelpModal);
    }
    
    // Step 2: Account Form
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', handleAccountSubmit);
    }
    
    // Step 3: Verify Collection
    const confirmCollectionBtn = document.getElementById('confirmCollectionBtn');
    if (confirmCollectionBtn) {
        confirmCollectionBtn.addEventListener('click', () => {
            nextStep();
            startOfferGeneration();
        });
    }
    
    // Step 4: Offer
    const acceptOfferBtn = document.getElementById('acceptOfferBtn');
    const declineOfferBtn = document.getElementById('declineOfferBtn');
    
    if (acceptOfferBtn) {
        acceptOfferBtn.addEventListener('click', acceptOffer);
    }
    
    if (declineOfferBtn) {
        declineOfferBtn.addEventListener('click', declineOffer);
    }
    
    // Help Modal
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const helpModal = document.getElementById('helpModal');
    
    if (closeHelpBtn) {
        closeHelpBtn.addEventListener('click', closeHelpModal);
    }
    
    if (helpModal) {
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                closeHelpModal();
            }
        });
    }
}

function captureCard() {
    // Simulate card capture
    const cardData = {
        id: Date.now(),
        name: `Pokemon Card ${collection.length + 1}`,
        condition: 'Near Mint',
        estimatedValue: Math.floor(Math.random() * 100) + 10,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRTVFN0VCIi8+Cjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5GAPC90ZXh0Pgo8L3N2Zz4K'
    };
    
    collection.push(cardData);
    updateCollectionDisplay();
    updateCollectionStats();
    
    // Show success feedback
    const captureBtn = document.getElementById('captureBtn');
    const originalBg = captureBtn.style.background;
    captureBtn.style.background = '#10b981';
    setTimeout(() => {
        captureBtn.style.background = originalBg;
    }, 500);
}

function updateCollectionDisplay() {
    const collectionList = document.getElementById('collectionList');
    const verifyCollectionList = document.getElementById('verifyCollectionList');
    const offerCollectionList = document.getElementById('offerCollectionList');
    
    if (collection.length === 0) {
        if (collectionList) {
            collectionList.innerHTML = `
                <div class="empty-collection">
                    <p>No cards scanned yet</p>
                    <small>Start scanning to build your collection</small>
                </div>
            `;
        }
        return;
    }
    
    const collectionHTML = collection.map(card => `
        <div class="collection-item">
            <img src="${card.image}" alt="${card.name}">
            <div class="collection-item-info">
                <div class="collection-item-name">${card.name}</div>
                <div class="collection-item-condition">${card.condition}</div>
            </div>
        </div>
    `).join('');
    
    if (collectionList) {
        collectionList.innerHTML = collectionHTML;
    }
    
    if (verifyCollectionList) {
        verifyCollectionList.innerHTML = collectionHTML;
    }
    
    if (offerCollectionList) {
        offerCollectionList.innerHTML = collectionHTML;
    }
}

function updateCollectionStats() {
    const totalCards = collection.length;
    const estimatedValue = collection.reduce((sum, card) => sum + card.estimatedValue, 0);
    
    // Update Step 1 stats
    const totalCardsEl = document.getElementById('totalCards');
    const estimatedValueEl = document.getElementById('estimatedValue');
    
    if (totalCardsEl) totalCardsEl.textContent = totalCards;
    if (estimatedValueEl) estimatedValueEl.textContent = `$${estimatedValue}`;
    
    // Update Step 3 stats
    const verifyTotalCardsEl = document.getElementById('verifyTotalCards');
    const verifyEstimatedValueEl = document.getElementById('verifyEstimatedValue');
    
    if (verifyTotalCardsEl) verifyTotalCardsEl.textContent = totalCards;
    if (verifyEstimatedValueEl) verifyEstimatedValueEl.textContent = `$${estimatedValue}`;
}

function handleAccountSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const zip = formData.get('zip');
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    // Store account data
    accountData = {
        username,
        password,
        address: {
            street: address,
            city,
            state,
            zip
        }
    };
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Account created successfully!');
        nextStep();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function startOfferGeneration() {
    const loadingSection = document.getElementById('loadingSection');
    const offerSection = document.getElementById('offerSection');
    
    if (loadingSection && offerSection) {
        loadingSection.style.display = 'block';
        offerSection.style.display = 'none';
        
        // Simulate loading process
        const loadingTexts = loadingSection.querySelectorAll('.loading-text');
        const loadingProgress = document.getElementById('loadingProgress');
        
        let currentTextIndex = 0;
        let progress = 0;
        
        const loadingInterval = setInterval(() => {
            // Update loading text
            loadingTexts.forEach((text, index) => {
                text.classList.toggle('active', index === currentTextIndex);
            });
            
            currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
            progress += 10;
            loadingProgress.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingSection.style.display = 'none';
                    offerSection.style.display = 'block';
                    showOffer();
                }, 1000);
            }
        }, 800);
    }
}

function showOffer() {
    const totalValue = collection.reduce((sum, card) => sum + card.estimatedValue, 0);
    const offerAmount = Math.floor(totalValue * 0.85); // 85% of estimated value
    
    const offerValueEl = document.getElementById('offerValue');
    if (offerValueEl) {
        offerValueEl.textContent = `$${offerAmount}`;
    }
}

function acceptOffer() {
    // Redirect to thank you page
    window.location.href = '/thank-you.html';
}

function declineOffer() {
    if (confirm('Are you sure you want to decline this offer? You can always come back later.')) {
        window.location.href = '/';
    }
}

function openHelpModal() {
    const helpModal = document.getElementById('helpModal');
    if (helpModal) {
        helpModal.classList.add('active');
    }
}

function closeHelpModal() {
    const helpModal = document.getElementById('helpModal');
    if (helpModal) {
        helpModal.classList.remove('active');
    }
}

function nextStep() {
    if (currentStep < 4) {
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
        updateStepIndicators();
        
        // Update collection display for steps 3 and 4
        if (currentStep === 3 || currentStep === 4) {
            updateCollectionDisplay();
            updateCollectionStats();
        }
    }
}

function showStep(stepNumber) {
    // Hide all steps
    const allSteps = document.querySelectorAll('.step-content');
    allSteps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    const currentStepEl = document.getElementById(`step${stepNumber}`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progress = (currentStep / 4) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function updateStepIndicators() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
}

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could be used for navigation in future
        } else {
            // Swipe right - could be used for navigation in future
        }
    }
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
