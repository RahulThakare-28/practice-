// ==================== AJAX Registration Script ====================
// Handles form submission, validation, AJAX simulation, and local storage

// ==================== CONSTANTS ====================
const STORAGE_KEY = 'registrations';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
const NAME_REGEX = /^[a-zA-Z\s]{3,}$/;

// ==================== FORM VALIDATION ====================

/**
 * Validate full name field
 */
function validateFullName(fullName) {
    if (!fullName || fullName.trim() === '') {
        return 'Full name is required';
    }
    if (fullName.trim().length < 3) {
        return 'Full name must be at least 3 characters';
    }
    if (!NAME_REGEX.test(fullName)) {
        return 'Full name can only contain letters and spaces';
    }
    return '';
}

/**
 * Validate email field and check for duplicates
 */
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return 'Email is required';
    }
    if (!EMAIL_REGEX.test(email)) {
        return 'Please enter a valid email address';
    }
    // Check for duplicate email
    const registrations = getFromLocalStorage();
    if (registrations.some(reg => reg.email.toLowerCase() === email.toLowerCase())) {
        return 'This email is already registered';
    }
    return '';
}

/**
 * Validate phone field
 */
function validatePhone(phone) {
    if (!phone || phone.trim() === '') {
        return 'Phone number is required';
    }
    if (!PHONE_REGEX.test(phone)) {
        return 'Phone must be exactly 10 digits';
    }
    return '';
}

/**
 * Validate password field
 */
function validatePassword(password) {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    if (!PASSWORD_REGEX.test(password)) {
        return 'Password must contain uppercase, lowercase letters and numbers';
    }
    return '';
}

/**
 * Validate confirm password matches password
 */
function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) {
        return 'Confirm password is required';
    }
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return '';
}

/**
 * Validate gender selection
 */
function validateGender() {
    return document.querySelector('input[name="gender"]:checked') ? '' : 'Please select a gender';
}

/**
 * Validate terms acceptance
 */
function validateTerms() {
    return document.getElementById('terms').checked ? '' : 'You must agree to terms and conditions';
}

/**
 * Main form validation function
 */
function validateForm(formData) {
    const errors = {};

    // Validate each field
    const fullNameError = validateFullName(formData.fullName);
    if (fullNameError) errors.fullName = fullNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    const genderError = validateGender();
    if (genderError) errors.gender = genderError;

    const termsError = validateTerms();
    if (termsError) errors.terms = termsError;

    return errors;
}

/**
 * Display validation errors on form
 */
function displayValidationErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
    document.getElementById('errorAlert').classList.add('d-none');

    if (Object.keys(errors).length === 0) {
        return true;
    }

    let errorMessage = 'Please fix the following errors:\n';
    for (const [field, message] of Object.entries(errors)) {
        if (field === 'terms' || field === 'gender') continue; // Handle separately

        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        errorMessage += `- ${message}\n`;
    }

    if (errors.gender) {
        const genderError = document.getElementById('genderError');
        if (genderError) genderError.textContent = errors.gender;
    }

    if (errors.terms) {
        const termsError = document.getElementById('termsError');
        if (termsError) termsError.textContent = errors.terms;
    }

    return false;
}

// ==================== LOCAL STORAGE FUNCTIONS ====================

/**
 * Generate unique ID for registration
 */
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Get all registrations from local storage
 */
function getFromLocalStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading from local storage:', error);
        return [];
    }
}

/**
 * Save registration to local storage
 */
function saveToLocalStorage(registration) {
    try {
        const registrations = getFromLocalStorage();
        registration.id = generateId();
        registration.timestamp = new Date().toISOString();
        registrations.push(registration);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
        return true;
    } catch (error) {
        console.error('Error saving to local storage:', error);
        return false;
    }
}

/**
 * Delete registration from local storage
 */
function deleteFromLocalStorage(id) {
    try {
        let registrations = getFromLocalStorage();
        registrations = registrations.filter(reg => reg.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
        return true;
    } catch (error) {
        console.error('Error deleting from local storage:', error);
        return false;
    }
}

// ==================== FORM DATA HANDLING ====================

/**
 * Fetch form data from inputs
 */
function fetchFormData() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    return {
        fullName: formData.get('fullName').trim(),
        email: formData.get('email').trim().toLowerCase(),
        phone: formData.get('phone').trim(),
        password: formData.get('password'),
        gender: formData.get('gender'),
        address: formData.get('address').trim(),
        emailConsent: form.querySelector('#emailConsent').checked
    };
}

