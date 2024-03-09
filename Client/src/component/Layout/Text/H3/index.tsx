import { H3Props } from "./types";

export const H3: React.FC<H3Props> = (props) => {
  return (
    <h3
      className={`${props.variant} font-bold tracking-tight text-gray-900 dark:text-white text-sm md:text-xl sm:text-lg`}
    >
      {props.content}
      {props.children}
    </h3>
  );
};
