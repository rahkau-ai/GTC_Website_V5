/**
 * Admin Dashboard JavaScript
 * Handles data loading, filtering, and display for all form submissions
 */

let servicesData = [];
let resourcesData = [];
let expertsData = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    loadAllData();
    setupSearch();
});

// Tab switching
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Load all data
async function loadAllData() {
    await Promise.all([
        loadServicesInquiries(),
        loadResourceDownloads(),
        loadExpertApplications()
    ]);
    updateStatistics();
}

// Load Services Inquiries
async function loadServicesInquiries() {
    try {
        const response = await fetch('tables/services_inquiries?limit=100&sort=-created_at');
        const result = await response.json();
        servicesData = result.data || [];
        
        renderServicesTable(servicesData);
        document.getElementById('badge-services').textContent = servicesData.length;
    } catch (error) {
        console.error('Error loading services inquiries:', error);
        document.getElementById('services-table-content').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Data</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Load Resource Downloads
async function loadResourceDownloads() {
    try {
        const response = await fetch('tables/resource_downloads?limit=100&sort=-created_at');
        const result = await response.json();
        resourcesData = result.data || [];
        
        renderResourcesTable(resourcesData);
        document.getElementById('badge-resources').textContent = resourcesData.length;
    } catch (error) {
        console.error('Error loading resource downloads:', error);
        document.getElementById('resources-table-content').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Data</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Load Expert Applications
async function loadExpertApplications() {
    try {
        const response = await fetch('tables/expert_applications?limit=100&sort=-created_at');
        const result = await response.json();
        expertsData = result.data || [];
        
        renderExpertsTable(expertsData);
        document.getElementById('badge-experts').textContent = expertsData.length;
    } catch (error) {
        console.error('Error loading expert applications:', error);
        document.getElementById('experts-table-content').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Data</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Render Services Table
function renderServicesTable(data) {
    const container = document.getElementById('services-table-content');
    
    if (data.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No Services Inquiries Yet</h3>
                <p>When customers submit the services inquiry form, their data will appear here.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Service</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(item => `
                    <tr>
                        <td>${formatDate(item.submitted_at)}</td>
                        <td>${item.full_name}</td>
                        <td>${item.company}</td>
                        <td>${item.service_interest}</td>
                        <td>${item.project_stage}</td>
                        <td><span class="status-badge status-${item.status?.toLowerCase().replace(' ', '-') || 'new'}">${item.status || 'New'}</span></td>
                        <td>
                            <button class="action-btn" onclick="viewDetails('services', '${item.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="sendEmail('${item.email}')" title="Send Email">
                                <i class="fas fa-envelope"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Render Resources Table
function renderResourcesTable(data) {
    const container = document.getElementById('resources-table-content');
    
    if (data.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No Resource Downloads Yet</h3>
                <p>When visitors download resources, their data will appear here.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Resource</th>
                    <th>Newsletter</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(item => `
                    <tr>
                        <td>${formatDate(item.submitted_at)}</td>
                        <td>${item.full_name}</td>
                        <td>${item.email}</td>
                        <td>${item.company}</td>
                        <td>${item.resource_interest}</td>
                        <td>${item.subscribe_newsletter ? '<i class="fas fa-check" style="color: var(--success)"></i>' : '<i class="fas fa-times" style="color: var(--secondary-gray)"></i>'}</td>
                        <td>
                            <button class="action-btn" onclick="viewDetails('resources', '${item.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="sendEmail('${item.email}')" title="Send Email">
                                <i class="fas fa-envelope"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Render Experts Table
function renderExpertsTable(data) {
    const container = document.getElementById('experts-table-content');
    
    if (data.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No Expert Applications Yet</h3>
                <p>When experts apply to join your network, their applications will appear here.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Experience</th>
                    <th>Availability</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(item => `
                    <tr>
                        <td>${formatDate(item.submitted_at)}</td>
                        <td>${item.full_name}</td>
                        <td>${item.email}</td>
                        <td>${item.years_experience}</td>
                        <td>${item.consulting_availability}</td>
                        <td><span class="status-badge status-${item.application_status?.toLowerCase().replace(' ', '-') || 'new'}">${item.application_status || 'New'}</span></td>
                        <td>
                            <button class="action-btn" onclick="viewDetails('experts', '${item.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="sendEmail('${item.email}')" title="Send Email">
                                <i class="fas fa-envelope"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// View details modal
async function viewDetails(type, id) {
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    // Find the item
    let item;
    if (type === 'services') {
        item = servicesData.find(d => d.id === id);
        modalTitle.textContent = 'Services Inquiry Details';
    } else if (type === 'resources') {
        item = resourcesData.find(d => d.id === id);
        modalTitle.textContent = 'Resource Download Details';
    } else if (type === 'experts') {
        item = expertsData.find(d => d.id === id);
        modalTitle.textContent = 'Expert Application Details';
    }
    
    if (!item) {
        alert('Item not found');
        return;
    }
    
    // Build detail HTML based on type
    let detailsHTML = '';
    
    if (type === 'services') {
        detailsHTML = `
            <div class="detail-row">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">${item.full_name}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email</div>
                <div class="detail-value"><a href="mailto:${item.email}">${item.email}</a></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Company</div>
                <div class="detail-value">${item.company}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Phone</div>
                <div class="detail-value">${item.phone || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Service Interest</div>
                <div class="detail-value">${item.service_interest}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Project Stage</div>
                <div class="detail-value">${item.project_stage}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Urgency</div>
                <div class="detail-value">${item.urgency}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Budget Range</div>
                <div class="detail-value">${item.budget_range}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Message</div>
                <div class="detail-value">${item.message}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Submitted</div>
                <div class="detail-value">${formatDate(item.submitted_at, true)}</div>
            </div>
        `;
    } else if (type === 'resources') {
        detailsHTML = `
            <div class="detail-row">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">${item.full_name}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email</div>
                <div class="detail-value"><a href="mailto:${item.email}">${item.email}</a></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Company</div>
                <div class="detail-value">${item.company}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Job Title</div>
                <div class="detail-value">${item.job_title || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Resource Interest</div>
                <div class="detail-value">${item.resource_interest}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Project Focus</div>
                <div class="detail-value">${item.project_focus}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Current Challenge</div>
                <div class="detail-value">${item.current_challenge || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Newsletter Subscription</div>
                <div class="detail-value">${item.subscribe_newsletter ? 'Yes' : 'No'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Submitted</div>
                <div class="detail-value">${formatDate(item.submitted_at, true)}</div>
            </div>
        `;
    } else if (type === 'experts') {
        detailsHTML = `
            <div class="detail-row">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">${item.full_name}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email</div>
                <div class="detail-value"><a href="mailto:${item.email}">${item.email}</a></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Phone</div>
                <div class="detail-value">${item.phone}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">LinkedIn</div>
                <div class="detail-value">${item.linkedin_profile ? `<a href="${item.linkedin_profile}" target="_blank">${item.linkedin_profile}</a>` : 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Current Position</div>
                <div class="detail-value">${item.current_position}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Years of Experience</div>
                <div class="detail-value">${item.years_experience}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Expertise Areas</div>
                <div class="detail-value">${Array.isArray(item.expertise_areas) ? item.expertise_areas.join(', ') : item.expertise_areas || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">AAV Experience</div>
                <div class="detail-value">${item.aav_experience || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Regulatory Experience</div>
                <div class="detail-value">${item.regulatory_experience}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Therapeutic Areas</div>
                <div class="detail-value">${Array.isArray(item.therapeutic_areas) ? item.therapeutic_areas.join(', ') : item.therapeutic_areas || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Availability</div>
                <div class="detail-value">${item.consulting_availability}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Rate Expectation</div>
                <div class="detail-value">${item.rate_expectation}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Motivation</div>
                <div class="detail-value">${item.motivation}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Source</div>
                <div class="detail-value">${item.source}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Submitted</div>
                <div class="detail-value">${formatDate(item.submitted_at, true)}</div>
            </div>
        `;
    }
    
    modalBody.innerHTML = detailsHTML;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('detail-modal').classList.remove('active');
}

// Send email helper
function sendEmail(email) {
    window.location.href = `mailto:${email}`;
}

// Update statistics
function updateStatistics() {
    document.getElementById('stat-services').textContent = servicesData.length;
    document.getElementById('stat-resources').textContent = resourcesData.length;
    document.getElementById('stat-experts').textContent = expertsData.length;
    
    // Calculate new this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const newThisWeek = [
        ...servicesData.filter(item => new Date(item.submitted_at) > oneWeekAgo),
        ...resourcesData.filter(item => new Date(item.submitted_at) > oneWeekAgo),
        ...expertsData.filter(item => new Date(item.submitted_at) > oneWeekAgo)
    ].length;
    
    document.getElementById('stat-new').textContent = newThisWeek;
}

// Search functionality
function setupSearch() {
    document.getElementById('search-services').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = servicesData.filter(item => 
            item.full_name?.toLowerCase().includes(query) ||
            item.company?.toLowerCase().includes(query) ||
            item.email?.toLowerCase().includes(query)
        );
        renderServicesTable(filtered);
    });
    
    document.getElementById('search-resources').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = resourcesData.filter(item => 
            item.full_name?.toLowerCase().includes(query) ||
            item.company?.toLowerCase().includes(query) ||
            item.email?.toLowerCase().includes(query)
        );
        renderResourcesTable(filtered);
    });
    
    document.getElementById('search-experts').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = expertsData.filter(item => 
            item.full_name?.toLowerCase().includes(query) ||
            item.email?.toLowerCase().includes(query) ||
            item.current_position?.toLowerCase().includes(query)
        );
        renderExpertsTable(filtered);
    });
}

// Utility: Format date
function formatDate(dateString, includeTime = false) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    return date.toLocaleDateString('en-US', options);
}

// Close modal when clicking outside
document.getElementById('detail-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
