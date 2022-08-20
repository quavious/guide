import { MouseEvent } from 'react';

export interface IconProps {
  onClick?: (event?: MouseEvent) => unknown;
  className?: string;
}
