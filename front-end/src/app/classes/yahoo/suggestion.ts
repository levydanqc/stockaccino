export interface Screener {
  Title: string;
  Description: string;
  Suggestions: Suggestion[];
}

export interface Suggestion {
  Name: string;
  Symbol: string;
  Change: number;
  ChangePercent: number;
  Ask: number;
}

export const screenersCategories: string[] = [
  'day_gainers',
  'day_losers',
  'growth_technology_stocks',
  'undervalued_growth_stocks',
  'most_shorted_stocks',
  'most_actives',
  'undervalued_large_caps',
  'aggressive_small_caps',
  'small_cap_gainers',
  // 'top_mutual_funds',
  'portfolio_anchors',
  'solid_large_growth_funds',
  'solid_midcap_growth_funds',
  'conservative_foreign_funds',
  'high_yield_bond',
];
