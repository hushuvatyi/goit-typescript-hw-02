import axios from "axios";

const ACCESS_KEY = "hB493Cs6NUmVxN-E_7WNUD3xrv1IqKdNZJCNnxC_AXk";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
  "Accept-Version": "v1",
};
axios.defaults.params = {
  per_page: 8,
  orientation: "landscape",
};

export const getPhotos = async (query: string, page: number) => {
  const { data } = await axios.get("/search/photos", {
    params: {
      query,
      page,
    },
  });

  return data;
};
