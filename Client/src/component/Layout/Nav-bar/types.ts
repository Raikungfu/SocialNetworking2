export interface NavProps {
  id?: string;
  label?: string;
  wrapNavVariant: string;
  wrapChildVariant: string;
  navContext: {
    className?: string;
    navChild: Array<{
      label?: string;
      labelVariant?: string;
      link: string;
      context?: string;
      id: string;
      icon?: JSX.Element;
      classColor?: string;
      variant?: string;
    }>;
  };
}
