import { DELETE_PLAYLIST_EPISODE, LOAD_PODCAST_EPISODE } from '../actions';

export function deletePlaylistEpisode(episode) {
  return {
    type: DELETE_PLAYLIST_EPISODE,
    payload: episode,
  };
}

export function loadPodcastEpisode(episode) {
  return {
    type: LOAD_PODCAST_EPISODE,
    payload: episode,
  };
}
