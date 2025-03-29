const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const strengthBar = document.getElementById('strengthBar');
const successMessage = document.getElementById('successMessage');
const togglePassword = document.getElementById("togglePassword");

function validateUsername() {
    const regex = /^[a-zA-Z0-9]{3,15}$/;
    if (!regex.test(username.value)) {
        usernameError.textContent = 'Username must be 3-15 characters, letters and numbers only.';
        usernameError.classList.add('show');
        return false;
    }
    usernameError.textContent = '';
    usernameError.classList.remove('show');
    return true;
}

function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
        emailError.textContent = 'Invalid email format.';
        emailError.classList.add('show');
        return false;
    }
    emailError.textContent = '';
    emailError.classList.remove('show');
    return true;
}

function validatePassword() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(.{8,})$/;
    if (!regex.test(password.value)) {
        passwordError.textContent = 'Password must be at least 8 characters, with 1 uppercase, 1 number, and 1 special character.';
        passwordError.classList.add('show');
        return false;
    }
    passwordError.textContent = '';
    passwordError.classList.remove('show');
    return true;
}

function validateConfirmPassword() {
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.classList.add('show');
        return false;
    }
    confirmPasswordError.textContent = '';
    confirmPasswordError.classList.remove('show');
    return true;
}

function updatePasswordStrength() {
    let strength = 0;
    if (password.value.length >= 8) strength++;
    if (password.value.match(/[A-Z]/)) strength++;
    if (password.value.match(/[0-9]/)) strength++;
    if (password.value.match(/[!@#$%^&*]/)) strength++;

    if (strength === 1) {
        strengthBar.style.width = '25%';
        strengthBar.classList.remove('strength-medium', 'strength-strong');
        strengthBar.classList.add('strength-weak');
    } else if (strength === 2) {
        strengthBar.style.width = '50%';
        strengthBar.classList.remove('strength-weak', 'strength-strong');
        strengthBar.classList.add('strength-medium');
    } else if (strength >= 3) {
        strengthBar.style.width = '100%';
        strengthBar.classList.remove('strength-weak', 'strength-medium');
        strengthBar.classList.add('strength-strong');
    } else {
        strengthBar.style.width = '0%';
        strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    }
}

togglePassword.addEventListener("click", function() {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.textContent = type === "password" ? "👁️" : "👁️‍🗨️"
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        localStorage.setItem('username', username.value);
        localStorage.setItem('email', email.value);
        alert('Registration successful!'); // Alert added
        successMessage.textContent = 'Registration successful!';
        successMessage.classList.add('show');

        setTimeout(() => {
            form.reset();
            successMessage.classList.remove('show');
            strengthBar.style.width = '0%';
        }, 3000);

    } else {
        const firstError = document.querySelector('.error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

password.addEventListener('input', updatePasswordStrength);