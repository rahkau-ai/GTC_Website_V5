// Extract unique service links from homepage serviceOptions
const uniqueServices = new Set();

// From academic section:
uniqueServices.add('services.html#technology-validation');
uniqueServices.add('services.html#partnership-strategy');
uniqueServices.add('services.html#cmc-assessment');
uniqueServices.add('services.html#target-validation');
uniqueServices.add('services.html#vector-design');
uniqueServices.add('services.html#preclinical-design');
uniqueServices.add('services.html#grant-navigator');
uniqueServices.add('services.html#patient-tpp');
uniqueServices.add('services.html#strategic-intelligence');
uniqueServices.add('services.html#cns-services');

// From biotech section:
uniqueServices.add('services.html#disease-optimization');
uniqueServices.add('services.html#investment-diligence');
uniqueServices.add('services.html#outsourcing-strategy');
uniqueServices.add('services.html#kol-strategy');

// From technology section:
uniqueServices.add('services.html#launch-assurance');
uniqueServices.add('services.html#roi-toolkit');
uniqueServices.add('services.html#regulatory-compatibility');

// From investor section:  
uniqueServices.add('services.html#preclinical-validate');
uniqueServices.add('services.html#patent-review');
uniqueServices.add('services.html#portfolio-guard');

console.log('Unique services from homepage:', uniqueServices.size);
console.log('Services list:', Array.from(uniqueServices).sort());