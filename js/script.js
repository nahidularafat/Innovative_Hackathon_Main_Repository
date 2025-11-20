// Registration Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    
    // Real-time password strength indicator
    passwordField.addEventListener('input', function() {
        const password = this.value;
        const strengthIndicator = document.getElementById('passwordStrength');
        
        if (!strengthIndicator) {
            // Create strength indicator if it doesn't exist
            const strengthDiv = document.createElement('div');
            strengthDiv.id = 'passwordStrength';
            strengthDiv.className = 'mt-1 text-xs';
            passwordField.parentNode.appendChild(strengthDiv);
        }
        
        updatePasswordStrength(password);
    });
    
    // Real-time password matching check
    confirmPasswordField.addEventListener('input', function() {
        const password = passwordField.value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            this.classList.add('border-red-500');
        } else if (confirmPassword && password === confirmPassword) {
            hideError('confirmPasswordError');
            this.classList.remove('border-red-500');
            this.classList.add('border-green-500');
        } else {
            this.classList.remove('border-red-500', 'border-green-500');
        }
    });
    
    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        resetErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Collect form data
            const formData = collectFormData();
            
            // In a real application, you would send this data to a server
            console.log('Form data:', formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            registrationForm.reset();
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
    
    // Form validation functions
    function validateForm() {
        let isValid = true;
        
        // Validate Full Name
        const fullName = document.getElementById('fullName').value.trim();
        if (!fullName) {
            showError('fullNameError', 'Please enter your full name');
            isValid = false;
        }
        
        // Validate Email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Password
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        // Validate Confirm Password
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        // Validate Terms and Conditions
        const terms = document.getElementById('terms').checked;
        if (!terms) {
            showError('termsError', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        
        // Add error styling to the corresponding input
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.classList.add('border-red-500');
        }
    }
    
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.classList.add('hidden');
        
        // Remove error styling from the corresponding input
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.classList.remove('border-red-500');
        }
    }
    
    function resetErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        // Remove error styling from all inputs
        const inputElements = document.querySelectorAll('.input-field');
        inputElements.forEach(element => {
            element.classList.remove('border-red-500');
        });
    }
    
    function collectFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            householdSize: document.getElementById('householdSize').value,
            dietaryPrefs: Array.from(document.querySelectorAll('input[name="dietaryPrefs"]:checked')).map(cb => cb.value),
            budgetRange: document.getElementById('budgetRange').value,
            location: document.getElementById('location').value.trim()
        };
        
        return formData;
    }
    
    function updatePasswordStrength(password) {
        const strengthIndicator = document.getElementById('passwordStrength');
        let strength = 0;
        let message = '';
        let color = 'red';
        
        if (password.length >= 6) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        
        switch(strength) {
            case 0:
            case 1:
                message = 'Weak';
                color = 'red';
                break;
            case 2:
                message = 'Fair';
                color = 'orange';
                break;
            case 3:
                message = 'Good';
                color = 'blue';
                break;
            case 4:
                message = 'Strong';
                color = 'green';
                break;
        }
        
        strengthIndicator.innerHTML = `Password strength: <span class="text-${color}-500 font-medium">${message}</span>`;
    }
    
    function showSuccessMessage() {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>Registration successful! Redirecting to login...</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
    
    // Add input focus effects
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-green-200', 'rounded-lg');
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-green-200', 'rounded-lg');
        });
    });
});