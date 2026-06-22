export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'muted'
  | 'currentColor';

export type IconTheme = 'outlined' | 'filled' | 'twoTone';

export interface IconOptions {
  type?: string;
  theme?: IconTheme;
  size?: IconSize;
  color?: IconColor;
  spin?: boolean;
  decorative?: boolean;
  ariaLabel?: string;
  svgContent?: string;
}
