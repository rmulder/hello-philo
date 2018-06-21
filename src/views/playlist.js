import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as playListActions from '../action-creators/playlist';
import styles from '../styles/playlist.scss';

function handleDelete(props, ep) {
  props.deletePodcastEpisodeFromPlaylist(ep);
}

function showLiveIcon(player, ep) {
  return player.title !== ep.title ? '' : <LiveIcon classNames={styles.icon} />;
}

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

  const formattedEps = episodes.map(episode => thisPlaylist[episode]);

  const episodeListCSS = isPlaylistEmpty ? styles.episodeListItemEmpty : styles.episodeListItem;

  const handlePlayEpisode = (ep) => {
    if (!isPlaylistEmpty) {
      loadPodcastEpisode(ep);
    }
  };

  const displayPodcast = (ep) => (
    ep.podcastId === '' ? '' : <Link to={`/${ep.podcastId}`}>{ep.podcastId}</Link>
  );

  const displayClearIcon = isPlaylistEmpty ? '' : <ClearIcon classNames={styles.icon} />;

  return (
    <div className={styles.episodeListContainer}>
      <h1 className={styles.episodePlaylistTitle}>Playlist</h1>
      <ol className={styles.episodeList}>
        {
          formattedEps.map((ep, i) => (
            <li key={`${i}-${ep.title}`} className={episodeListCSS} title={ep.title}>
              <div>
                <div className={styles.iconContainer} onClick={() => handleDelete(props, ep)}>
                  {displayClearIcon}
                </div>
                <div className={styles.episodeLink} onClick={() => handlePlayEpisode(ep)}>
                  {ep.title}
                  {showLiveIcon(player, ep)}
                  <div className={styles.episodePodcast}>{displayPodcast(ep)}</div>
                </div>
              </div>
            </li>
          ))
        }
      </ol>
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
