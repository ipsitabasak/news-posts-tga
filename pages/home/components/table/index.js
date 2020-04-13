import React, { Component } from 'react';
import Row from '../row';

const Table = props => {
  const { hits, onMoreClick, onNewClick, onTopClick, pageNumber } = props;
  return (
    <div style={{textAlign: 'center'}}>
      <Row hits={hits} onMoreClick={onMoreClick} onNewClick={onNewClick} onTopClick={onTopClick} />
    </div>
  );
}

export default Table;
