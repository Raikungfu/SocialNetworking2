export interface NavProps {
  id?: string;
  wrapNavVariant: string;
  wrapChildVariant: string;
  navContext: {
    className?: string;
    navChild: Array<{
      link: string;
      context?: string;
      id: string;
      icon?: JSX.Element;
      classColor?: string;
      variant?: string;
    }>;
  };
}
