function calculatePoints() {
    const flightSpend = parseFloat(document.getElementById('flightSpend').value.replace('$', '').replace(',', '')) || 0;
    const hotelSpend = parseFloat(document.getElementById('hotelSpend').value.replace('$', '').replace(',', '')) || 0;
    const otherSpend = parseFloat(document.getElementById('otherSpend').value.replace('$', '').replace(',', '')) || 0;

    const travelPoints = (flightSpend + hotelSpend) * 5;
    const otherPoints = otherSpend;
    const totalPoints = travelPoints + otherPoints;

    const welcomeBonus = 80000;
    const pointValue = 0.022;
    const totalValuation = (welcomeBonus + totalPoints) * pointValue;

    document.getElementById('totalPoints').value = Math.round(totalPoints).toLocaleString() + ' points';
    document.getElementById('amexValuation').value = '$' + totalValuation.toFixed(2);

    document.getElementById('results').classList.remove('hidden');
}

function nextSection() {
    // Validate inputs
    const inputs = document.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value || (input.type === 'text' && input.value === '$0')) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    // Here you would implement the logic to move to the next section
    // For now, we'll just update the progress bar
    document.getElementById('progress').style.width = '66.66%';
    document.querySelectorAll('.step')[1].classList.add('active');
}

// Show/hide custom input fields based on dropdown selection
document.getElementById('homeAirport').addEventListener('change', function() {
    document.getElementById('customHomeAirport').classList.toggle('hidden', this.value !== 'custom');
});

document.getElementById('travelFrequency').addEventListener('change', function() {
    document.getElementById('customTravelFrequency').classList.toggle('hidden', this.value !== 'custom');
});

// Add error class on invalid input and handle currency formatting
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !this.value.startsWith('$')) {
            this.value = '$' + this.value;
        }
        this.classList.toggle('error', !this.value || this.value === '$0');
    });
});

// Format currency inputs
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^\d]/g, '');
        if (value) {
            value = '$' + parseInt(value).toLocaleString();
            e.target.value = value;
        }
    });
});
