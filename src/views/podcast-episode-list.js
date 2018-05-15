import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as podcastActions from '../action-creators/podcasts';
import styles from '../styles/podcast-episode-list';

function togglePlaylistAction(ep, playlist, props) {
  if (Object.keys(playlist).includes(ep.title)) {
    props.deletePlaylistEpisode(ep);
  } else {
    props.addPlaylistEpisode(ep);
  }
}

function toggleActionIcon(ep, playlist) {
  const episodes = Object.keys(playlist);
  return episodes.includes(ep.title) ? '-' : '+';
}

function PodcastEpisodeList(props) {
  const { title: [podcastTitle = ''] = [], item: episodes = [], routeParams, 
      loadPodcastEpisode, playlist, player } = props;

  const formattedEps = episodes.map(({ enclosure, title: [title] }) => ({
    podcastTitle,
    title,
    src: enclosure[0].$.url,
    podcastId: routeParams.podcastId,
  }));

  return (
    <div className={styles.episodeListContainer}>
      <h1 className={styles.episodePodcastTitle}>{podcastTitle}</h1>
      <ul className={styles.episodeList}>
        {
          formattedEps.map((ep, i) => (
            <li key={`${i}-${ep.title}`} className={styles.episodeListItem} alt={ep.title}>
              <div className={styles.episodeLink}>
                <div
                  className={styles.iconContainer}
                  onClick={() => togglePlaylistAction(ep, playlist, props)}
                >
                  {toggleActionIcon(ep, playlist)}
                </div>
                <div onClick={() => loadPodcastEpisode(ep)}>
                  {ep.title}
                </div>
              </div>
            </li>
          ))
        }
      </ul>
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
