/**
 * Form Handler with Database Integration
 * Handles all three contact forms with RESTful API and email notifications
 */

// Utility function to show notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        font-size: 0.95rem;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Utility function to validate email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Utility function to sanitize input
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');
}

// ====================
// 1. SERVICES INQUIRY FORM HANDLER
// ====================
async function handleServicesInquiry(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    try {
        // Collect form data
        const formData = {
            full_name: sanitizeInput(form.full_name.value),
            email: sanitizeInput(form.email.value),
            company: sanitizeInput(form.company.value),
            phone: sanitizeInput(form.phone?.value || ''),
            service_interest: form.service_interest.value,
            project_stage: form.project_stage.value,
            message: sanitizeInput(form.message.value),
            urgency: form.urgency?.value || 'Exploring options',
            budget_range: form.budget_range?.value || 'Not sure yet',
            status: 'New',
            submitted_at: new Date().toISOString(),
            source: 'Website Contact Form'
        };
        
        // Validate required fields
        if (!formData.full_name || !formData.email || !formData.company) {
            throw new Error('Please fill in all required fields');
        }
        
        if (!validateEmail(formData.email)) {
            throw new Error('Please enter a valid email address');
        }
        
        // Submit to database
        const response = await fetch('tables/services_inquiries', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit form. Please try again.');
        }
        
        const result = await response.json();
        
        // Send email notification (you'll need to configure this)
        await sendEmailNotification('services', formData);
        
        // Show success message
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Optional: Redirect to thank you page
        // window.location.href = 'thank-you.html?type=services';
        
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification(error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// ====================
// 2. FREE RESOURCES FORM HANDLER
// ====================
async function handleResourceDownload(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        const formData = {
            full_name: sanitizeInput(form.full_name.value),
            email: sanitizeInput(form.email.value),
            company: sanitizeInput(form.company.value),
            job_title: sanitizeInput(form.job_title?.value || ''),
            resource_interest: form.resource_interest.value,
            current_challenge: sanitizeInput(form.current_challenge?.value || ''),
            project_focus: form.project_focus?.value || 'Other/Multiple',
            subscribe_newsletter: form.subscribe_newsletter?.checked || false,
            submitted_at: new Date().toISOString(),
            source: 'Website Resources Form',
            resources_sent: false
        };
        
        // Validate
        if (!formData.full_name || !formData.email) {
            throw new Error('Please fill in all required fields');
        }
        
        if (!validateEmail(formData.email)) {
            throw new Error('Please enter a valid email address');
        }
        
        // Submit to database
        const response = await fetch('tables/resource_downloads', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit form. Please try again.');
        }
        
        // Send email with resources
        await sendEmailNotification('resources', formData);
        
        // Show success and trigger download
        showNotification('Success! Check your email for the resources.', 'success');
        
        // Reset form
        form.reset();
        
        // Optional: Trigger actual resource download
        // triggerResourceDownload(formData.resource_interest);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification(error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// ====================
// 3. EXPERT NETWORK FORM HANDLER
// ====================
async function handleExpertApplication(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Application...';
    
    try {
        // Collect expertise areas (checkboxes)
        const expertiseAreas = Array.from(form.querySelectorAll('input[name="expertise_areas"]:checked'))
            .map(cb => cb.value);
        
        // Collect therapeutic areas (checkboxes)
        const therapeuticAreas = Array.from(form.querySelectorAll('input[name="therapeutic_areas"]:checked'))
            .map(cb => cb.value);
        
        const formData = {
            full_name: sanitizeInput(form.full_name.value),
            email: sanitizeInput(form.email.value),
            phone: sanitizeInput(form.phone.value),
            linkedin_profile: sanitizeInput(form.linkedin_profile?.value || ''),
            current_position: sanitizeInput(form.current_position.value),
            years_experience: form.years_experience.value,
            expertise_areas: expertiseAreas,
            aav_experience: sanitizeInput(form.aav_experience?.value || ''),
            regulatory_experience: form.regulatory_experience?.value || 'No regulatory experience',
            therapeutic_areas: therapeuticAreas,
            consulting_availability: form.consulting_availability.value,
            rate_expectation: form.rate_expectation?.value || 'Negotiable',
            motivation: sanitizeInput(form.motivation.value),
            cv_uploaded: false, // Handle file uploads separately if needed
            application_status: 'New',
            submitted_at: new Date().toISOString(),
            source: form.source?.value || 'Website Expert Network Form'
        };
        
        // Validate
        if (!formData.full_name || !formData.email || !formData.current_position || !formData.motivation) {
            throw new Error('Please fill in all required fields');
        }
        
        if (!validateEmail(formData.email)) {
            throw new Error('Please enter a valid email address');
        }
        
        if (expertiseAreas.length === 0) {
            throw new Error('Please select at least one area of expertise');
        }
        
        // Submit to database
        const response = await fetch('tables/expert_applications', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit application. Please try again.');
        }
        
        // Send email notification
        await sendEmailNotification('expert', formData);
        
        // Show success
        showNotification('Application submitted! We\'ll review and contact you soon.', 'success');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification(error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// ====================
// EMAIL NOTIFICATION FUNCTION
// ====================
async function sendEmailNotification(formType, data) {
    // This is a placeholder - you'll need to implement actual email sending
    // Options:
    // 1. Use a serverless function (Netlify Functions, Vercel Functions)
    // 2. Use EmailJS (https://www.emailjs.com/)
    // 3. Use a backend API endpoint
    
    console.log(`Email notification for ${formType}:`, data);
    
    // Example using EmailJS (you'd need to set this up):
    /*
    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            to_email: 'info@genetherapyconsultancy.com',
            form_type: formType,
            from_name: data.full_name,
            from_email: data.email,
            ...data
        });
    } catch (error) {
        console.error('Email notification failed:', error);
    }
    */
}

// ====================
// INITIALIZE FORMS ON PAGE LOAD
// ====================
document.addEventListener('DOMContentLoaded', function() {
    // Services Inquiry Form
    const servicesForm = document.getElementById('services-inquiry-form');
    if (servicesForm) {
        servicesForm.addEventListener('submit', handleServicesInquiry);
    }
    
    // Free Resources Form
    const resourcesForm = document.getElementById('resources-form');
    if (resourcesForm) {
        resourcesForm.addEventListener('submit', handleResourceDownload);
    }
    
    // Expert Network Form
    const expertForm = document.getElementById('expert-network-form');
    if (expertForm) {
        expertForm.addEventListener('submit', handleExpertApplication);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
