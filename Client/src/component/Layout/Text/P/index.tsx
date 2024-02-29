import { PProps } from "./types";

export const P = (props: PProps) => {
  return <p className={`${props.variant}`}>{props.text}</p>;
};
