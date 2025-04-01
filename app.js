alert('Welcome to signup page please fill up the following and submit the form to register yourself');
const form = document.getElementById('registrationForm');
const inputs = ['username', 'email', 'password', 'confirmPassword'].map(id => document.getElementById(id));
const errors = ['usernameError', 'emailError', 'passwordError', 'confirmPasswordError'].map(id => document.getElementById(id));
const [username, email, password, confirmPassword] = inputs;
const [usernameError, emailError, passwordError, confirmPasswordError] = errors;
const strengthBar = document.getElementById('strengthBar');
const successMessage = document.getElementById('successMessage');
const togglePassword = document.getElementById("togglePassword");

const validations = {
  username: { regex: /^[a-zA-Z0-9]{3,15}$/, message: 'Username must be 3-15 characters, letters and numbers only.' },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format.' },
  password: { regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(.{8,})$/, message: 'Password must be at least 8 chars, 1 uppercase, 1 number, and 1 special char.' },
  confirmPassword: { validate: () => password.value === confirmPassword.value, message: 'Passwords do not match.' }
};

function validate(input, error) {
  const validation = validations[input.id];
  const isValid = validation.regex ? validation.regex.test(input.value) : validation.validate();
  error.textContent = isValid ? '' : validation.message;
  error.classList.toggle('show', !isValid);
  return isValid;
}

function updatePasswordStrength() {
  let strength = 0;
  if (password.value.length >= 8) strength++;
  if (password.value.match(/[A-Z]/)) strength++;
  if (password.value.match(/[0-9]/)) strength++;
  if (password.value.match(/[!@#$%^&*]/)) strength++;
  const widths = ['0%', '25%', '50%', '100%'];
  const classes = ['', 'strength-weak', 'strength-medium', 'strength-strong'];
  strengthBar.style.width = widths[strength];
  strengthBar.className = `strength-bar ${classes[Math.min(strength, 3)]}`;
}

togglePassword.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
  togglePassword.textContent = password.type === "password" ? "👁️" : "👁️‍🗨️";
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = inputs.every((input, index) => validate(input, errors[index]));
  if (isValid) {
    localStorage.setItem('username', username.value);
    localStorage.setItem('email', email.value);
    alert('Registration successful!');
    successMessage.textContent = 'Registration successful!';
    successMessage.classList.add('show');
    setTimeout(() => {
      form.reset();
      successMessage.classList.remove('show');
      strengthBar.style.width = '0%';
    }, 3000);
  } else {
    errors.find(e => e.classList.contains('show'))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
alert('succeed in submittting your form');
password.addEventListener('input', updatePasswordStrength);
