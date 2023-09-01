document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const dobInput = document.getElementById('dob');
    const submitButton = document.getElementById('submit-button');
    const submissionMessage = document.getElementById('submission-message');

    
    function validateFullName() {
        const fullName = fullNameInput.value.trim();
        const fullNameStatus = document.getElementById('full-name-status');

        if (fullName.length < 3 || !/^[a-zA-Z\s]+$/.test(fullName)) {
            fullNameStatus.textContent = 'Invalid full name';
            fullNameStatus.classList.remove('valid');
        } else {
            fullNameStatus.textContent = '';
            fullNameStatus.classList.add('valid');
        }
    }

    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailStatus = document.getElementById('email-status');

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            emailStatus.textContent = 'Invalid email address';
            emailStatus.classList.remove('valid');
        } else {
            emailStatus.textContent = '';
            emailStatus.classList.add('valid');
        }
    }

   
    function validatePassword() {
        const password = passwordInput.value;
        const passwordStatus = document.getElementById('password-status');

        if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
            passwordStatus.textContent = 'Invalid password';
            passwordStatus.classList.remove('valid');
        } else {
            passwordStatus.textContent = '';
            passwordStatus.classList.add('valid');
        }
    }

    function confirmPasswordsMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const confirmPasswordStatus = document.getElementById('confirm-password-status');

        if (password !== confirmPassword) {
            confirmPasswordStatus.textContent = 'Passwords do not match';
            confirmPasswordStatus.classList.remove('valid');
        } else {
            confirmPasswordStatus.textContent = '';
            confirmPasswordStatus.classList.add('valid');
        }
    }

    
    function calculateAge() {
        const dob = dobInput.value;
        const dobStatus = document.getElementById('dob-status');
        const currentDate = new Date();
        const inputDate = new Date(dob);

        if (isNaN(inputDate.getTime()) || inputDate >= currentDate) {
            dobStatus.textContent = 'Invalid date of birth';
            dobStatus.classList.remove('valid');
            submitButton.disabled = true;
        } else {
            const age = currentDate.getFullYear() - inputDate.getFullYear();
            if (age < 18) {
                dobStatus.textContent = 'You must be at least 18 years old';
                dobStatus.classList.remove('valid');
                submitButton.disabled = true;
            } else {
                dobStatus.textContent = '';
                dobStatus.classList.add('valid');
                submitButton.disabled = false;
            }
        }
    }

    
    fullNameInput.addEventListener('input', validateFullName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', confirmPasswordsMatch);
    dobInput.addEventListener('input', calculateAge);

    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 
        validateFullName();
        validateEmail();
        validatePassword();
        confirmPasswordsMatch();
        calculateAge();

        
        const allFieldsValid = document.querySelectorAll('.validation-status.valid').length === 5;

        if (allFieldsValid) {
            
            submissionMessage.textContent = 'Form submitted successfully!!';
            submissionMessage.classList.add('success');
            form.reset(); 
        } 
    });
});
