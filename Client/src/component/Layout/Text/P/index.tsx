import React from "react";
import { PProps } from "./types";

function P(props: PProps) {
  return (
    <p className={`${props.variant} text-gray-900 dark:text-white`}>
      {props.text}
    </p>
  );
}

export default P;
