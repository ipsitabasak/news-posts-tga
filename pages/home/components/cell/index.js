import React, { Component } from 'react';

function isClient() {
  return typeof window !== 'undefined';
}

const getAllHiddenItems = () => {
  const hiddenIds = isClient() && window.localStorage.getItem('hiddenRowIds') || '';
  return hiddenIds.split('|');
}

class Cell extends Component {
  isHiddenItem = currentObjId => {
    const allHiddenItems = getAllHiddenItems() || [];
    if(allHiddenItems.indexOf(currentObjId) === -1) {
      return false;
    }
    return true;
  };

  updateHiddenItems = newItem => {
    const hiddenIds = isClient() && window.localStorage.getItem('hiddenRowIds');
    const newList = hiddenIds ? `${hiddenIds}|${newItem}` : newItem;
    isClient() && window.localStorage.setItem('hiddenRowIds', newList);
  }

  onClickHide = e => {
    this.updateHiddenItems(e.target && e.target.id);
    this.setState({ hidden: true });
  }

  render() {
    const { hit = {} } = this.props;
    const { num_comments, title, created_at, url, author, objectID } = hit;
    const isHidden = this.isHiddenItem(objectID);
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
        <span> {title}</span>
        <span> ({withoutWWW})</span>
        <span> by {author}</span>
        <span> {differenceHrs} </span>
        <button id={objectID} onClick={this.onClickHide} >{isHidden ? '[]' : '[hide]'}</button>
      </div>
    );
  }
}

export default Cell;
