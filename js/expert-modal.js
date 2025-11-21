// Expert Profile Modal System
// Gene Therapy Consultancy

// Expert profiles data
const expertProfiles = {
    'rahul-kaushik': {
        name: "Dr. Rahul Kaushik",
        title: "Founder, CEO and Chief AI Strategist",
        photo: "https://page.gensparksite.com/v1/base64_upload/c6cdf11b02637213c58fdd44dfe89601",
        linkedin: "https://www.linkedin.com/in/dr-rahul-kaushik/",
        shortBio: "Gene therapy expert building systems to eliminate development hurdles",
        
        introduction: "Bridging AAV Gene Therapy Expertise with AI Innovation",
        
        mission: "Over the past decade, I witnessed brilliant AAV science repeatedly fail on the path to patients—not due to bad science, but due to 'Avoidable Hurdles' often called the 'Valley of Death' in drug development. In recent years, I've invested significant time building a strong foundation in AI technology. Now, my mission is to combine deep AAV gene therapy expertise with cutting-edge AI to deliver the highest quality insights at scale, systematically removing these avoidable hurdles that prevent life-saving therapies from reaching patients.",
        
        experience: [
            {
                category: "Gene Therapy Expertise",
                description: "10+ years of hands-on experience in viral vector-based gene delivery approaches targeting CNS, retina, and liver applications",
                highlights: [
                    "Established rAAV and LVV-based platform technologies for gene supplementation, silencing (siRNA, miRNA), and editing",
                    "Produced 150+ rAAVs of different serotypes, including LVV and CRISPR activation/inhibition systems",
                    "Expert in vector design, capsid selection, and lead candidate selection, preclinical development, scalable vector production, process and analytical development",
                    "Worked in three organizations dedicated to bringing transformative therapies to patients: <strong>VeonGen Therapeutics GmbH</strong> (Clinical-Stage Biotech, Munich, with two clinical stage programs for inherited retinal diseases), <strong>Evox Therapeutics</strong> (Pioneering exosome-based gene editing approaches for CNS disease targeting), and <strong>CSL Behring</strong> (A global biotech with the first-ever FDA-approved gene therapy for hemophilia B)",
                    "Successfully led teams and projects. Deep understanding of the orchestrated effort required—from vector design to clinic—involving highly skilled teams, proper resources, and aligned execution"
                ]
            },
            {
                category: "AI Expertise",
                description: "Expert in Generative AI use cases in biotech to remove operational bottlenecks, automate workflows, de-risk programs, cut costs and increase productivity",
                highlights: [
                    "Built deep expertise in advanced AI technologies including Large Language Models, AI agents, and workflow automation",
                    "Specialized in applying AI to eliminate operational inefficiencies across gene therapy development lifecycle",
                    "Pioneered AI-native consulting model that amplifies expert knowledge while reducing costs and accelerating delivery"
                ]
            }
        ],
        
        insights: {
            title: "The Valley of Death: Why Brilliant Science Fails",
            content: "Through my journey, one critical lesson became clear: bringing complex gene therapies to the clinic requires an orchestrated effort of highly skilled individuals, empowered by the right resources and technologies, all driven by a common mission. Every factor matters, and skillful execution is obligatory. Too often, brilliant AAV science falters not because of the science itself, but because of operational inefficiencies, strategic blind spots, and capital mismanagement—the 'Avoidable Hurdles' that define the Valley of Death."
        },
        
        transformation: {
            title: "Building the AI-Native Solution",
            content: "Recognizing that traditional consulting models couldn't scale to address these systemic challenges, I spent the last several years building deep expertise in AAV gene therapy and AI technologies. This foundation enables GTC to deliver expert-level insights at unprecedented scale and speed. By combining field expert knowledge with AI amplification, we can now systematically identify and eliminate avoidable hurdles before they derail programs—transforming how gene therapy development happens."
        },
        
        approach: "AI doesn't replace expertise—it amplifies it. Our model ensures that field experts make AI smarter through their domain knowledge, while AI helps experts deliver insights faster and more consistently. This synergy enables us to provide the highest quality strategic guidance at a fraction of traditional consulting costs, ultimately accelerating the path from AAV science to patient impact.",
        
        credentials: [
            "10+ years specialized AAV gene therapy experience",
            "150+ viral vector productions across multiple serotypes",
            "Inner working experience at university spin off, startup and a global biotech",
            "Expertise in use of Advanced AI technology and implementation with a focus on operational efficiencies",
            "More than 20 peer-reviewed publications in the top journals like, Science, Cell, Nature comm, EMBO"
        ],
        
        expertise: [
            "AAV Vector Design & Optimization",
            "Viral Vector Production & Characterization",
            "CNS, Retinal & Liver Gene Therapy",
            "Preclinical to Clinical Translation",
            "AI-Powered Decision Support",
            "Operational Efficiency & Cost Optimization",
            "Strategic Program Planning",
            "Technical Due Diligence"
        ]
    },
    
    // Placeholder for future experts
    'future-expert-1': {
        name: "Expert Name",
        title: "Specialization Area",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        shortBio: "Brief expertise description",
        introduction: "Coming Soon",
        mission: "Join our expert network to amplify your impact in gene therapy development.",
        isPlaceholder: true
    }
};

// Initialize expert modal system
function initExpertModalSystem() {
    setupExpertCards();
    setupModalClose();
}

