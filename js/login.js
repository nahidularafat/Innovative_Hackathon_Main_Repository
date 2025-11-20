// Login Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.querySelector('.login-btn');
    const rememberMe = document.getElementById('rememberMe');

    // Check for saved credentials
    checkSavedCredentials();

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Real-time validation
    emailInput.addEventListener('input', function() {
        validateEmail(this.value);
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this.value);
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            showLoadingState();
            
            // Simulate API call
            setTimeout(() => {
                handleLoginSuccess();
            }, 1500);
        }
    });

    // Social login buttons
    document.querySelector('.google-btn').addEventListener('click', function() {
        showLoadingState();
        setTimeout(() => {
            alert('Google login would be implemented here');
            hideLoadingState();
        }, 1000);
    });

    document.querySelector('.facebook-btn').addEventListener('click', function() {
        showLoadingState();
        setTimeout(() => {
            alert('Facebook login would be implemented here');
            hideLoadingState();
        }, 1000);
    });

    // Validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        if (email && !isValid) {
            showError('emailError', 'Please enter a valid email address');
            emailInput.classList.add('error');
            return false;
        } else {
            hideError('emailError');
            emailInput.classList.remove('error');
            return true;
        }
    }

    function validatePassword(password) {
        const isValid = password.length >= 6;
        
        if (password && !isValid) {
            showError('passwordError', 'Password must be at least 6 characters');
            passwordInput.classList.add('error');
            return false;
        } else {
            hideError('passwordError');
            passwordInput.classList.remove('error');
            return true;
        }
    }

    function validateForm() {
        const isEmailValid = validateEmail(emailInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);
        
        if (!emailInput.value) {
            showError('emailError', 'Email address is required');
            emailInput.classList.add('error');
        }
        
        if (!passwordInput.value) {
            showError('passwordError', 'Password is required');
            passwordInput.classList.add('error');
        }
        
        return isEmailValid && isPasswordValid && emailInput.value && passwordInput.value;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.querySelector('span').textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.classList.add('hidden');
    }

    function showLoadingState() {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
    }

    function hideLoadingState() {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }

    function handleLoginSuccess() {
        // Save credentials if "Remember me" is checked
        if (rememberMe.checked) {
            localStorage.setItem('rememberedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Show success animation
        loginForm.classList.add('login-success');
        
        // Redirect to dashboard (simulated)
        setTimeout(() => {
            alert('Login successful! Redirecting to dashboard...');
            // In real application: window.location.href = '/dashboard';
        }, 1000);
    }

    function checkSavedCredentials() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMe.checked = true;
        }
    }

    // Add input focus effects
    const loginInputs = document.querySelectorAll('.login-input');
    loginInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-green-200', 'rounded-xl');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-green-200', 'rounded-xl');
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter to submit form
        if (e.ctrlKey && e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            loginForm.reset();
            hideError('emailError');
            hideError('passwordError');
            emailInput.classList.remove('error');
            passwordInput.classList.remove('error');
        }
    });

    // Auto-focus email field on page load
    emailInput.focus();
});

// Additional utility functions
window.loginUtils = {
    clearForm: function() {
        document.getElementById('loginForm').reset();
        document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.login-input').forEach(el => el.classList.remove('error'));
    },
    
    fillDemoCredentials: function() {
        document.getElementById('email').value = 'demo@barkahneats.com';
        document.getElementById('password').value = 'demo123';
        document.getElementById('rememberMe').checked = true;
    },
    
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};