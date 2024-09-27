function nextSection() {
    // Here you would implement the logic to move to the next section
    // For now, we'll just update the progress bar
    document.getElementById('progress').style.width = '50%';
}

// Show/hide custom input fields based on dropdown selection
document.getElementById('travelFrequency').addEventListener('change', function() {
    document.getElementById('customTravelFrequency').classList.toggle('hidden', this.value !== 'custom');
});

document.getElementById('homeAirport').addEventListener('change', function() {
    document.getElementById('customHomeAirport').classList.toggle('hidden', this.value !== 'custom');
});
