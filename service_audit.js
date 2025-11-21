// Comprehensive service audit to identify services missing from categorization logic
// Based on current serviceOptions structure in js/script.js

const allServicesInDropdown = [
    // Academic services
    'technology-comparison',     // ❌ Missing from categorization
    'vendor-evaluation',        // ❌ Missing from categorization  
    'characterization-methods', // ❌ Missing from categorization
    'target-validation',        // ✅ In AAV Drug Development Services
    'vector-design',           // ✅ In AAV Drug Development Services
    'preclinical-design',      // ✅ In AAV Drug Development Services
    'grant-navigator',         // ✅ In AAV Grant and Foundation Services
    'patient-tpp',             // ✅ In AAV Grant and Foundation Services
    'translation-roadmap',     // ❌ Missing from categorization
    'lab-setup',               // ❌ Missing from categorization - THIS IS THE REPORTED ISSUE
    'ai-audit',                // ✅ In AI Transformation Services
    'ai-education',            // ✅ In AI Transformation Services
    'ai-implementation',       // ✅ In AI Transformation Services

    // Biotech services
    // target-validation (already counted)
    // vector-design (already counted)
    // preclinical-design (already counted)
    'cmc-assessment',          // ✅ In AAV Drug Development Services
    'vendor-partnerships',     // ✅ In AAV Drug Development Services (mapped to outsourcing-strategy)
    // ai services (already counted)

    // Service provider services
    // target-validation (already counted)
    // preclinical-design (already counted)
    // cmc-assessment (already counted)
    'cns-services',            // ✅ In CNS Specific Services
    'client-development',      // ❌ Missing from categorization
    'market-positioning',      // ❌ Missing from categorization
    // ai services (already counted)

    // Technology company services
    'market-research',         // ❌ Missing from categorization
    'technology-validation',   // ✅ In Enabling Technology Services
    'kol-strategy',           // ✅ In Enabling Technology Services
    'kol-validation',         // ❌ Missing from categorization
    'lab-penetration',        // ❌ Missing from categorization
    'roi-toolkit',            // ✅ In Enabling Technology Services
    'niche-navigator',        // ✅ In Enabling Technology Services
    'customer-success',       // ❌ Missing from categorization
    'partnership-strategy',   // ✅ In Enabling Technology Services
    'competitive-intelligence', // ❌ Missing from categorization
    'regulatory-compatibility', // ✅ In Enabling Technology Services
    // ai services (already counted)

    // Investor services
    'technology-screening',    // ❌ Missing from categorization
    'investment-diligence',   // ✅ In Investment and Strategy Services
    'preclinical-validate',   // ✅ In Investment and Strategy Services
    'patent-review'           // ✅ In Investment and Strategy Services
];

const servicesCapturedByCategorization = [
    // Grant and Foundation Services
    'grant-navigator', 
    'patient-tpp',
    
    // Drug Development Services  
    'target-validation',
    'preclinical-design', 
    'cmc-assessment',
    'vector-design',
    'vendor-partnerships', // includes outsourcing-strategy
    
    // AI Transformation Services
    'ai-audit',
    'ai-education', 
    'ai-implementation',
    
    // Enabling Technology Services
    'technology-validation',
    'roi-toolkit',
    'niche-navigator', 
    'kol-strategy',
    'partnership-strategy',
    'regulatory-compatibility',
    'launch-assurance', // not in serviceOptions
    
    // Investment and Strategy Services
    'investment-diligence',
    'preclinical-validate',
    'patent-review',
    'portfolio-guard', // not in serviceOptions
    
    // CNS Specific Services
    'cns-services'
];

const missingFromCategorization = [
    'technology-comparison',     // Academic - finding-technologies
    'vendor-evaluation',        // Academic - finding-technologies
    'characterization-methods', // Academic - finding-technologies  
    'translation-roadmap',     // Academic - preparing-translation
    'lab-setup',              // Academic - building-capabilities ⭐ REPORTED ISSUE
    'client-development',      // Service - client-acquisition
    'market-positioning',      // Service - client-acquisition
    'market-research',         // Technology - product-market-fit
    'kol-validation',         // Technology - kol-engagement
    'lab-penetration',        // Technology - market-adoption
    'customer-success',       // Technology - market-adoption
    'competitive-intelligence', // Technology - customer-acquisition
    'technology-screening'     // Investor - evaluating-opportunities
];

console.log("MISSING SERVICES FROM CATEGORIZATION:");
console.log("===================================");
missingFromCategorization.forEach(service => {
    console.log(`- ${service}`);
});

console.log(`\nTOTAL SERVICES IN DROPDOWN: ${allServicesInDropdown.length}`);
console.log(`SERVICES CAPTURED BY CATEGORIZATION: ${servicesCapturedByCategorization.length}`);
console.log(`MISSING FROM CATEGORIZATION: ${missingFromCategorization.length}`);