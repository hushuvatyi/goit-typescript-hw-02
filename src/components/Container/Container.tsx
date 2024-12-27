import { forwardRef } from "react";
import styled from "./Container.module.css";

type ReactElementProps = {
  children: React.ReactElement;
};

const Container: React.FC<ReactElementProps> = ({ children }) => {
  return <div className={styled.container}>{children}</div>;
};

export default Container;
