import { forwardRef } from "react";
import styled from "./Container.module.css";

export const Container = forwardRef((props, ref) => {
  return (
    <div className={styled.container} ref={ref}>
      {props.children}
    </div>
  );
});
Container.displayName;
