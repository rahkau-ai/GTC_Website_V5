// Blog System with Filtering and Tagging
// Gene Therapy Consultancy - Insights Blog

// Blog post data structure
const blogPosts = [
    {
        id: 1,
        title: "The AI Revolution in Gene Therapy: Beyond ChatGPT",
        excerpt: "How custom AI agents and specialized platforms are transforming gene therapy development, moving beyond general-purpose AI to deliver industry-specific intelligence.",
        category: "AI & Automation",
        tags: ["AI", "Technology", "Innovation"],
        date: "2024-12-15",
        author: "Dr. Rahul Kaushik",
        readTime: "8 min read",
        featured: true,
        icon: "fa-chart-line"
    },
    {
        id: 2,
        title: "The Top 5 Operational Leaks Sinking Pre-Series A Biotechs",
        excerpt: "AI-powered analysis reveals the most common operational inefficiencies that burn capital and shorten runways in early-stage gene therapy companies.",
        category: "Operational Excellence",
        tags: ["Operations", "Funding", "Efficiency"],
        date: "2024-11-28",
        author: "Dr. Rahul Kaushik",
        readTime: "10 min read",
        featured: true,
        icon: "fa-money-bill-trend-up"
    },
    {
        id: 3,
        title: "Custom AI Agents vs. General AI: Why Specialization Matters",
        excerpt: "Understanding the critical differences between general-purpose AI and specialized AI agents in gene therapy development.",
        category: "AI & Automation",
        tags: ["AI", "Strategy", "Technology"],
        date: "2024-12-01",
        author: "Dr. Rahul Kaushik",
        readTime: "6 min read",
        featured: false,
        icon: "fa-robot"
    },
    {
        id: 4,
        title: "2024 Gene Therapy Funding Patterns: AI-Driven Analysis",
        excerpt: "What AI tells us about investor priorities and funding trends in the gene therapy landscape.",
        category: "Market Intelligence",
        tags: ["Funding", "Investment", "Market Analysis"],
        date: "2024-11-15",
        author: "Dr. Rahul Kaushik",
        readTime: "12 min read",
        featured: false,
        icon: "fa-chart-bar"
    },
    {
        id: 5,
        title: "The 40% Solution: How AI-Driven Operations Extend Biotech Runway",
        excerpt: "Quantifying the impact of AI-powered operational excellence on capital efficiency and runway extension.",
        category: "Operational Excellence",
        tags: ["Operations", "AI", "ROI"],
        date: "2024-11-10",
        author: "Dr. Rahul Kaushik",
        readTime: "9 min read",
        featured: false,
        icon: "fa-cogs"
    },
    {
        id: 6,
        title: "Vector Selection in 2024: AI-Powered Decision Trees",
        excerpt: "Modern frameworks for AAV vector selection leveraging AI-driven decision support systems.",
        category: "Technical Strategy",
        tags: ["AAV", "Technology", "Decision Making"],
        date: "2024-10-25",
        author: "Dr. Rahul Kaushik",
        readTime: "11 min read",
        featured: false,
        icon: "fa-microscope"
    }
];

// Initialize blog system
function initBlogSystem() {
    renderBlogPosts();
    setupFilters();
    setupSearch();
}

// Render blog posts
function renderBlogPosts(filter = 'all', searchTerm = '') {
    const blogContainer = document.getElementById('blog-posts-container');
    if (!blogContainer) return;

    let filteredPosts = blogPosts;

    // Apply category filter
    if (filter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === filter);
    }

    // Apply search filter
    if (searchTerm) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render posts
    if (filteredPosts.length === 0) {
        blogContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--secondary-gray); margin-bottom: 1rem;"></i>
                <h3>No posts found</h3>
                <p>Try adjusting your filters or search term.</p>
            </div>
        `;
        return;
    }

    blogContainer.innerHTML = filteredPosts.map(post => `
        <div class="blog-card" data-category="${post.category}" data-tags='${JSON.stringify(post.tags)}'>
            <div class="blog-card-header">
                <div class="blog-icon">
                    <i class="fas ${post.icon}"></i>
                </div>
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-date">${formatDate(post.date)}</span>
                </div>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            <div class="blog-footer">
                <span class="blog-author"><i class="fas fa-user-circle"></i> ${post.author}</span>
                <span class="blog-read-time"><i class="fas fa-clock"></i> ${post.readTime}</span>
            </div>
            <a href="#blog-${post.id}" class="btn btn-outline btn-small">Read More</a>
        </div>
    `).join('');
}

// Setup category filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const searchTerm = document.getElementById('blog-search')?.value || '';
            renderBlogPosts(filter, searchTerm);
        });
    });
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        const activeFilter = document.querySelector('.blog-filter-btn.active')?.dataset.filter || 'all';
        renderBlogPosts(activeFilter, searchTerm);
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initBlogSystem);
