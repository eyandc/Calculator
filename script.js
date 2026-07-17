function appendValue(value) {
    const display = document.getElementById("display");
    const lastChar = display.value.slice(-1);

    if (value === ".") {
        const parts = display.value.split(/[\+\-\*\/]/);
        const currentNumber = parts[parts.length - 1];

        if (currentNumber.includes(".")) return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
        if (
            display.value === "" ||
            ["+", "-", "*", "/"].includes(lastChar)
        ) {
            return;
        }
    }

    display.value += value;
    display.focus();
}


function clearDisplay() {
    document.getElementById("display").value = "";
}


function backspace() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}


function calculate() {

    const display = document.getElementById("display");
    let expression = display.value;

    try {

        expression = expression.replace(
            /(\d+)%(\d+)/g,
            "($1*$2/100)"
        );

        expression = expression.replace(
            /(\d+)%/g,
            "($1/100)"
        );


        if (!/^[0-9+\-*/(). ]+$/.test(expression)) {
            throw new Error();
        }


        const result = eval(expression);


        display.dataset.result = result;


        document.getElementById("premiumModal")
            .style.display = "flex";


    } catch {

        alert("Invalid input");

    }

}


/* Plan Selection */

function selectPlan(plan, price) {

    document.getElementById("premiumModal")
        .style.display = "none";


    document.getElementById("paymentModal")
        .style.display = "flex";


    document.getElementById("selectedPlan")
        .textContent = `${plan} Plan - ₱${price}`;


    startPaymentTimer();

}



/* Payment Timer */

function startPaymentTimer() {

    const button = document.getElementById("paidButton");

    let time = 25;


    button.disabled = true;

    button.textContent = `Scan QR First (${time})`;


    const timer = setInterval(() => {

        time--;

        button.textContent = `Scan QR First (${time})`;


        if (time <= 0) {

            clearInterval(timer);

            button.disabled = false;

            button.textContent = "I Already Paid";

        }


    }, 1000);

}



/* Fake Payment */

function finishPayment() {

    document.getElementById("paymentModal")
        .style.display = "none";


    document.getElementById("verifyModal")
        .style.display = "flex";


    setTimeout(() => {

        document.getElementById("verifyModal")
            .style.display = "none";


        document.getElementById("prankModal")
            .style.display = "flex";


    }, 3000);

}



/* Continue Calculator */

function closePrank() {

    document.getElementById("prankModal")
        .style.display = "none";


    const display = document.getElementById("display");


    display.value = display.dataset.result;

}



/* Dark Mode */

const toggle = document.getElementById("modeToggle");
const body = document.body;
const modeLabel = document.querySelector(".mode-label");


toggle.addEventListener("change", () => {

    if (toggle.checked) {

        body.classList.replace(
            "light",
            "dark"
        );

        modeLabel.textContent = "Dark Mode";

    } else {

        body.classList.replace(
            "dark",
            "light"
        );

        modeLabel.textContent = "Light Mode";

    }

});



/* Keyboard Support */

document.addEventListener("keydown", event => {

    const key = event.key;


    if (/^[0-9]$/.test(key)) {
        appendValue(key);
    }


    if (["+", "-", "*", "/"].includes(key)) {
        appendValue(key);
    }


    if (key === ".") {
        appendValue(".");
    }


    if (key === "%") {
        appendValue("%");
    }


    if (key === "Enter") {

        event.preventDefault();

        calculate();

    }


    if (key === "Backspace") {
        backspace();
    }


    if (key === "Escape") {
        clearDisplay();
    }

});