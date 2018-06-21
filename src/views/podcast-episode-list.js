import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as podcastActions from '../action-creators/podcasts';
import { SaveIcon, LiveIcon } from './icons';
import styles from '../styles/podcast-episode-list';


function handleAdd(props, ep) {
  props.addPodcastEpisodeToPlaylist(ep);
}

function showAddIcon(playlist, ep) {
  const episodes = Object.keys(playlist);
  return episodes.includes(ep.title) ? '' : <SaveIcon classNames={styles.icon} />;
}

function showLiveIcon(player, ep) {
  return player.title !== ep.title ? '' : <LiveIcon classNames={styles.icon} />;
}

function PodcastEpisodeList(props) {
  const { title: [podcastTitle = ''] = [], item: episodes = [],
    routeParams, loadPodcastEpisode, playlist, player } = props;

  const formattedEps = episodes.map(({ enclosure, title: [title] }) => ({
    podcastTitle,
    title,
    src: enclosure[0].$.url,
    podcastId: routeParams.podcastId,
  }));

  return (
    <div className={styles.episodeListContainer}>
      <h1 className={styles.episodePodcastTitle}>{podcastTitle}</h1>
      <ol className={styles.episodeList}>
        {
          formattedEps.map((ep, i) => (
            <li key={`${i}-${ep.title}`} className={styles.episodeListItem}>
              <div className={styles.episodeLink}>
                <div className={styles.iconContainer} onClick={() => handleAdd(props, ep)}>
                  {showAddIcon(playlist, ep)}
                </div>
                <div onClick={() => loadPodcastEpisode(ep)}>
                  {ep.title}
                  {showLiveIcon(player, ep)}
                </div>
              </div>
            </li>
          ))
        }
      </ol>
    </div>
  );
}

PodcastEpisodeList.propTypes = {
  title: PropTypes.array,
  item: PropTypes.array,
  routeParams: PropTypes.object,
  playlist: PropTypes.object,
  player: PropTypes.object,
  loadPodcastEpisode: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { routeParams }) => ({
  ...state, ...state.podcasts[routeParams.podcastId] || {},
});

const mapDispatchToProps = (dispatch) => bindActionCreators(podcastActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastEpisodeList);
