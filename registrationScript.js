// ==================== SIMPLE REGISTRATION WITH AJAX & LOCAL STORAGE ====================

const STORAGE_KEY = 'registrations';

// ==================== GET FORM DATA ====================

function getFormData() {
    return {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        address: document.getElementById('address').value,
        emailConsent: document.getElementById('emailConsent').checked
    };
}

// ==================== SIMPLE VALIDATION ====================

function validateForm(data) {
    if (!data.fullName) return 'Full name is required';
    if (!data.email) return 'Email is required';
    if (!data.phone) return 'Phone is required';
    if (data.phone.length !== 10) return 'Phone must be 10 digits';
    if (!data.password) return 'Password is required';
    if (data.password.length < 6) return 'Password must be 6+ characters';
    if (data.password !== data.confirmPassword) return 'Passwords do not match';
    if (!data.gender) return 'Please select gender';
    return null;
}

// ==================== LOCAL STORAGE FUNCTIONS ====================

function saveToLocalStorage(data) {
    try {
        let registrations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        data.id = Date.now();
        data.timestamp = new Date().toLocaleString();
        registrations.push(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
        return true;
    } catch (error) {
        console.error('Error saving:', error);
        return false;
    }
}

function getFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        console.error('Error reading:', error);
        return [];
    }
}

function deleteFromLocalStorage(id) {
    try {
        let registrations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        registrations = registrations.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
        return true;
    } catch (error) {
        console.error('Error deleting:', error);
        return false;
    }
}

// ==================== AJAX SIMULATION ====================

function simulateAjaxPost(data) {
    return new Promise((resolve) => {
        // Simulate 1-2 second network delay
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Registration submitted successfully!',
                data: data
            });
        }, Math.random() * 1000 + 1000);
    });
}

// ==================== FORM SUBMISSION ====================

async function submitRegistration(e) {
    e.preventDefault();

    // Get form data
    const formData = getFormData();

    // Validate
    const error = validateForm(formData);
    if (error) {
        alert(error);
        return;
    }

    // Show loading
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Submitting...';

    try {
        // AJAX POST simulation
        console.log('Sending AJAX POST:', formData);
        const response = await simulateAjaxPost(formData);

        // Save to local storage
        if (saveToLocalStorage(formData)) {
            // Show success alert
            const successAlert = document.getElementById('successAlert');
            successAlert.classList.remove('d-none');

            document.getElementById('registrationForm').reset();

            // Redirect to list page after 2 seconds
            setTimeout(() => {
                window.location.href = 'registrationList.html';
            }, 2000);
        } else {
            alert('Error saving data');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Register';
    }
}

// ==================== PAGE INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', submitRegistration);
    }
    console.log('Registration page ready');
});
