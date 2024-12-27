import { getPhotos } from "./apiService/photos";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Text from "./components/Text/Text";
import Section from "./components/Section/Section";
import ImageModal from "./components/ImageModal/ImageModal";
import Container from "./components/Container/Container";
import { Image } from "./types/responseTypes";

import { useEffect, useRef, useState } from "react";

import { Toaster } from "react-hot-toast";

export const App = () => {
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState("");
  const [altDescription, setAltDescription] = useState("");

  const ref = useRef<React.LegacyRef<HTMLDivElement> | undefined>();

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (!results.length) {
          return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError("Something went wrong - reload your page!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSubmit = (value: string): void => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError("");
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (src: string, alt: string): void => {
    setModalIsOpen(true);
    setModalImage(src);
    setAltDescription(alt);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setModalImage("");
    setAltDescription("");
  };

  return (
    <Section>
      <Container>
        <div>
          <SearchBar onSubmit={handleSubmit} />
          {images.length > 0 && (
            <ImageGallery images={images} openModal={openModal} />
          )}
          {!images.length && !isEmpty && (
            <Text textAlign="center">Let`s begin search 🔎</Text>
          )}
          {isVisible && !isLoading && images.length > 0 && (
            <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? "Loading..." : "Load More"}
            </LoadMoreBtn>
          )}

          {isLoading && <Loader />}
          {error && <Text textAlign="center">{error}</Text>}
          {isEmpty && (
            <Text textAlign="center">Sorry. There are no images ... 😭</Text>
          )}
          <ImageModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            src={modalImage}
            alt={altDescription}
          />
          <Toaster position="top-right" reverseOrder={true} />
        </div>
      </Container>
    </Section>
  );
};

export default App;
