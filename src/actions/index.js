import config from '../env/config';

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export function requestPhotos() {
  return {
    type: REQUEST_PHOTOS
  }
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export function receivePhotos(json) {
  return {
    type: RECEIVE_PHOTOS,
    photos: json
  }
}

export function fetchPhotos() {
  return function(dispatch) {
    dispatch(requestPhotos());
    return fetch(`${config.backend.url}/photo`).then(
      response => response.json(),
      error => console.log('error fetching photos')
    ).then(json => {
      dispatch(receivePhotos(json));
    });
  }
}
