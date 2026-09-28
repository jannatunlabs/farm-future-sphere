export const crops = [
  { name: 'Soybeans', icon: '◈', suitability: 94, water: '450–700 mm', period: '100–120 days', yield: '3.4 t/ha', revenue: 5680, cost: 1920, risk: 'Low', confidence: 92, reason: 'Warm growing days, balanced rainfall, and strong vegetation health make this the best match for the demo field.' },
  { name: 'Maize', icon: '✳', suitability: 89, water: '500–800 mm', period: '110–140 days', yield: '9.2 t/ha', revenue: 6320, cost: 2780, risk: 'Moderate', confidence: 89, reason: 'High yield potential on this soil, though peak-season heat and irrigation demand increase exposure.' },
  { name: 'Winter Wheat', icon: '❋', suitability: 82, water: '350–550 mm', period: '180–240 days', yield: '5.8 t/ha', revenue: 4890, cost: 1740, risk: 'Low', confidence: 86, reason: 'A cooler planting window and lower water need help buffer summer heat and dry spells.' },
  { name: 'Sorghum', icon: '✺', suitability: 76, water: '300–500 mm', period: '100–120 days', yield: '5.1 t/ha', revenue: 4210, cost: 1510, risk: 'Low', confidence: 84, reason: 'Drought tolerance offers resilience if future rainfall becomes less reliable.' },
];
export const climate = [
  { month: 'Jan', rainfall: 48, temp: 2, vegetation: 28 }, { month: 'Feb', rainfall: 54, temp: 4, vegetation: 30 },
  { month: 'Mar', rainfall: 71, temp: 10, vegetation: 39 }, { month: 'Apr', rainfall: 91, temp: 16, vegetation: 56 },
  { month: 'May', rainfall: 112, temp: 21, vegetation: 72 }, { month: 'Jun', rainfall: 118, temp: 26, vegetation: 83 },
  { month: 'Jul', rainfall: 102, temp: 29, vegetation: 88 }, { month: 'Aug', rainfall: 96, temp: 28, vegetation: 84 },
  { month: 'Sep', rainfall: 85, temp: 23, vegetation: 69 }, { month: 'Oct', rainfall: 72, temp: 16, vegetation: 53 },
  { month: 'Nov', rainfall: 61, temp: 9, vegetation: 38 }, { month: 'Dec', rainfall: 51, temp: 3, vegetation: 29 },
];
export const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
