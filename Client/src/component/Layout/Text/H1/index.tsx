import { H1Props } from "./types";

const H1: React.FC<H1Props> = (props) => {
  return (
    <h1
      className={`${props.variant} mt-4 text-3xl md:text-7xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white`}
    >
      {props.content}
    </h1>
  );
};

export default H1;
