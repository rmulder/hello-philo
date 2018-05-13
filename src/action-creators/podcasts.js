import fetch from 'isomorphic-fetch';
import { ADD_PODCASTS, LOAD_PODCAST_EPISODE, ADD_PLAYLIST_EPISODE,
    DELETE_PLAYLIST_EPISODE } from '../actions';

const PODCAST_API_URL = '/api/podcasts';

export function addPodcasts(podcasts) {
  return {
    type: ADD_PODCASTS,
    payload: podcasts,
  };
}

export function getPodcasts() {
  return (dispatch) => {
    fetch(PODCAST_API_URL)
      .then(response => response.json())
      .then(podcasts => dispatch(addPodcasts(podcasts)));
  };
}

export function loadPodcastEpisode(episode) {
  return {
    type: LOAD_PODCAST_EPISODE,
    payload: episode,
  };
}

export function addPlaylistEpisode(episode) {
  return {
    type: ADD_PLAYLIST_EPISODE,
    payload: episode,
  };
}

export function deletePlaylistEpisode(episode) {
  return {
    type: DELETE_PLAYLIST_EPISODE,
    payload: episode,
  };
}