// Setup clickable expert cards
function setupExpertCards() {
    const expertCards = document.querySelectorAll('[data-expert-id]');
    expertCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.classList.add('expert-card-clickable');
        
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const expertId = card.dataset.expertId;
            openExpertModal(expertId);
        });

        // Add hover effect hint
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Open expert modal
function openExpertModal(expertId) {
    const expert = expertProfiles[expertId];
    if (!expert) return;

    // Create modal
    const modal = createExpertModal(expert);
    document.body.appendChild(modal);

    // Trigger animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Create modal HTML
function createExpertModal(expert) {
    const modal = document.createElement('div');
    modal.className = 'expert-modal';
    modal.id = 'expert-modal';

    if (expert.isPlaceholder) {
        modal.innerHTML = createPlaceholderModalContent(expert);
    } else {
        modal.innerHTML = createFullModalContent(expert);
    }

    return modal;
}

// Create full modal content
function createFullModalContent(expert) {
    return `
        <div class="expert-modal-overlay" onclick="closeExpertModal()"></div>
        <div class="expert-modal-content">
            <button class="expert-modal-close" onclick="closeExpertModal()">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="expert-modal-header">
                <div class="expert-modal-photo">
                    <img src="${expert.photo}" alt="${expert.name}">
                </div>
                <div class="expert-modal-header-info">
                    <h2>${expert.name}</h2>
                    <p class="expert-modal-title">${expert.title}</p>
                    <a href="${expert.linkedin}" target="_blank" class="btn btn-outline btn-small">
                        <i class="fab fa-linkedin"></i> Connect on LinkedIn
                    </a>
                </div>
            </div>

            <div class="expert-modal-body">
                <section class="expert-modal-section">
                    <h3><i class="fas fa-lightbulb"></i> ${expert.introduction}</h3>
                    <p class="expert-modal-mission">${expert.mission}</p>
                </section>

                ${expert.experience.map(exp => `
                    <section class="expert-modal-section">
                        <h3><i class="fas fa-briefcase"></i> ${exp.category}</h3>
                        <p><strong>${exp.description}</strong></p>
                        <ul class="expert-modal-list">
                            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </section>
                `).join('')}

                <section class="expert-modal-section expert-modal-insight">
                    <h3><i class="fas fa-exclamation-triangle"></i> ${expert.insights.title}</h3>
                    <p>${expert.insights.content}</p>
                </section>

                <section class="expert-modal-section expert-modal-transformation">
                    <h3><i class="fas fa-rocket"></i> ${expert.transformation.title}</h3>
                    <p>${expert.transformation.content}</p>
                </section>

                <section class="expert-modal-section">
                    <h3><i class="fas fa-handshake"></i> The GTC Approach</h3>
                    <p>${expert.approach}</p>
                </section>

                <div class="expert-modal-grid">
                    <div class="expert-modal-section">
                        <h3><i class="fas fa-certificate"></i> Key Credentials</h3>
                        <ul class="expert-modal-credentials">
                            ${expert.credentials.map(c => `<li><i class="fas fa-check-circle"></i> ${c}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="expert-modal-section">
                        <h3><i class="fas fa-star"></i> Areas of Expertise</h3>
                        <div class="expert-modal-tags">
                            ${expert.expertise.map(e => `<span class="expert-tag">${e}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="expert-modal-cta">
                    <h3>Work with ${expert.name.split(' ')[1]}</h3>
                    <p>Leverage deep AAV expertise amplified by AI to accelerate your gene therapy program</p>
                    <a href="contact.html#services" class="btn btn-primary btn-large">
                        <i class="fas fa-calendar"></i> Schedule a Consultation
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Create placeholder modal content
function createPlaceholderModalContent(expert) {
    return `
        <div class="expert-modal-overlay" onclick="closeExpertModal()"></div>
        <div class="expert-modal-content expert-modal-placeholder">
            <button class="expert-modal-close" onclick="closeExpertModal()">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="expert-modal-header">
                <div class="expert-modal-photo placeholder-photo">
                    <i class="fas fa-user"></i>
                </div>
                <div class="expert-modal-header-info">
                    <h2>Expert Position Available</h2>
                    <p class="expert-modal-title">Join Our Expert Network</p>
                </div>
            </div>

            <div class="expert-modal-body">
                <section class="expert-modal-section">
                    <h3><i class="fas fa-users"></i> Become a GTC Expert Partner</h3>
                    <p style="font-size: 1.1rem; line-height: 1.8;">
                        ${expert.mission}
                    </p>
                </section>

                <section class="expert-modal-section">
                    <h3>Why Join Our Expert Network?</h3>
                    <ul class="expert-modal-list">
                        <li>Amplify your expertise with AI-powered reach</li>
                        <li>Earn more while focusing purely on your domain knowledge</li>
                        <li>Zero business overhead—we handle everything else</li>
                        <li>Collaborate with elite gene therapy professionals</li>
                        <li>Contribute to accelerating life-saving therapies</li>
                    </ul>
                </section>

                <div class="expert-modal-cta">
                    <h3>Interested in Joining?</h3>
                    <p>Let's discuss how we can amplify your impact together</p>
                    <a href="contact.html#expert-network" class="btn btn-primary btn-large">
                        <i class="fas fa-handshake"></i> Express Your Interest
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Close modal
function closeExpertModal() {
    const modal = document.getElementById('expert-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Setup modal close events
function setupModalClose() {
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeExpertModal();
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initExpertModalSystem);
