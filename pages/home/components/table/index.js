import React, { Component } from 'react';
import Row from '../row';

const Table = props => {
  const { hits, onMoreClick, onNewClick, onTopClick, pageNumber } = props;
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <ul style={{backgroundColor: '#F6F6EF', maxWidth: '1440px', padding: '0'}}>
      <Row hits={hits} onMoreClick={onMoreClick} onNewClick={onNewClick} onTopClick={onTopClick} />
    </ul>
    </div>
  );
}

export default Table;
