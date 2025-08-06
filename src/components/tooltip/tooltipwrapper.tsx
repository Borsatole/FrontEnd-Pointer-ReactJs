import { Tooltip as FlowbiteTooltip } from 'flowbite-react';
import { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  tooltip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
};

export default function Tooltip({ tooltip, position = 'top', children }: Props) {
  const { theme } = useTheme();

  // Inverte o tema para tooltip: dark mode = style light (fundo branco)
  const tooltipStyle = theme === 'dark' ? 'light' : 'dark';

  return (
    <FlowbiteTooltip content={tooltip} placement={position} style={tooltipStyle}>
      {children}
    </FlowbiteTooltip>
  );
}
