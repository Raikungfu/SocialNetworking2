import { H3Props } from "./types";

const H3: React.FC<H3Props> = (props) => {
  return (
    <h3
      className={`${props.variant} mt-4 text-xl font-bold tracking-tight sm:text-3xl md:text-xs text-gray-900 dark:text-white`}
    >
      {props.content}
    </h3>
  );
};

export default H3;
