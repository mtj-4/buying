// Thank You page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeThankYouPage();
    setupEventListeners();
    loadOrderData();
});

function initializeThankYouPage() {
    // Generate a random order number
    const orderNumber = 'PKM-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumberEl = document.getElementById('orderNumber');
    if (orderNumberEl) {
        orderNumberEl.textContent = orderNumber;
    }
}

function setupEventListeners() {
    // Print label button
    const printLabelBtn = document.getElementById('printLabelBtn');
    if (printLabelBtn) {
        printLabelBtn.addEventListener('click', printShippingLabel);
    }
    
    // Shipping guide button
    const shippingGuideBtn = document.getElementById('shippingGuideBtn');
    const shippingGuideModal = document.getElementById('shippingGuideModal');
    const closeShippingGuide = document.getElementById('closeShippingGuide');
    
    if (shippingGuideBtn) {
        shippingGuideBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openShippingGuide();
        });
    }
    
    if (closeShippingGuide) {
        closeShippingGuide.addEventListener('click', closeShippingGuideModal);
    }
    
    if (shippingGuideModal) {
        shippingGuideModal.addEventListener('click', (e) => {
            if (e.target === shippingGuideModal) {
                closeShippingGuideModal();
            }
        });
    }
    
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectPaymentMethod(option);
        });
    });
    
    // Payment form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmission);
    }
}

function loadOrderData() {
    // Load data from localStorage or session storage
    const collectionData = JSON.parse(localStorage.getItem('collection') || '[]');
    const offerAmount = localStorage.getItem('offerAmount') || '0';
    
    // Update summary
    const summaryTotalCards = document.getElementById('summaryTotalCards');
    const summaryOfferAmount = document.getElementById('summaryOfferAmount');
    
    if (summaryTotalCards) {
        summaryTotalCards.textContent = collectionData.length;
    }
    
    if (summaryOfferAmount) {
        summaryOfferAmount.textContent = `$${offerAmount}`;
    }
}

function printShippingLabel() {
    // Simulate printing functionality
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Shipping Label</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .label { border: 2px solid #000; padding: 20px; margin: 20px 0; }
                .label-header { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
                .label-content { font-size: 14px; line-height: 1.4; }
                .barcode { font-family: monospace; font-size: 12px; letter-spacing: 2px; }
            </style>
        </head>
        <body>
            <div class="label">
                <div class="label-header">PREPAID SHIPPING LABEL</div>
                <div class="label-content">
                    <strong>To:</strong><br>
                    Pokemon Card Buyer<br>
                    123 Business St<br>
                    City, State 12345<br><br>
                    
                    <strong>From:</strong><br>
                    [Your Name]<br>
                    [Your Address]<br><br>
                    
                    <strong>Tracking Number:</strong> 1Z999AA1234567890<br>
                    <strong>Service:</strong> Ground Shipping<br>
                    <strong>Weight:</strong> 2.0 lbs<br><br>
                    
                    <div class="barcode">||| ||| ||| ||| ||| ||| ||| |||</div>
                </div>
            </div>
            <p><em>Please affix this label to your package and drop off at any authorized shipping location.</em></p>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    
    // Show success message
    showNotification('Shipping label printed successfully!', 'success');
}

function openShippingGuide() {
    const modal = document.getElementById('shippingGuideModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeShippingGuideModal() {
    const modal = document.getElementById('shippingGuideModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function selectPaymentMethod(option) {
    // Remove selected class from all options
    const allOptions = document.querySelectorAll('.payment-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    option.classList.add('selected');
    
    // Check the radio button
    const radio = option.querySelector('input[type="radio"]');
    if (radio) {
        radio.checked = true;
    }
    
    // Show payment details form
    const paymentDetails = document.getElementById('paymentDetails');
    if (paymentDetails) {
        paymentDetails.style.display = 'block';
    }
    
    // Show/hide relevant form fields based on payment method
    const method = option.dataset.method;
    const bankDetails = document.getElementById('bankDetails');
    const addressDetails = document.getElementById('addressDetails');
    
    if (bankDetails && addressDetails) {
        bankDetails.style.display = method === 'bank' ? 'block' : 'none';
        addressDetails.style.display = method === 'check' ? 'block' : 'none';
    }
    
    // Update summary
    const summaryPaymentMethod = document.getElementById('summaryPaymentMethod');
    if (summaryPaymentMethod) {
        const methodNames = {
            'paypal': 'PayPal',
            'bank': 'Bank Transfer',
            'check': 'Check'
        };
        summaryPaymentMethod.textContent = methodNames[method] || 'Not Selected';
    }
}

function handlePaymentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!paymentMethod) {
        showNotification('Please select a payment method first.', 'error');
        return;
    }
    
    // Validate form based on payment method
    const method = paymentMethod.value;
    let isValid = true;
    let errorMessage = '';
    
    if (method === 'bank') {
        const accountNumber = formData.get('accountNumber');
        const routingNumber = formData.get('routingNumber');
        
        if (!accountNumber || !routingNumber) {
            isValid = false;
            errorMessage = 'Please fill in all bank account details.';
        }
    } else if (method === 'check') {
        const mailingAddress = formData.get('mailingAddress');
        
        if (!mailingAddress) {
            isValid = false;
            errorMessage = 'Please provide your mailing address.';
        }
    }
    
    if (!isValid) {
        showNotification(errorMessage, 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.submit-payment-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Saving...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Payment method saved successfully!', 'success');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Update summary
        const summaryPaymentMethod = document.getElementById('summaryPaymentMethod');
        if (summaryPaymentMethod) {
            const methodNames = {
                'paypal': 'PayPal',
                'bank': 'Bank Transfer',
                'check': 'Check'
            };
            summaryPaymentMethod.textContent = methodNames[method] || 'Not Selected';
        }
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 3000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
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
            // Swipe left - could be used for navigation
        } else {
            // Swipe right - could be used for navigation
        }
    }
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Auto-save form data
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        const formData = {};
        formInputs.forEach(inp => {
            if (inp.name) {
                formData[inp.name] = inp.value;
            }
        });
        localStorage.setItem('paymentFormData', JSON.stringify(formData));
    });
});

// Load saved form data
const savedFormData = localStorage.getItem('paymentFormData');
if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    Object.keys(formData).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = formData[key];
        }
    });
}
