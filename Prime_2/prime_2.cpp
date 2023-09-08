#include <iostream>
using namespace std;

// Function to check if a number is prime using an optimized algorithm
int isPrime(int num) {
    if (num <= 1)
        return 0; // Numbers less than or equal to 1 are not prime

    if (num <= 3)
        return 1; // 2 and 3 are prime numbers

    if (num % 2 == 0 || num % 3 == 0)
        return 0; // Numbers divisible by 2 or 3 are not prime

    // Check for prime using 6k +/- 1 rule
    for (int i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) {
            return 0; // If divisible by i or i+2, not prime
        }
    }

    return 1; // If no divisors are found, it's prime
}

int main() {
    int n;
    string choice;

    while (true) {
        cout << "\n1: Check Prime or Not\n2: Exit\nEnter your Choice: ";
        cin >> choice;

        if (choice == "1") {
            cout << "\nEnter the Number: ";
            cin >> n;

            int check = isPrime(n);

            if (check == 1)
                cout << "\nThe Number " << n << " is Prime Number\n";
            else
                cout << "\nThe Number " << n << " is Not Prime Number\n";
        } else if (choice == "2") {
            cout << "\nThanks for Using the Program\n";
            break;
        } else {
            cout << "\nWrong Choice! Try Again\n";
        }
    }

    return 0; // Exit the program
}
