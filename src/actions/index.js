import _ from 'lodash';
import storage from '../env/storage.json';

export const SHOW_COVER_IMAGE = 'SHOW_COVER_IMAGE';

export function loadCoverImage(id) {
  const randomIndex = _.random(0, storage.images.length - 1);
  const paramIndex = _.findIndex(storage.images, ['id', id]);
  const currentIndex = paramIndex === -1 ? randomIndex : paramIndex;

  const prevIndex = (currentIndex - 1) < 0 ? storage.images.length - 1 : currentIndex -1;
  const nextIndex = (currentIndex + 1) % storage.images.length;

  return {
    type: SHOW_COVER_IMAGE,
    currentImage: storage.images[currentIndex],
    prevImage: storage.images[prevIndex],
    nextImage: storage.images[nextIndex]
  };
}
