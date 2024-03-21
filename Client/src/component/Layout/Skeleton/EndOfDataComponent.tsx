type EndOfDataComponentProps = {
  variant: string;
  content: string;
};

const EndOfDataComponent: React.FC<EndOfDataComponentProps> = (props) => {
  return <div className={props.variant}>{props.content}</div>;
};

export default EndOfDataComponent;
