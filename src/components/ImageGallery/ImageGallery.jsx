import { ImageCard } from "components";
import { Grid } from "../Grid/Grid";

export const ImageGallery = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(({ id, urls, alt_description, color }) => (
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
