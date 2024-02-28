import { H1Props } from "./types";

export const H1: React.FC<H1Props> = (props) => {
  return (
    <h1
      className={
        `${
          props.className
            ? props.className
            : "mt-4 text-xl md:text-3xl font-bold tracking-tight sm:text-2xl text-gray-900 dark:text-white "
        } ` + props.variant
      }
    >
      {props.content}
    </h1>
  );
};
