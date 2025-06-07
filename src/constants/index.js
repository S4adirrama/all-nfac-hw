import { Palette, Zap, Star, Grid } from 'lucide-react';

export const CATEGORIES = {
  UI: { name: 'UI/UX', color: 'from-purple-500 to-pink-500', icon: Palette },
  PERFORMANCE: { name: 'Performance', color: 'from-green-500 to-blue-500', icon: Zap },
  FEATURE: { name: 'Feature', color: 'from-orange-500 to-red-500', icon: Star },
  OTHER: { name: 'Other', color: 'from-gray-500 to-slate-500', icon: Grid }
};

export const SORT_TYPES = {
  DATE_DESC: 'date_desc',
  DATE_ASC: 'date_asc',
  LIKES_DESC: 'likes_desc',
  LIKES_ASC: 'likes_asc'
}; 