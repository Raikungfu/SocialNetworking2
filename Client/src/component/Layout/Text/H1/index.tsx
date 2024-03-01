import { H1Props } from "./types";

export const H1: React.FC<H1Props> = (props) => {
  return (
    <h1
      className={
        `${
          props.className
            ? props.className
            : "font-bold tracking-tight text-gray-900 dark:text-white "
        }  text-xl md:text-3xl  sm:text-2xl` + props.variant
      }
    >
      {props.content}
    </h1>
  );
};
