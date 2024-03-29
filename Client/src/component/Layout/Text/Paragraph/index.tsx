interface ParaProps {
  id?: string;
  key?: string;
  wrapClassName?: string;
  content?: string | JSX.Element;
  children?: JSX.Element;
  contentClassName?: string;
}

const Paragraph: React.FC<ParaProps> = (props) => {
  return (
    <div id={props.id} key={props.key} className={props.wrapClassName}>
      <p className={props.contentClassName} style={{ whiteSpace: "pre-line" }}>
        {props.content && props.content} {props.children && props.children}
      </p>
    </div>
  );
};

export default Paragraph;
