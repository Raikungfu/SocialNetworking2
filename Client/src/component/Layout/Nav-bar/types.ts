export interface NavProps {
  id?: string;
  wrapNavVariant: string;
  wrapChildVariant: string;
  navContext: Array<{
    link: string;
    context?: string;
    id: string;
    icon?: JSX.Element;
    classColor?: string;
    variant?: string;
  }>;
}
