import { ReactNode } from "react";
import Button from "../Button/Button";
import React from "react";

function ButtonIcon({ children, style, ...rest }:
  {
    children: ReactNode;
    style?: { [key: string]: any };
    [key: string]: any;
  },
  ref: ((instance: HTMLButtonElement | null) => void) | React.MutableRefObject<HTMLButtonElement | null> | null) {

  return (
    <Button
      ref={ref}
      style={{
        width: '18px',
        height: '18px',
        ...style
      }}
      {...rest}>
      {children}
    </Button>
  );
}

export default React.forwardRef(ButtonIcon);