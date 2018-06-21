import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as playerActions from '../action-creators/playlist';
import { isEmpty } from '../utils';
import styles from '../styles/player';

function Player(props) {
  const { player: { title = '', src }, playlist, loadPodcastEpisode,
          routing: {
            locationBeforeTransitions: {
              pathname,
            },
          } } = props;

  const isPlaylistEmpty = isEmpty(playlist);

  const isPlaylistPage = pathname.includes('/playlist');

  const aPlaylistTitles = Object.keys(playlist);

  const getNextPlaylistTitle = () => {
    const nextIndex = aPlaylistTitles.findIndex((element) => element === title) + 1;
    const index = nextIndex === aPlaylistTitles.length ? 0 : nextIndex;
    return playlist[aPlaylistTitles[index]];
  };

  const handleEpisodeEnd = () => {
    if (!isPlaylistEmpty) {
      loadPodcastEpisode(getNextPlaylistTitle());
    }
  };

  const showPlaylistLink = isPlaylistPage ? '' : <Link to={'/playlist'}>Playlist</Link>;

  const showAudio = src ? <audio src={src} controls autoPlay onEnded={handleEpisodeEnd} /> : null;

  return (
    <div className={styles.playerContainer}>
      <div className={styles.player}>
        {showAudio}
        <div>{showPlaylistLink}</div>
      </div>
    </div>
  );
}
Player.propTypes = {
  title: PropTypes.string,
  podcastTitle: PropTypes.string,
  src: PropTypes.string,
  player: PropTypes.object,
  playlist: PropTypes.object,
  routing: PropTypes.object,
  loadPodcastEpisode: PropTypes.func,
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(playerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
