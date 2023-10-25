function clearHistory() {
    localStorage.removeItem('searchHistory');
    const historyBody = document.getElementById('historyBody');
    const message = document.getElementById('message');
    message.style.animation = 'none';
    void message.offsetWidth;
    message.style.animation = null;
    message.style.display = 'block';

    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);

    historyBody.innerHTML = '';
}

const clearHistoryButton = document.getElementById('clearHistoryButton');
clearHistoryButton.addEventListener('click', clearHistory);

function checkPrime() {
    const numberInput = document.getElementById('numberInput').value;
    const resultElement = document.getElementById('result');
    const historyTable = document.getElementById('historyTable');
    const historyBody = document.getElementById('historyBody');

    if (numberInput === '') {
        resultElement.textContent = 'Please Enter a Valid Number';
        return;
    }

    if (BigInt(numberInput) >= 10n ** 1000n) {
        resultElement.textContent = 'Maximum Limit Reached';
        return;
    }
    

    try {
        const numBigInt = BigInt(numberInput);

        if (numBigInt.toString().length > 1000) {
            resultElement.textContent = 'Maximum Limit Reached (1000 digits)';
            return;
        }

        fetch('/check_prime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: numBigInt.toString() }),
        })
            .then(response => response.json())
            .then(data => {
                const isPrimeResult = data.result;
                resultElement.textContent = `${numberInput} is ${isPrimeResult}`;

                const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
                searchHistory.push({ number: numberInput, isPrime: isPrimeResult });

                if (searchHistory.length > 10) {
                    searchHistory.shift();
                }

                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

                historyBody.innerHTML = '';
                searchHistory.forEach((item) => {
                    const row = document.createElement('tr');
                    const numberCell = document.createElement('td');
                    const resultCell = document.createElement('td');

                    numberCell.textContent = item.number;
                    resultCell.textContent = item.isPrime;

                    row.appendChild(numberCell);
                    row.appendChild(resultCell);
                    historyBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } catch (error) {
        resultElement.textContent = 'Please Enter a Valid Number';
    }
}

window.addEventListener('load', () => {
    const historyBody = document.getElementById('historyBody');
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const displayedHistory = searchHistory.slice(-100);
    historyBody.innerHTML = '';
    displayedHistory.forEach((item) => {
        const row = document.createElement('tr');
        const numberCell = document.createElement('td');
        const resultCell = document.createElement('td');

        numberCell.textContent = item.number;
        resultCell.textContent = item.isPrime;

        row.appendChild(numberCell);
        row.appendChild(resultCell);
        historyBody.appendChild(row);
    });
});
