import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isClient, { getUpVoteCount, updateUpVoteCount, getAllHiddenItems, isHiddenItem, updateHiddenItems } from '../../util';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoteCount: 0,
      isHidden: false
    };
  }

  onClickHide = e => {
    updateHiddenItems(e.target && e.target.id);
    this.setState({ isHidden: true });
  }

  handleUpvote = e => {
    const { upvoteCount } = this.state;
    const objectId = e.target && e.target.id && e.target.id.replace('vote_', '');
    updateUpVoteCount(objectId, upvoteCount + 1);
    this.setState({ upvoteCount: upvoteCount + 1 });
  };

  componentDidMount() {
    const { hit = {} } = this.props;
    const { objectID } = hit;
    const isHidden = isHiddenItem(objectID);
    const upvoteCount = parseInt(getUpVoteCount(objectID));
    this.setState({isHidden, upvoteCount});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  render() {
    const { hit = {} } = this.props;
    const { num_comments, title, created_at, url, author, objectID, story_title } = hit;
    const { isHidden, upvoteCount } = this.state;
    let upvoteRemainder = (!isNaN(upvoteCount) && Math.floor(upvoteCount/25)) || 0;
    upvoteRemainder = upvoteRemainder > 4 ? '4': upvoteRemainder;
    const upvoteCountClass = `countcolor${upvoteRemainder}`;
    let differenceHrs;
    const displayUrl = url && url.split('://')[1] && url.split('://')[1].split('/')[0];
    const withoutWWW = displayUrl && displayUrl.replace('www.', '') || '';
    try {
      const currentTime = new Date();
      const d = new Date(created_at);
      const currentDate = new Date();
      const timeInHours = parseInt((currentDate - d)/(60 * 60 * 1000));
      differenceHrs = timeInHours ? `${timeInHours} hours ago`: '';
    } catch(e) {
      differenceHrs = '';
    }
    return (
      <div className="small-font flex-wrapper">
        <span className="comment-count">{isHidden ? '-' : num_comments || 0}</span>
        <div className={isHidden ? "upvote-container upvote-count-only":"upvote-container"}>
          <span className={upvoteCountClass}>{this.state.upvoteCount}</span>
          {!isHidden && <button className="hide-button" onClick={this.handleUpvote}><div className="up-arrow" id={`vote_${objectID}`}></div></button>}
        </div>
        <div className="details">
          <span className="big-font"> {title || story_title} </span>
          <a className="gray-text" href={url}>{withoutWWW ? `(${withoutWWW})` : ''}</a>
          <span className="gray-text"> by </span>
          <span>{author}</span>
          <span className="gray-text small-font"> {differenceHrs} </span>
          <button id={objectID} className="hide-button small-font" onClick={this.onClickHide} >{isHidden ? '[]' : '[ hide ]'}</button>
        </div>
        <style jsx>{`
          .flex-wrapper {
            display: flex;
          }
          .comment-count {
            min-width: 40px;
            display: inline-block;
            text-align: right;
            padding-top: 3px;
          }
          @media only screen and (min-width: 768px) {
            .comment-count {
              min-width: 60px;
            }
          }
          @media only screen and (min-width: 1024px) {
            .comment-count {
              min-width: 80px;
            }
          }

          .up-arrow {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 6px solid #999999;
            width: 0;
            height: 0;
            display: inline-block;
          }
          .upvote-container {
            display: inline-block;
            min-width: 50px;
            text-align: right;
          }
          @media only screen and (min-width: 768px) {
            .upvote-container {
              min-width: 60px;
            }
          }
          @media only screen and (min-width: 1024px) {
            .upvote-container {
              min-width: 80px;
            }
          }

          .upvote-count-only {
            min-width: 28px;
            margin-right: 22px;
          }
          @media only screen and (min-width: 768px) {
            .upvote-count-only {
              min-width: 38px;
            }
          }
          @media only screen and (min-width: 1024px) {
            .upvote-count-only {
              min-width: 58px;
            }
          }
          .hide-button {
            background: none;
            border: none;
          }
          .details {
          }
          .gray-text {
            color: #8E8B89;
          }
          .small-font {
            font-size: 10px;
          }
          .big-font {
            font-size: 12px;
          }
          .countcolor0 {
            color: #1C0000;
          }
          .countcolor1 {
            color: #1C0000;
          }
          .countcolor2 {
            color: #731E00;
          }
          .countcolor3 {
            color: #AB4401;
          }
          .countcolor4 {
            color: #FF6502;
          }
        `}</style>
      </div>
      
    );
  }
}

Cell.propTypes = {
  hit: PropTypes.shape({}).isRequired
}

export default Cell;