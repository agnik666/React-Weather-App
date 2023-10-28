import { createApi } from "unsplash-js";

// setting up the API key for fetching random images from Unsplash
const API_KEY = "Z4cBNPk55PgfcuSVdoW2k7bumgghVZbxJrwphUzczeE";

const unsplash = createApi({
  accessKey: API_KEY,
});

export default async function backgroundImage(query) {
  try {
    const res = await unsplash.photos.getRandom({
      query: query,
      count: 1,
      orientation: "landscape",
    });

    const data = res.response[0].urls.full;

    return data;
  } catch (err) {
    alert(err.message);
  }
}
