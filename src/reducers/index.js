import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import podcasts from './podcasts';
import player from './player';
import playlist from './playlist';

export default combineReducers({ routing, podcasts, player, playlist });
