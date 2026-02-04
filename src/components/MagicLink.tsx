import { ReactNode, AnchorHTMLAttributes } from 'react';
import { useMagicSound } from '../hooks/useMagicSound';

interface MagicLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
}

export const MagicLink = ({ children, className = '', onClick, ...props }: MagicLinkProps) => {
  const { playClick, initAudio } = useMagicSound();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    initAudio();
    playClick();
    onClick?.(e);
  };

  return (
    <a
      {...props}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};
