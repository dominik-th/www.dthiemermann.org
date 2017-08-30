import storage from '../env/storage.json';
import { SHOW_COVER_IMAGE } from '../actions';

const initialState = {
  currentImage: storage.images[0],
  prevImage: storage.images[0],
  nextImage: storage.images[0]
};

export default function cover(state = initialState, action) {
  switch (action.type) {
    case SHOW_COVER_IMAGE:
      return {
        ...state,
        currentImage: action.currentImage,
        prevImage: action.prevImage,
        nextImage: action.nextImage
      };

    default:
      return state;
  }
};
