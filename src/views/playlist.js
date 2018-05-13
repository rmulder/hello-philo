import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from '../action-creators/playlist';
import styles from '../styles/playlist.scss';

function PlayList(props) {
  const defaultPlaylist = {
    'There are currently no episodes in the playlist': {
      podcastId: '',
      podcastTitle: '',
      src: '',
      title: 'There are no episodes in the playlist',
    },
  };

  const { playlist, loadPodcastEpisode, player } = props;
  const thisPlaylist = (Object.keys(playlist).length === 0) ? defaultPlaylist : playlist;
  const episodes = Object.keys(thisPlaylist);

  return (
    <div className={styles.episodeListContainer}>
      <h1 className={styles.episodePlaylistTitle}>Playlist</h1>
    </div>
  );
}

PlayList.propTypes = {
  playlist: PropTypes.object,
  player: PropTypes.object,
  loadPodcastEpisode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(playListActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayList);
