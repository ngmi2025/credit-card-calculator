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

        document.getElementById('results').classList.remove('hidden');
    }

    function nextSection() {
        const section1 = document.getElementById('section1');
        const results = document.getElementById('results');
        const section2 = document.getElementById('section2');
        const progress = document.getElementById('progress');

        if (!section2.classList.contains('hidden')) {
            // We're on section 2, move to final results (not implemented yet)
            progress.style.width = '100%';
            document.querySelectorAll('.step')[2].classList.add('active');
        } else {
            // We're on the first section or results, move to section 2
            section1.classList.add('hidden');
            results.classList.add('hidden');
            section2.classList.remove('hidden');
            progress.style.width = '66.66%';
            document.querySelectorAll('.step')[1].classList.add('active');
        }
    }

    // Show/hide custom input fields based on dropdown selection
    document.getElementById('homeAirport').addEventListener('change', function() {
        document.getElementById('customHomeAirport').classList.toggle('hidden', this.value !== 'custom');
    });

    document.getElementById('travelFrequency').addEventListener('change', function() {
        document.getElementById('customTravelFrequency').classList.toggle('hidden', this.value !== 'custom');
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
    document.getElementById('calculatePointsBtn').addEventListener('click', calculatePoints);
});
