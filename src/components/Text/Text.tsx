import style from "./Text.module.css";

type Props = {
  children: string;
  textAlign?: string;
  marginBottom?: string;
};

const Text: React.FC<Props> = ({
  children,
  textAlign = "",
  marginBottom = "0",
}) => {
  return (
    <p
      className={[
        style["text"],
        style[textAlign],
        style[`marginBottom${marginBottom}`],
      ].join(" ")}
    >
      {children}
    </p>
  );
};

export default Text;
