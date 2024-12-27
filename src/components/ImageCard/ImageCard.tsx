import { ImageUrls } from "../../types/responseTypes";
import { GridItem } from "../GridItem/GridItem";
import css from "./ImageCard.module.css";

type Props = {
  alt: string;
  urls: ImageUrls;
  avg_color: string;
  openModal: (src: string, alt: string) => void;
};

export const ImageCard: React.FC<Props> = ({
  urls,
  alt,
  avg_color,
  openModal,
}) => {
  return (
    <>
      <GridItem>
        <div
          style={{ borderColor: avg_color, backgroundColor: avg_color }}
          className={css.thumb}
          onClick={() => openModal(urls.regular, alt)}
        >
          <img src={urls.small} alt={alt} />
        </div>
      </GridItem>
    </>
  );
};
