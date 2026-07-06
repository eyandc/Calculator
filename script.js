function appendValue(value) {
    const display = document.getElementById("display");
    const lastChar = display.value.slice(-1);

    // Prevent multiple decimals in the same number
    if (value === ".") {
        const parts = display.value.split(/[\+\-\*\/]/);
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes(".")) return;
    }

    // Prevent consecutive operators
    if (["+", "-", "*", "/"].includes(value)) {
        if (display.value === "" || ["+", "-", "*", "/"].includes(lastChar)) return;
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
        // Convert percentages properly:
        // 1. Replace A%B with (A*B/100)
        expression = expression.replace(/(\d+)%(\d+)/g, "($1*$2/100)");
        // 2. Replace standalone numbers with % as n/100
        expression = expression.replace(/(\d+)%/g, "($1/100)");

        // Prevent dangerous eval execution
        if (!/^[0-9+\-*/(). ]+$/.test(expression)) throw new Error("Invalid characters");

        display.value = eval(expression);
    } catch {
        alert("Invalid input");
    }
}

/* Dark Mode */
const toggle = document.getElementById("modeToggle");
const body = document.body;
const modeLabel = document.querySelector(".mode-label");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        body.classList.replace("light", "dark");
        modeLabel.textContent = "Dark Mode";
    } else {
        body.classList.replace("dark", "light");
        modeLabel.textContent = "Light Mode";
    }
});

/* Keyboard Support */
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Numbers
    if (/^[0-9]$/.test(key)) appendValue(key);

    // Operators
    if (["+", "-", "*", "/"].includes(key)) appendValue(key);

    // Decimal
    if (key === ".") appendValue(".");

    // Percent
    if (key === "%") appendValue("%");

    // Enter = calculate
    if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    if (key === "Backspace") backspace();

    // Escape = clear
    if (key === "Escape") clearDisplay();
});