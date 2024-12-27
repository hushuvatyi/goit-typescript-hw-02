export interface ImageUrls {
  regular: string;
  small: string;
}

export interface Image {
  id: string;
  alt_description: string;
  urls: ImageUrls;
  color: string;
}
