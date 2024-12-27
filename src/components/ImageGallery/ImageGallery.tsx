import { ImageCard } from "../ImageCard/ImageCard";
import { Grid } from "../Grid/Grid";
import { Image } from "../../types/responseTypes";

type Props = {
  images: Image[];
  openModal: (src: string, alt: string) => void;
};

const ImageGallery: React.FC<Props> = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(({ id, urls, alt_description, color }: Image) => (
        <ImageCard
          key={id}
          urls={urls}
          alt={alt_description}
          avg_color={color}
          openModal={openModal}
        />
      ))}
    </Grid>
  );
};

export default ImageGallery;
