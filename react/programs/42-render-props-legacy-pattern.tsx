import type {ReactNode} from 'react';

type MousePositionProps = {
  children: (position: {x: number; y: number}) => ReactNode;
};

export function MousePosition({children}: MousePositionProps) {
  return children({x: 0, y: 0});
}
