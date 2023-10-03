function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

function checkPrime() {
    const numberInput = document.getElementById('numberInput').value;
    const resultElement = document.getElementById('result');
    const historyTable = document.getElementById('historyTable');
    const historyBody = document.getElementById('historyBody');

    let isPrimeResult = 'Not Prime';
    if (isPrime(numberInput)) {
        isPrimeResult = 'Prime';
    }

    resultElement.textContent = `${numberInput} is ${isPrimeResult}`;

    
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.push({ number: numberInput, isPrime: isPrimeResult });
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
});