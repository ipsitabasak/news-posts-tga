import React, { Component } from 'react';

function isClient() {
  return typeof window !== 'undefined';
}

const getAllHiddenItems = () => {
  const hiddenIds = isClient() && window.localStorage.getItem('hiddenRowIds') || '';
  return hiddenIds.split('|');
}

const buttonStyle = {
  background: 'none',
  border: 'none'
};

const arrowUpStyle = {
  'borderLeft': '5px solid transparent',
  'borderRight': '5px solid transparent',
  'borderBottom': '10px solid black',
  'width': '-11px',
  'height': 0,
  'display': 'inline-block'
};

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoteCount: 0,
      isHidden: false
    };
  }

  isHiddenItem = currentObjId => {
    const allHiddenItems = getAllHiddenItems() || [];
    if(allHiddenItems.indexOf(currentObjId) === -1) {
      return false;
    }
    return true;
  };


  getUpVoteCount = (objectID) => {
    const upvoteCountList = isClient() && window.localStorage.getItem('upVoteCount') || '';
    const upVoteCount = upvoteCountList.split(objectID);
    let count = 0;
    if(upVoteCount.length > 1 && upVoteCount[1][0] === '&') {
      count = upVoteCount[1].split('|')[0].replace('&', '');
    }
    return count;
  }

  updateHiddenItems = newItem => {
    const hiddenIds = isClient() && window.localStorage.getItem('hiddenRowIds');
    const newList = hiddenIds ? `${hiddenIds}|${newItem}` : newItem;
    isClient() && window.localStorage.setItem('hiddenRowIds', newList);
  }

  updateUpVoteCount = (objectId, newCount) => {
    const upVoteCountList = isClient() && window.localStorage.getItem('upVoteCount');
    const upVoteCount = this.getUpVoteCount(objectId);
    console.log('upVoteCount', upVoteCount);
    console.log('newCount', newCount);
    let updatedUpVoteCountList;
    if(upVoteCount) {
      updatedUpVoteCountList = upVoteCountList.replace(`${objectId}&${upVoteCount}`, `${objectId}&${newCount}`);
    } else {
      updatedUpVoteCountList = `${upVoteCountList}|${objectId}&${newCount}`;
    }
    isClient() && window.localStorage.setItem('upVoteCount', updatedUpVoteCountList);
  }

  onClickHide = e => {
    this.updateHiddenItems(e.target && e.target.id);
    this.setState({ isHidden: true });
  }

  handleUpvote = e => {
    const { upvoteCount } = this.state;
    const objectId = e.target && e.target.id && e.target.id.replace('vote_', '');
    this.updateUpVoteCount(objectId, upvoteCount + 1);
    this.setState({ upvoteCount: upvoteCount + 1 });
  };

  componentDidMount() {
    const { hit = {} } = this.props;
    const { objectID } = hit;
    const isHidden = this.isHiddenItem(objectID);
    const upvoteCount = parseInt(this.getUpVoteCount(objectID));
    this.setState({isHidden, upvoteCount});
  }

  render() {
    const { hit = {} } = this.props;
    const { num_comments, title, created_at, url, author, objectID } = hit;
    const { isHidden, upvoteCount } = this.state;
    let differenceHrs;
    const displayUrl = url && url.split('://')[1] && url.split('://')[1].split('/')[0];
    const withoutWWW = displayUrl && displayUrl.replace('www.', '');
    try {
      const currentTime = new Date();
      const d = new Date(created_at);
      const currentDate = new Date();
      differenceHrs = `${parseInt((currentDate - d)/(60 * 60 * 1000))} hours ago`;
    } catch(e) {
      differenceHrs = '';
    }
    return (
      <div>
        <span style={{width: '100px', display: 'inline-block'}}>{isHidden ? '-' : num_comments || 0}</span>
        {!isHidden && <div style={arrowUpStyle} id={`vote_${objectID}`} onClick={this.handleUpvote}></div>}
        <span>{this.state.upvoteCount}</span>
        <span> {title}</span>
        <span> ({withoutWWW})</span>
        <span> by {author}</span>
        <span> {differenceHrs} </span>
        <button id={objectID} style={buttonStyle} onClick={this.onClickHide} >{isHidden ? '[]' : '[hide]'}</button>
      </div>
    );
  }
}

export default Cell;
