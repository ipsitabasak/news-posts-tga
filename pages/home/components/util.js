export const isClient = () => {
  return typeof window !== 'undefined';
}

export const getUpVoteCount = objectID => {
  const upvoteCountList = isClient() && window.localStorage.getItem('upVoteCount') || '';
  const upVoteCount = upvoteCountList.split(objectID);
  let count = 0;
  if(upVoteCount.length > 1 && upVoteCount[1][0] === '&') {
    count = upVoteCount[1].split('|')[0].replace('&', '');
  }
  return count;
}

export const updateUpVoteCount = (objectId, newCount) => {
  const upVoteCountList = isClient() && window.localStorage.getItem('upVoteCount');
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