import { getPhotos } from "./apiService/photos";
import {
  LoadMoreBtn,
  SearchBar,
  Loader,
  ImageGallery,
  Text,
  Section,
  ImageModal,
} from "components";

import { useEffect, useRef, useState } from "react";
import { Container } from "./components";
import { Toaster } from "react-hot-toast";

export const App = () => {
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [altDescription, setAltDescription] = useState("");

  const ref = useRef();

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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalImage(src);
    setAltDescription(alt);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage("");
    setAltDescription("");
  };

  useEffect(() => {
    if (page === 1) return;

    ref.current.scrollIntoView({ behavior: "auto", block: "end" });
  }, [page, images]);

  return (
    <Section>
      <Container ref={ref}>
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
        {error && (
          <Text textAlign="center">❌ Something went wrong - {error}</Text>
        )}
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
      </Container>
    </Section>
  );
};

export default App;
