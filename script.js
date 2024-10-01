document.addEventListener('DOMContentLoaded', function() {
    const WELCOME_BONUS = 80000;
    const POINT_VALUE = 0.022;

    function calculatePoints() {
        const flightSpend = parseFloat(document.getElementById('flightSpend').value.replace(/[^\d.-]/g, '')) || 0;
        const hotelSpend = parseFloat(document.getElementById('hotelSpend').value.replace(/[^\d.-]/g, '')) || 0;
        const otherSpend = parseFloat(document.getElementById('otherSpend').value.replace(/[^\d.-]/g, '')) || 0;

        const travelPoints = (flightSpend + hotelSpend) * 5;
        const otherPoints = otherSpend;
        const totalPoints = travelPoints + otherPoints;

        const totalValuation = (WELCOME_BONUS + totalPoints) * POINT_VALUE;

        document.getElementById('totalPoints').value = Math.round(totalPoints).toLocaleString() + ' points';
        document.getElementById('welcomeBonus').value = WELCOME_BONUS.toLocaleString() + ' points';
        document.getElementById('amexValuation').value = '$' + totalValuation.toFixed(2);
    }

    function nextSection(currentSection, nextSection) {
        document.getElementById(currentSection).classList.add('hidden');
        document.getElementById(nextSection).classList.remove('hidden');
        updateProgressBar(nextSection);
    }

    function updateProgressBar(currentSection) {
        const progress = document.getElementById('progress');
        const steps = document.querySelectorAll('.step');
        
        let width = '25%';
        let activeIndex = 0;

        switch(currentSection) {
            case 'section1':
                width = '25%';
                activeIndex = 0;
                break;
            case 'section2':
                width = '50%';
                activeIndex = 1;
                break;
            case 'section3':
                width = '75%';
                activeIndex = 2;
                break;
            case 'results':
                width = '100%';
                activeIndex = 3;
                break;
        }

        progress.style.width = width;
        steps.forEach((step, index) => {
            if (index <= activeIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Show/hide custom input fields based on dropdown selection
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            const customInput = this.nextElementSibling;
            if (customInput && customInput.classList.contains('custom-input')) {
                customInput.classList.toggle('hidden', this.value !== 'custom');
            }
        });
    });

    // Format currency inputs
    function formatCurrency(input) {
        let value = input.value.replace(/[^\d]/g, '');
        if (value) {
            value = parseInt(value).toLocaleString();
            input.value = value;
        } else {
            input.value = '';
        }
    }

    // Add event listeners for currency formatting
    document.querySelectorAll('.input-wrapper input[type="text"]').forEach(input => {
        input.addEventListener('input', function() {
            formatCurrency(this);
        });

        input.addEventListener('blur', function() {
            if (this.value) {
                this.value = parseInt(this.value.replace(/[^\d]/g, '')).toLocaleString();
            } else {
                this.value = '0';
            }
        });
    });

    // Initialize currency inputs
    document.querySelectorAll('.input-wrapper input[type="text"]').forEach(input => {
        input.value = '0';
    });

    // Add event listener for the Calculate Points button
    document.getElementById('calculatePointsBtn').addEventListener('click', function() {
        calculatePoints();
        nextSection('section1', 'section2');
    });

    // Add event listener for the Continue button in section 2
    document.getElementById('continueToSection3Btn').addEventListener('click', function() {
        nextSection('section2', 'section3');
    });

    // Add event listener for the Calculate Valuation button in section 3
    document.getElementById('calculateValuationBtn').addEventListener('click', function() {
        // Placeholder for valuation calculation
        nextSection('section3', 'results');
    });

    // Add event listener for the Continue button in results section
    document.getElementById('continueBtn').addEventListener('click', function() {
        // Placeholder for next action after results
        alert('End of calculator reached');
    });

    // Add event listener for the back link in section 2
    document.getElementById('backToSection1').addEventListener('click', function(e) {
        e.preventDefault();
        nextSection('section2', 'section1');
    });

    // Add event listener for the back link in section 3
    document.getElementById('backToSection2').addEventListener('click', function(e) {
        e.preventDefault();
        nextSection('section3', 'section2');
    });
});
