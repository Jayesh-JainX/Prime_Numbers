from flask import Flask, request, render_template, jsonify
import random

app = Flask(__name__)

def is_prime_miller_rabin(n, k=5):
    if n <= 1:
        return False
    if n <= 3:
        return True

    def is_witness(a, n):
        r, s = 0, n - 1
        while s % 2 == 0:
            r += 1
            s //= 2

        x = pow(a, s, n)
        if x == 1 or x == n - 1:
            return False

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                return False

        return True

    for _ in range(k):
        a = random.randint(2, n - 2)
        if is_witness(a, n):
            return False
        
    return True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_prime', methods=['POST'])
def check_prime():
    data = request.get_json()
    number_str = data['number']

    try:
        number = int(number_str)
        if number < 0:
            return jsonify({"result": "Negative Numbers cannot be prime"})
    except ValueError:
        return jsonify({"result": "Invalid Number format"})

    if is_prime_miller_rabin(number):
        result = "Probably Prime"
    else:
        result = "Not Prime"

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
