import { REQUEST_PHOTOS, RECEIVE_PHOTOS } from '../actions';

const initialState = {
  loading: true,
  storage: null
};

export default function cover(state = initialState, action) {
  switch (action.type) {

    case REQUEST_PHOTOS:
      return Object.assign({}, state, {
        loading: true,
      });

    case RECEIVE_PHOTOS:
      return Object.assign({}, state, {
        loading: false,
        storage: action.photos
      });

    default:
      return state;

  }
};
