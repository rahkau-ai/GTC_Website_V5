// Verification of service counts after categorization update

const servicesByCategory = {
    'AAV Grant and Foundation Services': [
        'grant-navigator',
        'patient-tpp'
    ],
    'AAV Drug Development Services': [
        'target-validation',
        'preclinical-design', 
        'cmc-assessment',
        'vector-design',
        'vendor-partnerships', // maps to outsourcing-strategy
        // Newly added:
        'technology-comparison',
        'vendor-evaluation',
        'characterization-methods',
        'translation-roadmap',
        'lab-setup' // ✅ Created page
    ],
    'AI Transformation Services': [
        'ai-audit',
        'ai-education',
        'ai-implementation'
    ],
    'Enabling Technology Services': [
        'technology-validation',
        'roi-toolkit',
        'niche-navigator',
        'kol-strategy',
        'partnership-strategy',
        'regulatory-compatibility',
        'launch-assurance', // exists on page but not in serviceOptions
        // Newly added:
        'kol-validation',
        'lab-penetration',
        'customer-success'
    ],
    'Investment and Strategy Services': [
        'investment-diligence',
        'preclinical-validate',
        'patent-review',
        'portfolio-guard', // exists on page but not in serviceOptions
        'technology-screening',
        // Newly added:
        'market-research',
        'competitive-intelligence',
        'client-development',
        'market-positioning'
    ],
    'CNS Specific Services': [
        'cns-services'
    ]
};

console.log("Expected service counts after categorization update:");
Object.keys(servicesByCategory).forEach(category => {
    console.log(`${category}: ${servicesByCategory[category].length} services`);
});

console.log("\nServices with existing pages:");
const servicesWithPages = [
    'target-validation', 'vector-design', 'preclinical-design', 'cmc-assessment', 'outsourcing-strategy',
    'grant-navigator', 'patient-tpp',
    'ai-audit', 'ai-education', 'ai-implementation', 
    'technology-validation', 'roi-toolkit', 'niche-navigator', 'kol-strategy', 'partnership-strategy', 'regulatory-compatibility', 'launch-assurance',
    'investment-diligence', 'preclinical-validate', 'patent-review', 'portfolio-guard', 'technology-screening',
    'cns-services',
    'lab-setup' // ✅ Just created
];
console.log(`Total services with pages: ${servicesWithPages.length}`);

console.log("\nServices still needing pages:");
const servicesNeedingPages = [
    'technology-comparison', 'vendor-evaluation', 'characterization-methods', 'translation-roadmap',
    'kol-validation', 'lab-penetration', 'customer-success',
    'market-research', 'competitive-intelligence', 'client-development', 'market-positioning'
];
console.log(`Total services needing pages: ${servicesNeedingPages.length}`);