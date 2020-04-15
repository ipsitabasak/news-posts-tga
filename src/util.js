import React from 'react';

const isClient = () => {
  return typeof window !== 'undefined';
}

export const getUpVoteCount = objectID => {
  const upvoteCountList = isClient() && window.localStorage && window.localStorage.getItem('upVoteCount') || '';
  const upVoteCount = upvoteCountList.split(objectID);
  let count = 0;
  if(upVoteCount.length > 1 && upVoteCount[1][0] === '&') {
    count = upVoteCount[1].split('|')[0].replace('&', '');
  }
  return count;
}

export const updateUpVoteCount = (objectId, newCount) => {
  const upVoteCountList = isClient() && window.localStorage && window.localStorage.getItem('upVoteCount');
  const upVoteCount = getUpVoteCount(objectId);
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

export const getAllHiddenItems = () => {
  const hiddenIds = isClient() && window.localStorage.getItem('hiddenRowIds') || '';
  return hiddenIds.split('|');
}


export const isHiddenItem = currentObjId => {
  const allHiddenItems = getAllHiddenItems() || [];
  if(allHiddenItems.indexOf(currentObjId) === -1) {
    return false;
  }
  return true;
};

export const updateHiddenItems = newItem => {
  const hiddenIds = isClient() && window.localStorage && window.localStorage.getItem('hiddenRowIds');
  const newList = hiddenIds ? `${hiddenIds}|${newItem}` : newItem;
  isClient() && window.localStorage.setItem('hiddenRowIds', newList);
};

export default isClient;