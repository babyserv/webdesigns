function buildSitemap(input) {
  const pages = [
    { name: 'Home', purpose: 'Hook + value proposition + CTA' },
    { name: 'Services', purpose: 'Detailed offer stack and outcomes' },
    { name: 'About', purpose: 'Story + authority positioning' },
    { name: 'Results', purpose: 'Case studies and testimonials' },
    { name: 'Contact', purpose: 'Lead capture + qualification' }
  ];

  if (input.features.includes('blog')) pages.push({ name: 'Insights', purpose: 'SEO and nurture content' });
  if (input.features.includes('ecommerce')) pages.push({ name: 'Shop', purpose: 'Product conversion storefront' });
  if (input.features.includes('booking')) pages.push({ name: 'Book', purpose: 'Appointment conversion page' });

  return {
    pages,
    hierarchy: ['Home', 'Services', 'Results', 'About', 'Contact'],
    conversionFunnel: ['Hook', 'Problem', 'Solution', 'Proof', 'Offer', 'CTA']
  };
}

function generateSiteFiles(input, brandSummary) {
  const accent = input.colorPreferences || 'cyan + violet';
  return {
    'index.html': `<!doctype html><html><head><title>${input.businessName}</title></head><body><h1>${input.businessName}</h1><p>${brandSummary.mission}</p></body></html>`,
    'style.css': `:root{--brand:${accent}} body{font-family:Inter,sans-serif;}`,
    'script.js': `console.log('Custom site generated for ${input.businessName}');`
  };
}

module.exports = { buildSitemap, generateSiteFiles };
