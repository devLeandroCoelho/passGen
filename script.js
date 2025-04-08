const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

generateBtn.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const password = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
    resultEl.value = password;
    updateStrengthBar(password);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(resultEl.value).then(() => {
        copyBtn.textContent = "Copiado!";
        setTimeout(() => (copyBtn.textContent = "Copiar"), 2000);
    });
});

function generatePassword(length, upper, lower, number, symbol) {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+{}[]=<>/,.";

    let allChars = "";
    if (upper) allChars += upperChars;
    if (lower) allChars += lowerChars;
    if (number) allChars += numberChars;
    if (symbol) allChars += symbolChars;

    let password = "";
    if (allChars.length === 0) return "";

    for (let i = 0; i < length; i++) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        password += char;
    }
    return password;
}

function updateStrengthBar(password) {
    const strengthBar = document.getElementById("strengthBar");
    let strength = 0;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (password.length >= 8) strength++;
    if (hasLower && hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSymbol) strength++;

    strengthBar.classList.remove("weak", "medium", "strong");

    switch (strength) {
        case 0:
        case 1:
            strengthBar.style.width = "25%";
            strengthBar.classList.add("weak");
            break;
        case 2:
            strengthBar.style.width = "50%";
            strengthBar.classList.add("medium");
            break;
        case 3:
            strengthBar.style.width = "75%";
            strengthBar.classList.add("medium");
            break;
        case 4:
            strengthBar.style.width = "100%";
            strengthBar.classList.add("strong");
            break;
    }
}
