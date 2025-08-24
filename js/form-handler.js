/**
 * Form Handler for Kumar Rajesh Consultancy
 * Handles contact form submission, validation, and FormSubmit integration
 */

class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = null;
        this.originalButtonText = '';
        this.init();
    }

    init() {
        if (!this.form) {
            console.warn('Contact form not found');
            return;
        }

        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton ? this.submitButton.innerHTML : '';
        
        this.setupEventListeners();
        this.setupFormEnhancements();
    }

    setupEventListeners() {
        // Form submission handling
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation for all form fields
        const formFields = this.form.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
            
            // Special handling for email and phone fields
            if (field.type === 'email') {
                field.addEventListener('input', () => this.validateEmailFormat(field));
            }
            if (field.type === 'tel') {
                field.addEventListener('input', () => this.formatPhoneNumber(field));
            }
        });

        // Service selection auto-fill
        const serviceSelect = this.form.querySelector('#service');
        const messageField = this.form.querySelector('#message');
        
        if (serviceSelect && messageField) {
            serviceSelect.addEventListener('change', () => {
                this.autoFillMessage(serviceSelect.value, messageField);
            });
        }

        // Consent checkbox handling
        const consentCheckbox = this.form.querySelector('#consent');
        if (consentCheckbox) {
            consentCheckbox.addEventListener('change', () => {
                this.updateSubmitButtonState();
            });
        }
    }

    setupFormEnhancements() {
        // Add character counter for message field
        const messageField = this.form.querySelector('#message');
        if (messageField) {
            this.addCharacterCounter(messageField);
        }

        // Add loading overlay
        this.createLoadingOverlay();
        
        // Set up form analytics tracking
        this.setupFormTracking();
    }

    handleSubmit(event) {
        // Prevent default submission temporarily for validation
        event.preventDefault();
        
        // Validate entire form
        if (!this.validateForm()) {
            this.showValidationErrors();
            return false;
        }

        // Show loading state
        this.setLoadingState(true);
        
        // Track form submission attempt
        this.trackEvent('form_submit_attempt', {
            service: this.form.querySelector('#service')?.value || 'not_selected',
            has_phone: !!this.form.querySelector('#phone')?.value,
            message_length: this.form.querySelector('#message')?.value?.length || 0
        });

        // Create a temporary form to submit to FormSubmit
        this.submitToFormSubmit();
    }

    submitToFormSubmit() {
        try {
            // Create form data
            const formData = new FormData(this.form);
            
            // Add additional metadata
            formData.append('_subject', 'New Contact Form Submission - Kumar Rajesh Consultancy');
            formData.append('_template', 'table');
            formData.append('_captcha', 'false');
            formData.append('_next', window.location.origin + '/thank-you.html');
            formData.append('_autoresponse', 'Thank you for contacting Kumar Rajesh Consultancy! We will get back to you within 24 hours.');
            
            // Add timestamp and browser info
            formData.append('submission_time', new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
            formData.append('browser_info', this.getBrowserInfo());
            formData.append('page_url', window.location.href);

            // Submit using fetch for better control
            fetch('https://formsubmit.co/connect@kumarrajeshconsultancy.com', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            })
            .then(() => {
                this.handleSubmissionSuccess();
            })
            .catch(error => {
                this.handleSubmissionError(error);
            });

        } catch (error) {
            this.handleSubmissionError(error);
        }
    }

    handleSubmissionSuccess() {
        this.setLoadingState(false);
        
        // Track successful submission
        this.trackEvent('form_submit_success', {
            service: this.form.querySelector('#service')?.value || 'not_selected'
        });

        // Show success message
        this.showSuccessMessage();
        
        // Reset form after short delay
        setTimeout(() => {
            this.resetForm();
        }, 2000);

        // Optional: Redirect to thank you page
        setTimeout(() => {
            window.location.href = '/thank-you.html';
        }, 3000);
    }

    handleSubmissionError(error) {
        console.error('Form submission error:', error);
        this.setLoadingState(false);
        
        // Track failed submission
        this.trackEvent('form_submit_error', {
            error_message: error.message,
            service: this.form.querySelector('#service')?.value || 'not_selected'
        });

        // Show error message with retry option
        this.showErrorMessage(error.message);
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate consent checkbox
        const consentCheckbox = this.form.querySelector('#consent');
        if (consentCheckbox && !consentCheckbox.checked) {
            this.showFieldError(consentCheckbox, 'You must agree to the terms to proceed');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear existing errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        }

        // Specific field validations
        if (value && isValid) {
            switch (fieldType) {
                case 'email':
                    if (!this.isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    if (!this.isValidPhone(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
            }

            // Field-specific validations
            if (fieldName === 'name' && value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }

            if (fieldName === 'message' && value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }

        // Apply validation result
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            this.showFieldError(field, errorMessage);
        }

        this.updateSubmitButtonState();
        return isValid;
    }

    validateEmailFormat(field) {
        const value = field.value.trim();
        if (value && !this.isValidEmail(value)) {
            field.classList.add('is-invalid');
            this.showFieldError(field, 'Please enter a valid email address');
        } else if (value) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            this.clearFieldError(field);
        }
    }

    formatPhoneNumber(field) {
        let value = field.value.replace(/\D/g, '');
        
        // Indian phone number formatting
        if (value.startsWith('91') && value.length > 2) {
            value = '+91 ' + value.substring(2);
        } else if (value.length === 10) {
            value = '+91 ' + value;
        }
        
        field.value = value;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.setAttribute('aria-describedby', field.id + '-error');
        errorDiv.id = field.id + '-error';
    }

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
        field.removeAttribute('aria-describedby');
    }

    autoFillMessage(selectedService, messageField) {
        if (!selectedService || messageField.value.trim()) return;

        const serviceMessages = {
            'DevOps with AWS & Linux': 'I am interested in learning DevOps with AWS and Linux. Please provide more details about the course curriculum, duration, and fees.',
            'Azure Data Engineer & DevOps': 'I would like to know more about your Azure Data Engineer & DevOps training program. Can you share the course details?',
            'Python Developer & Data Science': 'I am interested in the Python Developer & Data Science course. Please share the syllabus and training schedule.',
            'Google Cloud Platform': 'I want to learn Google Cloud Platform. Please provide information about the GCP certification course.',
            'Website & App Design': 'I need professional website and app design services for my business. Please share your portfolio and pricing.',
            'YouTube & Instagram Growth': 'I would like to grow my YouTube and Instagram presence. Please share your social media growth strategies.',
            'Career Counseling': 'I need career guidance and job referral assistance. Please let me know how you can help.',
            'Other Technology': 'I am looking for training in a specific technology not listed. Please contact me to discuss custom training options.',
            'Other Business Services': 'I need custom business consulting services. Please contact me to discuss my specific requirements.'
        };

        if (serviceMessages[selectedService]) {
            messageField.value = serviceMessages[selectedService];
            messageField.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    addCharacterCounter(field) {
        const maxLength = 500;
        field.setAttribute('maxlength', maxLength);
        
        const counter = document.createElement('div');
        counter.className = 'character-counter text-muted small mt-1';
        counter.textContent = `0/${maxLength} characters`;
        
        field.parentNode.appendChild(counter);
        
        field.addEventListener('input', () => {
            const length = field.value.length;
            counter.textContent = `${length}/${maxLength} characters`;
            
            if (length > maxLength * 0.9) {
                counter.classList.add('text-warning');
            } else {
                counter.classList.remove('text-warning');
            }
        });
    }

    updateSubmitButtonState() {
        if (!this.submitButton) return;

        const requiredFields = this.form.querySelectorAll('[required]');
        const consentCheckbox = this.form.querySelector('#consent');
        
        let allValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim() || field.classList.contains('is-invalid')) {
                allValid = false;
            }
        });
        
        if (consentCheckbox && !consentCheckbox.checked) {
            allValid = false;
        }
        
        this.submitButton.disabled = !allValid;
        this.submitButton.classList.toggle('btn-secondary', !allValid);
        this.submitButton.classList.toggle('btn-primary', allValid);
    }

    setLoadingState(isLoading) {
        if (!this.submitButton) return;

        if (isLoading) {
            this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending Message...';
            this.submitButton.disabled = true;
            this.showLoadingOverlay();
        } else {
            this.submitButton.innerHTML = this.originalButtonText;
            this.submitButton.disabled = false;
            this.hideLoadingOverlay();
        }
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'formLoadingOverlay';
        overlay.className = 'form-loading-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            border-radius: var(--border-radius);
        `;
        
        overlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary mb-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="small text-muted">Sending your message...</div>
            </div>
        `;
        
        this.form.style.position = 'relative';
        this.form.appendChild(overlay);
    }

    showLoadingOverlay() {
        const overlay = document.getElementById('formLoadingOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('formLoadingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    showSuccessMessage() {
        const alertHtml = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                <strong>Message Sent Successfully!</strong> 
                Thank you for contacting us. We'll get back to you within 24 hours.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        this.insertAlert(alertHtml);
    }

    showErrorMessage(errorMsg) {
        const alertHtml = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Message Failed to Send.</strong> 
                ${errorMsg || 'Please try again or contact us directly via WhatsApp.'}
                <div class="mt-2">
                    <a href="https://wa.me/918810841429" target="_blank" class="btn btn-sm btn-success me-2">
                        <i class="fab fa-whatsapp me-1"></i>WhatsApp Us
                    </a>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.alert').querySelector('.btn-close').click()">Try Again</button>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        this.insertAlert(alertHtml);
    }

    showValidationErrors() {
        const invalidFields = this.form.querySelectorAll('.is-invalid');
        if (invalidFields.length > 0) {
            invalidFields[0].focus();
            invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        const alertHtml = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Please correct the errors</strong> in the form before submitting.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        this.insertAlert(alertHtml);
    }

    insertAlert(alertHtml) {
        // Remove existing alerts
        const existingAlerts = this.form.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Insert new alert at the top of the form
        this.form.insertAdjacentHTML('afterbegin', alertHtml);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            const alert = this.form.querySelector('.alert');
            if (alert) {
                alert.remove();
            }
        }, 8000);
    }

    resetForm() {
        this.form.reset();
        
        // Clear all validation states
        const formFields = this.form.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
            this.clearFieldError(field);
        });
        
        // Clear character counter
        const messageField = this.form.querySelector('#message');
        if (messageField) {
            const counter = messageField.parentNode.querySelector('.character-counter');
            if (counter) {
                counter.textContent = '0/500 characters';
                counter.classList.remove('text-warning');
            }
        }
        
        this.updateSubmitButtonState();
    }

    setupFormTracking() {
        // Track form interactions for analytics
        const formFields = this.form.querySelectorAll('input, textarea, select');
        
        formFields.forEach(field => {
            let interactionTracked = false;
            
            field.addEventListener('focus', () => {
                if (!interactionTracked) {
                    this.trackEvent('form_field_interaction', {
                        field_name: field.name,
                        field_type: field.type
                    });
                    interactionTracked = true;
                }
            });
        });
        
        // Track service selection
        const serviceSelect = this.form.querySelector('#service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', () => {
                this.trackEvent('service_selected', {
                    service: serviceSelect.value
                });
            });
        }
    }

    // Utility methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone);
    }

    getFieldLabel(fieldName) {
        const labels = {
            'name': 'Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'service': 'Service',
            'message': 'Message'
        };
        return labels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    }

    getBrowserInfo() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    trackEvent(eventName, eventData = {}) {
        // Integration with analytics services
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                custom_parameter: eventData,
                event_category: 'Form',
                event_label: 'Contact Form'
            });
        }
        
        // Log for debugging
        console.log('Form Event:', eventName, eventData);
        
        // Send to custom analytics endpoint if available
        if (window.KRCWebsite && window.KRCWebsite.trackEvent) {
            window.KRCWebsite.trackEvent(eventName, eventData);
        }
    }
}

// Initialize form handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});

// Export for external use
window.FormHandler = FormHandler;
