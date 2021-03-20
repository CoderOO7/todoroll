import { fetchWithTimeout } from '../../utility/api';
import { getViewportDimensions } from '../../utility/helpers';
import {
  UNSPLASH_API_ENDPOINT,
  UNSPLASH_API_ACCESS_KEY,
  UNSPLASH_API_TIMOUT,
  TODOROLL_OFFICIAL_COLLECTION_ID
} from './constants';

const unsplash = (() => {
  async function _fetchImageMeta() {
    const headers = new Headers();
    headers.set('Authorization', `Client-ID ${UNSPLASH_API_ACCESS_KEY}`);

    const params = new URLSearchParams({
      collections: String(TODOROLL_OFFICIAL_COLLECTION_ID)
    });

    const url = `${UNSPLASH_API_ENDPOINT}/photos/random`;
    const res = await fetchWithTimeout(
      `${url}?${params}`,
      { headers },
      UNSPLASH_API_TIMOUT
    );

    return res.json();
  }

  async function _fetchImageData(url) {
    const { width } = getViewportDimensions();
    const quality = 90;

    const params = new URLSearchParams({
      q: String(quality),
      w: String(width)
    });

    const res = await fetchWithTimeout(url + params, {}, UNSPLASH_API_TIMOUT);
    const data = res.blob();
    return data;
  }

  async function getImage() {
    const res = await _fetchImageMeta();
    const imageData = await _fetchImageData(res.urls.raw);
    const url = URL.createObjectURL(imageData);
    return url;
  }

  return { getImage };
})();

export { unsplash };
