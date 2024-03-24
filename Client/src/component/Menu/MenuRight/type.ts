export interface MenuRightProps {
  navChild?: Array<{
    link: string;
    context?: string;
    id: string;
    icon?: JSX.Element;
    classColor?: string;
    variant?: string;
  }>;
}
