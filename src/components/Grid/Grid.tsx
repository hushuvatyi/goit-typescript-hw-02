import { Image } from "../../types/responseTypes";
import css from "./Grid.module.css";

type ReactElementProps = {
  children: React.ReactNode;
};

export const Grid: React.FC<ReactElementProps> = ({ children }) => {
  return <ul className={css.list}>{children}</ul>;
};
