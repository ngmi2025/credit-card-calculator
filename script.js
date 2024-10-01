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

    function calculateSection2Value() {
        const credits = [
            { id: 'airlineCredit', value: 200 },
            { id: 'uberCredit', value: 200 },
            { id: 'saksCredit', value: 100 },
            { id: 'equinoxCredit', value: 300 },
            { id: 'entertainmentCredit', value: 240 },
            { id: 'clearCredit', value: 189 },
            { id: 'globalEntryCredit', value: 100 },
            { id: 'soulCycleCredit', value: 300 }
        ];

        return credits.reduce((total, credit) => {
            const usage = document.getElementById(credit.id).value;
            switch (usage) {
                case '0': return total;
                case '0.5': return total + credit.value * 0.5;
                case '1': return total + credit.value;
                default: return total;
            }
        }, 0);
    }

    function calculateSection3Value() {
        const travelFrequency = parseInt(document.getElementById('travelFrequency').value) || 0;
        const perks = ['loungeAccess', 'partnerStatus', 'fhrAndIap', 'cardProtections'];
        
        return perks.reduce((total, perkId) => {
            const usage = document.getElementById(perkId).value;
            switch (usage) {
                case '0': return total;
                case '0.5': return total + travelFrequency * 40 * 0.5;
                case '1': return total + travelFrequency * 40;
                default: return total;
            }
        }, 0);
    }

    function calculateFinalValuation() {
        const totalPoints = parseInt(document.getElementById('totalPoints').value.replace(/[^\d.-]/g, '')) || 0;
        const pointsValue = totalPoints * POINT_VALUE;
        const section2Value = calculateSection2Value();
        const section3Value = calculateSection3Value();

        const yearlyValue = pointsValue + section2Value + section3Value;
        const signupBonusValue = WELCOME_BONUS * POINT_VALUE;
        const firstYearValue = yearlyValue + signupBonusValue;
        const secondYearValue = yearlyValue;

        document.getElementById('yearlyValue').value = '$' + yearlyValue.toFixed(2);
        document.getElementById('signupBonusValue').value = '$' + signupBonusValue.toFixed(2);
        document.getElementById('firstYearValue').value = '$' + firstYearValue.toFixed(2);
        document.getElementById('secondYearValue').value = '$' + secondYearValue.toFixed(2);

        document.getElementById('section3').classList.add('hidden');
        document.getElementById('section4').classList.remove('hidden');
        updateProgressBar('section4');
    }

    function updateProgressBar(currentSection) {
        const progress = document.getElementById('progress');
        const steps = document.querySelectorAll('.step');
        
        steps.forEach(step => step.classList.remove('active'));
        
        switch(currentSection) {
            case 'section1':
                progress.style.width = '25%';
                steps[0].classList.add('active');
                break;
            case 'section2':
                progress.style.width = '50%';
                steps[1].classList.add('active');
                break;
            case 'section3':
                progress.style.width = '75%';
                steps[2].classList.add('active');
                break;
            case 'section4':
                progress.style.width = '100%';
                steps[3].classList.add('active');
                break;
        }
    }

    function nextSection(currentSection, nextSection) {
        document.getElementById(currentSection).classList.add('hidden');
        document.getElementById(nextSection).classList.remove('hidden');
        updateProgressBar(nextSection);
    }

    document.getElementById('calculatePointsBtn').addEventListener('click', function() {
        calculatePoints();
        nextSection('section1', 'results');
    });

    document.getElementById('continueBtn').addEventListener('click', function() {
        nextSection('results', 'section2');
    });

    document.getElementById('continueToSection3Btn').addEventListener('click', function() {
        nextSection('section2', 'section3');
    });

    document.getElementById('calculateValuationBtn').addEventListener('click', function() {
        calculateFinalValuation();
    });

    document.getElementById('backToSection1').addEventListener('click', function(e) {
        e.preventDefault();
        nextSection('section2', 'section1');
    });

    document.getElementById('backToSection2').addEventListener('click', function(e) {
        e.preventDefault();
        nextSection('section3', 'section2');
    });

    // Handle custom input for home airport
    document.getElementById('homeAirport').addEventListener('change', function() {
        const customInput = document.getElementById('customHomeAirport');
        if (this.value === 'custom') {
            customInput.classList.remove('hidden');
        } else {
            customInput.classList.add('hidden');
        }
    });

    // Format currency inputs
    const currencyInputs = document.querySelectorAll('.input-wrapper input[type="text"]:not(#travelFrequency)');
    currencyInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^\d]/g, '');
            if (value) {
                value = parseInt(value, 10);
                e.target.value = value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
            }
        });
    });

    // Ensure travel frequency input only accepts numbers
    const travelFrequencyInput = document.getElementById('travelFrequency');
    travelFrequencyInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d]/g, '');
    });
});
