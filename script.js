function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

function clearHistory() {
    localStorage.removeItem('searchHistory');
    const historyBody = document.getElementById('historyBody');
    const message = document.getElementById('message');
    historyBody.innerHTML = '';
    let isMessageVisible = false;
    if (!isMessageVisible) {
        message.style.animation = 'none';
        void message.offsetWidth;
        message.style.animation = null;
        message.style.display = 'block';
        isMessageVisible = true;

        setTimeout(() => {
            message.style.display = 'none';
            isMessageVisible = false;
        }, 3000);
    }
}

const clearHistoryButton = document.getElementById('clearHistoryButton');
clearHistoryButton.addEventListener('click', clearHistory);



function checkPrime() {
    const numberInput = document.getElementById('numberInput').value;
    const resultElement = document.getElementById('result');
    const historyTable = document.getElementById('historyTable');
    const historyBody = document.getElementById('historyBody');

    if (numberInput === '' || isNaN(numberInput)) {
        resultElement.textContent = 'Please enter a Valid Number';
        return;
    }

    if (BigInt(numberInput) >= 10n ** 308n) {
        resultElement.textContent = 'Maximum Limit Reached';
        return;
    }

    let isPrimeResult = 'Not Prime';
    if (isPrime(Number(numberInput))) {
        isPrimeResult = 'Prime';
    }

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
}

window.addEventListener('load', () => {
    const historyBody = document.getElementById('historyBody');
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const displayedHistory = searchHistory.slice(-100);
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