/**
 * Clear form fields
 */
function clearForm() {
    document.getElementById('registrationForm').reset();
    document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
}

// ==================== AJAX SIMULATION ====================

/**
 * Simulate AJAX POST request
 * Educational demonstration of AJAX POST pattern
 */
function simulateAjaxPost(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay (500-1500ms)
        const delay = Math.random() * 1000 + 500;

        setTimeout(() => {
            // Simulate server-side validation and processing
            // In real scenario, this would be an actual HTTP POST request

            // Success response (90% chance)
            if (Math.random() > 0.1) {
                resolve({
                    success: true,
                    message: 'Registration successful! Your data has been saved.',
                    data: data,
                    statusCode: 200
                });
            } else {
                // Simulate occasional errors (10% chance)
                reject({
                    success: false,
                    message: 'Server error: Please try again later',
                    statusCode: 500
                });
            }
        }, delay);
    });
}

// ==================== NOTIFICATION FUNCTIONS ====================

/**
 * Show success notification
 */
function showSuccessNotification(message) {
    const successAlert = document.getElementById('successAlert');
    const successMessage = document.getElementById('successMessage');
    const errorAlert = document.getElementById('errorAlert');

    errorAlert.classList.add('d-none');
    successMessage.textContent = message;
    successAlert.classList.remove('d-none');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        successAlert.classList.add('d-none');
    }, 5000);
}

/**
 * Show error notification
 */
function showErrorNotification(message) {
    const errorAlert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    const successAlert = document.getElementById('successAlert');

    successAlert.classList.add('d-none');
    errorMessage.textContent = message;
    errorAlert.classList.remove('d-none');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorAlert.classList.add('d-none');
    }, 5000);
}

// ==================== MAIN SUBMISSION HANDLER ====================

/**
 * Handle form submission with AJAX
 */
async function submitRegistration(e) {
    e.preventDefault();

    // Clear previous alerts
    document.getElementById('successAlert').classList.add('d-none');
    document.getElementById('errorAlert').classList.add('d-none');

    // Fetch form data
    const formData = fetchFormData();

    // Validate form
    const errors = validateForm(formData);
    if (!displayValidationErrors(errors)) {
        return;
    }

    // Show loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitBtn = document.getElementById('submitBtn');
    loadingSpinner.classList.remove('d-none');
    submitBtn.disabled = true;

    try {
        // Simulate AJAX POST request
        console.log('Sending AJAX POST with data:', formData);
        const response = await simulateAjaxPost(formData);

        // Save to local storage
        if (saveToLocalStorage(formData)) {
            showSuccessNotification(response.message);
            clearForm();

            // Update record count
            updateRecordCount();

            // Optional: Redirect to list page after 2 seconds
            setTimeout(() => {
                // Uncomment to auto-redirect:
                // window.location.href = 'registrationList.html';
            }, 2000);
        } else {
            showErrorNotification('Failed to save registration. Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        showErrorNotification(error.message || 'An error occurred during registration');
    } finally {
        // Hide loading spinner
        loadingSpinner.classList.add('d-none');
        submitBtn.disabled = false;
    }
}

// ==================== UTILITIES ====================

/**
 * Update record count display
 */
function updateRecordCount() {
    const registrations = getFromLocalStorage();
    console.log(`Total registrations: ${registrations.length}`);
}

/**
 * Initialize form with event listeners
 */
function initializeForm() {
    // Add real-time validation
    document.getElementById('fullName').addEventListener('blur', function() {
        const error = validateFullName(this.value);
        document.getElementById('fullNameError').textContent = error;
    });

    document.getElementById('email').addEventListener('blur', function() {
        const error = validateEmail(this.value);
        document.getElementById('emailError').textContent = error;
    });

    document.getElementById('phone').addEventListener('blur', function() {
        const error = validatePhone(this.value);
        document.getElementById('phoneError').textContent = error;
    });

    document.getElementById('password').addEventListener('blur', function() {
        const error = validatePassword(this.value);
        document.getElementById('passwordError').textContent = error;
    });

    document.getElementById('confirmPassword').addEventListener('blur', function() {
        const password = document.getElementById('password').value;
        const error = validateConfirmPassword(password, this.value);
        document.getElementById('confirmPasswordError').textContent = error;
    });

    console.log('Registration form initialized');
}

// ==================== PAGE INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Registration page loaded');
    initializeForm();
    updateRecordCount();

    // Log existing registrations for debugging
    const registrations = getFromLocalStorage();
    console.log('Existing registrations:', registrations);
});
