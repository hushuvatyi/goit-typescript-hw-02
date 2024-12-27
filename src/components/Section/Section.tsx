import style from "./Section.module.css";

type ReactElementProps = {
  children: React.ReactElement;
};

const Section: React.FC<ReactElementProps> = ({ children }) => {
  return <section className={style.section}>{children}</section>;
};

export default Section;
