// Load QRCode library dynamically to keep HTML clean
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
document.head.appendChild(script);

script.onload = () => {
    const qrText = document.getElementById('qr-text');
    const sizes = document.getElementById('sizes');
    const qrBody = document.querySelector('.qr-body');
    const buttons = document.querySelectorAll('.qr-footer a');
    
    const generateBtn = Array.from(buttons).find(btn => btn.innerText === 'GENERATE');
    const downloadBtn = Array.from(buttons).find(btn => btn.innerText === 'DOWNLOAD');

    // Initial state
    qrBody.innerHTML = "<p style='color: #666; font-size: 14px;'>Your QR code will appear here</p>";

    let size = sizes.value;

    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleGeneration();
    });

    qrText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGeneration();
        }
    });

    sizes.addEventListener('change', (e) => {
        size = e.target.value;
        if (qrText.value.trim().length > 0) {
            handleGeneration();
        }
    });

    downloadBtn.addEventListener('click', (e) => {
        const img = qrBody.querySelector('img');
        const canvas = qrBody.querySelector('canvas');

        if (img) {
            downloadBtn.href = img.src;
            downloadBtn.download = 'qrcode.png';
        } else if (canvas) {
            downloadBtn.href = canvas.toDataURL();
            downloadBtn.download = 'qrcode.png';
        } else {
            e.preventDefault();
            alert("Please generate a QR code first");
        }
    });

    function handleGeneration() {
        if (qrText.value.trim().length > 0) {
            generateQRCode();
        } else {
            alert("Enter the text or URL to generate your QR code");
        }
    }

    function generateQRCode() {
        qrBody.innerHTML = "";
        new QRCode(qrBody, {
            text: qrText.value,
            height: size,
            width: size,
            colorLight: "#ffffff",
            colorDark: "#000000",
        });
    }
};
