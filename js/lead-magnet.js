// Lead Magnet Download System
// Gene Therapy Consultancy

// Lead magnet resources
const leadMagnets = {
    'ai-transformation-guide': {
        title: "AI Transformation Guide for Gene Therapy",
        description: "Download our exclusive guide to accelerate your gene therapy program with AI-driven intelligence",
        benefits: [
            "Strategic framework for AI integration in gene therapy development",
            "Key decision points for accelerating your path to the clinic",
            "Expert insights from Dr. Rahul Kaushik's 10+ years in gene therapy",
            "Actionable checklist for evaluating AI transformation opportunities"
        ],
        fileUrl: "#", // Replace with actual file URL
        fileName: "GTC-AI-Transformation-Guide.pdf"
    },
    'operational-efficiency': {
        title: "Operational Efficiency Blueprint",
        description: "Eliminate operational leaks and extend your runway with proven frameworks",
        benefits: [
            "Comprehensive audit checklist for identifying operational inefficiencies",
            "40% cost reduction framework used by successful gene therapy companies",
            "AI-powered process optimization templates",
            "ROI calculator for operational improvements"
        ],
        fileUrl: "#",
        fileName: "GTC-Operational-Efficiency-Blueprint.pdf"
    },
    'vector-selection-framework': {
        title: "AAV Vector Selection Framework",
        description: "Make confident vector decisions with our comprehensive decision-support framework",
        benefits: [
            "AI-powered decision tree for AAV vector selection",
            "Comparative analysis templates for multiple vector platforms",
            "Risk assessment framework for vector design choices",
            "Case studies from successful AAV programs"
        ],
        fileUrl: "#",
        fileName: "GTC-Vector-Selection-Framework.pdf"
    },
    'funding-readiness-checklist': {
        title: "Investor Readiness Checklist",
        description: "Prepare your gene therapy program for successful fundraising",
        benefits: [
            "Comprehensive checklist covering technical, regulatory, and operational readiness",
            "Investor perspective insights from 50+ due diligence processes",
            "Common red flags and how to address them proactively",
            "Data room organization templates"
        ],
        fileUrl: "#",
        fileName: "GTC-Funding-Readiness-Checklist.pdf"
    }
};

// Initialize lead magnet system
function initLeadMagnetSystem() {
    // Setup resource selector
    const resourceSelector = document.getElementById('resource-type');
    if (resourceSelector) {
        resourceSelector.addEventListener('change', (e) => {
            updateResourceDisplay(e.target.value);
        });
        
        // Initialize with first resource
        if (resourceSelector.value) {
            updateResourceDisplay(resourceSelector.value);
        }
    }

    // Setup form submission
    const leadMagnetForm = document.getElementById('lead-magnet-form');
    if (leadMagnetForm) {
        leadMagnetForm.addEventListener('submit', handleLeadMagnetSubmit);
    }
}

// Update resource display
function updateResourceDisplay(resourceId) {
    const resource = leadMagnets[resourceId];
    if (!resource) return;

    // Update title and description
    document.getElementById('resource-title').textContent = resource.title;
    document.getElementById('resource-description').textContent = resource.description;

    // Update benefits list
    const benefitsList = document.getElementById('resource-benefits');
    benefitsList.innerHTML = resource.benefits.map(benefit => `
        <li><i class="fas fa-check-circle" style="color: var(--primary-blue); margin-right: 0.5rem;"></i>${benefit}</li>
    `).join('');

    // Show resource details
    document.getElementById('resource-details').style.display = 'block';
}

// Handle form submission
async function handleLeadMagnetSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        resourceType: formData.get('resource-type'),
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        organization: formData.get('organization'),
        role: formData.get('role'),
        organizationType: formData.get('organization-type'),
        consent: formData.get('consent')
    };

    // Validate
    if (!data.consent) {
        alert('Please agree to receive communications to download the resource.');
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
        // IMPLEMENTATION NOTE: Backend Integration Required
        // The lead magnet form has been replaced with LeadConnectorHQ iframe (contact.html #resources section)
        // This function is currently NOT USED but kept for reference
        // If you need custom backend integration:
        // 1. Replace LeadConnectorHQ iframe with this custom form in contact.html
        // 2. Set up backend endpoint (e.g., /api/submit-lead)
        // 3. Uncomment and configure the fetch call below:
        /*
        const response = await fetch('/api/submit-lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        
        const result = await response.json();
        */
        
        // For now, simulate API call (REMOVE THIS when implementing real backend)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Get resource info
        const resource = leadMagnets[data.resourceType];
        
        // Show success message
        showSuccessMessage(resource);
        
        // Reset form
        e.target.reset();
        document.getElementById('resource-details').style.display = 'none';

        // Trigger download
        // triggerDownload(resource.fileUrl, resource.fileName);

    } catch (error) {
        alert('There was an error processing your request. Please try again or contact us directly.');
        // Error handling - lead magnet request failed
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Show success message
function showSuccessMessage(resource) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        max-width: 500px;
        width: 90%;
        z-index: 10000;
        text-align: center;
    `;
    
    successDiv.innerHTML = `
        <div style="color: #4caf50; font-size: 3rem; margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="margin-bottom: 1rem;">Success!</h3>
        <p style="color: var(--secondary-gray); margin-bottom: 1.5rem;">
            Your download link has been sent to your email address. Check your inbox (and spam folder) for "${resource.fileName}".
        </p>
        <button onclick="this.parentElement.remove(); document.getElementById('overlay').remove();" class="btn btn-primary">
            Got it!
        </button>
    `;

    // Add overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;
    overlay.onclick = () => {
        successDiv.remove();
        overlay.remove();
    };

    document.body.appendChild(overlay);
    document.body.appendChild(successDiv);
}

// Trigger file download
function triggerDownload(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLeadMagnetSystem);
