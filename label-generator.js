// Label Generator - StockX Style PDF Generation
class LabelGenerator {
    constructor(orderData) {
        this.orderData = orderData;
        this.generateOrderNumber();
    }

    generateOrderNumber() {
        if (!this.orderData.orderNumber) {
            const year = new Date().getFullYear();
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            this.orderData.orderNumber = `${year}-${random}`;
        }
    }

    generatePDF() {
        // Create a new window for the PDF
        const printWindow = window.open('', '_blank', 'width=800,height=1000');
        
        const pdfContent = this.createPDFContent();
        printWindow.document.write(pdfContent);
        printWindow.document.close();
        
        // Auto-print after a short delay
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }

    createPDFContent() {
        const customerId = this.orderData.customerId;
        const orderNumber = this.orderData.orderNumber;
        const address = this.orderData.address;
        const packageInfo = this.orderData.package;
        const paymentInfo = this.orderData.payment;

        return `
<!DOCTYPE html>
<html>
<head>
    <title>Shipping Label - ${orderNumber}</title>
    <style>
        @page {
            size: 8.5in 11in;
            margin: 0.5in;
        }
        
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: white;
            color: #000;
        }
        
        .page {
            width: 100%;
            min-height: 10in;
            page-break-after: always;
        }
        
        .page:last-child {
            page-break-after: avoid;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding: 20px 0;
            margin-bottom: 30px;
        }
        
        .logo {
            font-size: 2.5rem;
            font-weight: bold;
            color: #10b981;
            margin-bottom: 10px;
        }
        
        .order-info {
            font-size: 1.2rem;
            color: #666;
        }
        
        .instructions {
            background: #f8f9fa;
            border: 2px solid #000;
            padding: 20px;
            margin: 20px 0;
        }
        
        .instructions h2 {
            color: #10b981;
            margin-top: 0;
            font-size: 1.5rem;
        }
        
        .step {
            margin: 15px 0;
            padding: 10px;
            background: white;
            border-left: 4px solid #10b981;
        }
        
        .step-number {
            font-weight: bold;
            color: #10b981;
        }
        
        .label-section {
            border: 3px solid #000;
            padding: 20px;
            margin: 30px 0;
            background: white;
        }
        
        .label-header {
            text-align: center;
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 20px;
            color: #10b981;
        }
        
        .address-section {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
        }
        
        .address-block {
            width: 45%;
            border: 2px solid #000;
            padding: 15px;
        }
        
        .address-label {
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 10px;
            color: #10b981;
        }
        
        .address-content {
            line-height: 1.4;
        }
        
        .package-details {
            background: #f8f9fa;
            padding: 15px;
            margin: 20px 0;
            border: 1px solid #000;
        }
        
        .package-details h3 {
            margin-top: 0;
            color: #10b981;
        }
        
        .shipping-label-placeholder {
            text-align: center;
            margin: 30px 0;
            padding: 40px;
            background: #f9f9f9;
            border: 2px dashed #8b4513;
            border-radius: 10px;
        }
        
        .placeholder-area {
            background: white;
            padding: 30px;
            border-radius: 8px;
            border: 1px solid #ddd;
        }
        
        .barcode {
            font-family: 'Courier New', monospace;
            font-size: 1.2rem;
            letter-spacing: 3px;
            margin: 10px 0;
        }
        
        .customer-info {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #8b4513;
        }
        
        .tracking-info {
            background: #e3f2fd;
            padding: 15px;
            margin: 20px 0;
            border: 1px solid #2196f3;
        }
        
        .id-section {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .order-details p {
            margin: 5px 0;
            font-size: 14px;
        }
        
        .tracking-number {
            font-family: 'Courier New', monospace;
            font-size: 1.1rem;
            font-weight: bold;
            color: #1976d2;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            border-top: 2px solid #000;
            font-size: 0.9rem;
            color: #666;
        }
        
        .warning {
            background: #fff3cd;
            border: 2px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
        }
        
        .warning h4 {
            margin-top: 0;
            color: #856404;
        }
        
        @media print {
            .page {
                page-break-after: always;
            }
            
            .page:last-child {
                page-break-after: avoid;
            }
        }
    </style>
</head>
<body>
    <!-- Page 1: Instructions -->
    <div class="page">
        <div class="header">
            <div class="logo">WAX BUYER</div>
            <div class="order-info">Order #${orderNumber}</div>
        </div>
        
        <div class="customer-info">
            <h2>📋 Order Information</h2>
            <div class="id-section">
                <div class="order-details">
                    <p><strong>Order #:</strong> ${orderNumber}</p>
                    <p><strong>Customer ID:</strong> ${this.orderData.customerId || 'N/A'}</p>
                </div>
            </div>
        </div>
        
        <div class="instructions">
            <h2>📦 Shipping Instructions</h2>
            <p><strong>Please follow these steps carefully to ensure your package arrives safely:</strong></p>
            
            <div class="step">
                <span class="step-number">1.</span> <strong>Package Your Wax Securely</strong><br>
                Place your wax in a sturdy box with proper padding. Use bubble wrap or packing peanuts to prevent movement.
            </div>
            
            <div class="step">
                <span class="step-number">2.</span> <strong>Attach This Label</strong><br>
                Print this entire document and cut out the shipping label on page 2. Attach it to the largest flat surface of your package.
            </div>
            
            <div class="step">
                <span class="step-number">3.</span> <strong>Drop Off Package</strong><br>
                Take your package to any USPS location. The shipping is prepaid - no payment required.
            </div>
            
            <div class="step">
                <span class="step-number">4.</span> <strong>Track Your Shipment</strong><br>
                Use the tracking number below to monitor your package's progress.
            </div>
        </div>
        
        
        
        <div class="warning">
            <h4>⚠️ Important Reminders</h4>
            <ul>
                <li>Ensure the QR code is clearly visible</li>
                <li>Contact us immediately if you have any issues</li>
            </ul>
        </div>
        
    </div>
    
    <!-- Page 2: Shipping Label -->
    <div class="page">
        <div class="label-section">
            <div class="label-header">PREPAID SHIPPING LABEL</div>
            
            <div class="shipping-label-placeholder">
                <h3>📦 Prepaid Shipping Label</h3>
                <div class="placeholder-area">
                    <p><em>PirateShip shipping label will be placed here</em></p>
                    <p><strong>Order #:</strong> ${orderNumber}</p>
                </div>
            </div>
            
            
            
            <div class="warning">
                <h4>📋 Label Instructions</h4>
                <p>1. Cut out or fold the page so that the label is the only part showing.</p>
                <p>2. Attach the label to the outside of the box.</p>
                <p>3. Make sure the label is not covered or damaged</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Wax Buyer Shipping Label</strong></p>
            <p>Generated: ${new Date().toLocaleDateString()} | Order: ${orderNumber}</p>
        </div>
    </div>
</body>
</html>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LabelGenerator;
}
