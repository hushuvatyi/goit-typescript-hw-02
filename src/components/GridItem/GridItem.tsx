import css from "./GridItem.module.css";

type ReactElementProps = {
  children: React.ReactElement;
};

export const GridItem: React.FC<ReactElementProps> = ({ children }) => {
  return <li className={css.item}>{children}</li>;
};
