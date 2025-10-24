/*
    This code will run only after the entire HTML document is loaded.
*/
// Import Lottie Player library for animations
// import 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navigation Logic (Hamburger & Active Link) ---
    
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Hamburger menu click listener
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggle 'is-active' class on both hamburger and menu
            hamburgerBtn.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }

    // Active navigation link highlighter
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    const currentPath = window.location.pathname.split('/').pop(); // Gets the current file name (e.g., "index.html")

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Handle the case for the home page (index.html or empty path)
        if (linkPath === 'index.html' && (currentPath === '' || currentPath === 'index.html')) {
            link.classList.add('active');
        } 
        // Handle all other pages
        else if (linkPath === currentPath && currentPath !== 'index.html') {
            link.classList.add('active');
        }
    });

    // --- 1a. Home Page Lottie Animation ---
    // const lottieContainer = document.getElementById('lottie-animation-container');
    // if (lottieContainer) {
    //     const lottiePlayer = document.createElement('lottie-player');
    //     lottiePlayer.setAttribute('src', 'https://assets5.lottiefiles.com/packages/lf20_tgs7hrdc.json'); // Example animation: Network Security
    //     lottiePlayer.setAttribute('background', 'transparent');
    //     lottiePlayer.setAttribute('speed', '1');
    //     lottiePlayer.setAttribute('loop', ''); // Loop animation
    //     lottiePlayer.setAttribute('autoplay', ''); // Autoplay animation
    //     lottiePlayer.style.width = '100%';
    //     lottiePlayer.style.height = '100%';
    //     lottieContainer.appendChild(lottiePlayer);
    // }
    // --- 2. Simulation Page Logic ---
    // (This code only runs if it finds the simulation elements)

    const checkButton = document.getElementById('check-button');
    const trafficInput = document.getElementById('traffic-input');
    const statusAlert = document.getElementById('status-alert');
    const signatureList = document.getElementById('signature-list'); // Get the list element

    // Define Our "Signature Database"
    const signatures = [
        'virus',
        'attack',
        'hack',
        'malware',
        'rootkit',
        'trojan',
        'sql injection',
        'phishing',
        'spyware'
    ];

    // --- Check if we are on the Simulation page ---
    // This prevents errors on other pages
    if (checkButton && trafficInput && statusAlert && signatureList) {

        // --- 2a. Populate the Signature List ---
        // Dynamically create the list items from our 'signatures' array
        signatures.forEach(sig => {
            const li = document.createElement('li');
            li.textContent = sig;
            signatureList.appendChild(li);
        });
        
        // --- 2b. Add Click Listener for the Button ---
        checkButton.addEventListener('click', checkTraffic);

        // --- 2c. The Main Simulation Function ---
        function checkTraffic() {
            const traffic = trafficInput.value.toLowerCase();
            let isThreatDetected = false;
            let detectedSignature = '';

            // --- The Matching Logic ---
            for (const signature of signatures) {
                if (traffic.includes(signature)) {
                    isThreatDetected = true;
                    detectedSignature = signature;
                    break;
                }
            }

            // --- Update the UI (The Alert Box) ---
            statusAlert.classList.remove('status-success', 'status-danger');

            if (isThreatDetected) {
                // THREAT DETECTED!
                statusAlert.innerHTML = `<p><strong>ALERT!</strong> Intrusion Detected! Signature: '<strong>${detectedSignature}</strong>' found.</p>`;
                statusAlert.classList.add('status-danger');
            } else {
                // NO THREAT DETECTED
                statusAlert.innerHTML = '<p><strong>Status:</strong> All Clear</p>';
                statusAlert.classList.add('status-success');
            }
        }
    }
});