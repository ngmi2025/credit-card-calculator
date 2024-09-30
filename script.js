document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.getElementById('calculator');
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const results = document.getElementById('results');
    const progress = document.getElementById('progress');
    const calculatePointsBtn = document.getElementById('calculatePointsBtn');
    const continueToSection2Btn = document.getElementById('continueToSection2');
    const backToSection1 = document.getElementById('backToSection1');
    const continueToSection3Btn = document.getElementById('continueToSection3');

    const travelFrequency = document.getElementById('travelFrequency');
    const customTravelFrequency = document.getElementById('customTravelFrequency');
    const homeAirport = document.getElementById('homeAirport');
    const customHomeAirport = document.getElementById('customHomeAirport');

    const flightSpend = document.getElementById('flightSpend');
    const hotelSpend = document.getElementById('hotelSpend');
    const otherSpend = document.getElementById('otherSpend');

    const totalPoints = document.getElementById('totalPoints');
    const welcomeBonus = document.getElementById('welcomeBonus');
    const amexValuation = document.getElementById('amexValuation');

    function showCustomInput(selectElement, customInput) {
        selectElement.addEventListener('change', function() {
            if (this.value === 'custom') {
                customInput.classList.remove('hidden');
            } else {
                customInput.classList.add('hidden');
            }
        });
    }

    showCustomInput(travelFrequency, customTravelFrequency);
    showCustomInput(homeAirport, customHomeAirport);

    function formatCurrency(input) {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/[^\d]/g, '');
            this.value = value ? '$ ' + parseInt(value).toLocaleString() : '';
        });

        // Add this to remove the extra $ when the input loses focus
        input.addEventListener('blur', function(e) {
            if (this.value.startsWith('$ $')) {
                this.value = this.value.replace('$ $', '$ ');
            }
        });
    }

    formatCurrency(flightSpend);
    formatCurrency(hotelSpend);
    formatCurrency(otherSpend);

    calculatePointsBtn.addEventListener('click', function() {
        // Placeholder calculation logic
        let points = 10000 + Math.floor(Math.random() * 5000);
        totalPoints.value = points.toLocaleString() + ' points';
        welcomeBonus.value = '80,000 points';
        amexValuation.value = '$ ' + (2000 + Math.floor(Math.random() * 500));

        results.classList.remove('hidden');
        progress.style.width = '33%';
    });

    continueToSection2Btn.addEventListener('click', function() {
        section1.classList.add('hidden');
        results.classList.add('hidden');
        section2.classList.remove('hidden');
        progress.style.width = '66%';
    });

    backToSection1.addEventListener('click', function(e) {
        e.preventDefault();
        section2.classList.add('hidden');
        section1.classList.remove('hidden');
        results.classList.add('hidden');
        progress.style.width = '33%';
    });

    continueToSection3Btn.addEventListener('click', function() {
        // Placeholder for section 3 logic
        alert('Moving to section 3 (not implemented yet)');
    });
});
