import style from "./LoadMoreBtn.module.css";

type Props = {
  children: string;
  onClick: () => void;
  disabled: boolean;
};

const LoadMoreBtn: React.FC<Props> = ({ children, onClick, disabled }) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;
