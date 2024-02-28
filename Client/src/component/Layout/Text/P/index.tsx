import React from "react";
import { PProps } from "./types";

export const P = (props: PProps) => {
  return (
    <p className={`${props.variant} text-gray-900 dark:text-white`}>
      {props.text}
    </p>
  );
};
