const directions = [
  {
    theme: 'Futuristic Neon Tech',
    layout: 'asymmetrical split-screen',
    typography: 'Space Grotesk + Inter',
    colorPsychology: 'Electric trust + velocity with cyan, violet, and deep navy',
    motion: 'immersive'
  },
  {
    theme: 'Luxury Minimalist',
    layout: 'editorial grid with spacious rhythm',
    typography: 'Playfair Display + Manrope',
    colorPsychology: 'Confidence + exclusivity with charcoal, ivory, and champagne accents',
    motion: 'subtle'
  },
  {
    theme: 'Bold Industrial',
    layout: 'modular blocks with hard contrast panels',
    typography: 'Bebas Neue + IBM Plex Sans',
    colorPsychology: 'Strength + urgency with graphite, steel, and safety orange',
    motion: 'bold'
  },
  {
    theme: 'Nature / Organic Wellness',
    layout: 'storytelling scroll with soft section transitions',
    typography: 'Fraunces + Source Sans 3',
    colorPsychology: 'Calm + restoration with moss, sand, and sky tones',
    motion: 'subtle'
  }
];

function hashInput(seed) {
  return seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function buildBrandSummary(input) {
  const idx = hashInput(`${input.businessName}${input.industry}${input.usp}`) % directions.length;
  const creativeDirection = directions[idx];

  return {
    mission: `${input.businessName} helps ${input.targetAudience} achieve ${input.emotionalGoal.toLowerCase()} through ${input.coreOffer}.`,
    vision: `Become the most trusted ${input.industry.toLowerCase()} brand known for ${input.usp.toLowerCase()}.`,
    brandVoice: `${input.personality.slice(0, 4).join(', ')} and conversion-focused without hype.`,
    personas: [
      { name: 'The Primary Decision-Maker', motivation: `Needs reliable ${input.coreOffer}`, friction: 'Time and trust uncertainty' },
      { name: 'The Comparison Shopper', motivation: 'Wants proof and transparent value', friction: 'Fear of overpaying' },
      { name: 'The Referral Buyer', motivation: 'Seeks authority and social validation', friction: 'Needs faster next-step clarity' }
    ],
    messagingAngles: [
      `Outcome-first: ${input.emotionalGoal}`,
      `Differentiation: ${input.usp}`,
      `Practical value: ${input.coreOffer}`
    ],
    conversionStrategy: [
      'Lead with one dominant value proposition above the fold.',
      'Follow with problem-agitation-solution sequencing.',
      'Deploy social proof + authority badges before first form.',
      'Repeat one CTA per section with low-friction form fields.'
    ],
    creativeDirection
  };
}

module.exports = { buildBrandSummary };
