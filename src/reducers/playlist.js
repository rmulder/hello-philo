import { ADD_PLAYLIST_EPISODE, DELETE_PLAYLIST_EPISODE } from '../actions';
import { createReducer } from '../utils';

const addEpisode = (state, { payload }) => ({ ...state, [payload.title]: payload });

const deleteEpisode = (state, { payload }) => {
  // Get an array of the current state's entries
  const tmpEntries = Object.entries({ ...state });
  // Filter the array to remove the current episode
  // Then convert back to an object
  const tmpState = tmpEntries
    .filter(episode => episode[0] !== payload.title)
    .reduce((obj, episode) => {
      const newObj = obj;
      newObj[episode[0]] = episode[1];
      return newObj;
    }, {});
  return {
    ...tmpState,
  };
};

const handlers = {
  [ADD_PLAYLIST_EPISODE]: addEpisode,
  [DELETE_PLAYLIST_EPISODE]: deleteEpisode,
};

export default createReducer({}, handlers);
