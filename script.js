document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd93b5a65f8fb4830bd4b627a5aa0dee4';
    const apiUrl = `https://api.currencyfreaks.com/latest?apikey=${apiKey}`;

    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const result = document.getElementById('result');
    const convertBtn = document.getElementById('convertBtn');
    const swapBtn = document.getElementById('swapBtn');

    // Fetch currency rates and populate select options
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates).sort(); // Sort currencies alphabetically
            populateSelectOptions(currencies, fromCurrency);
            populateSelectOptions(currencies, toCurrency);
            // Set default values
            fromCurrency.value = 'USD';
            toCurrency.value = 'EGP';
        })
        .catch(error => console.error('Error fetching currency rates:', error));

    // Populate select options with currency codes
    function populateSelectOptions(currencies, selectElement) {
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            selectElement.appendChild(option);
        });
    }

    // Convert currency function
    function convertCurrency() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amountValue = amount.value;

        if (from && to && amountValue) {
            fetch(`${apiUrl}&symbols=${from},${to}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[to] / data.rates[from];
                    const resultValue = (amountValue * rate).toFixed(2);
                    result.value = Number(resultValue).toLocaleString();
                })
                .catch(error => console.error('Error converting currency:', error));
        } else {
            alert('Please fill in all fields');
        }
    }

    // Convert currency on button click
    convertBtn.addEventListener('click', convertCurrency);

    // Swap currencies and update result
    swapBtn.addEventListener('click', () => {
        const fromValue = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = fromValue;
        convertCurrency(); // Update result after swapping
    });
});
