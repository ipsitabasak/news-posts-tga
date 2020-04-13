import React, { Component } from 'react';
import Cell from '../cell';

const Row = props => {
  const { hits, onMoreClick, onTopClick, onNewClick } = props;
  let cellValue = '';
  const styles = {
    maxWidth: '1400px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'left'
  }
  const style1 = {
    ...styles,
    backgroundColor: '#e8e2e1'
  };
  const style2 = {
    ...styles,
    backgroundColor: '#e3c4b6'
  };
  const rowHeader = (
    <li key='rowHeader' className="header" style={{...styles, backgroundColor: 'orange'}}>
      <a>Y </a>
      <button onClick={onTopClick}>top</button>
      <button onClick={onNewClick}>new</button>
  </li>);
  const rows = hits.map((hit, index) => {
    const rowStyle = index%2 ? style1: style2;
    return (
      <li style={rowStyle} key={`row_${index}`} >
        <Cell hit={ hit } />
      </li>
    )
  });

  const moreFooter = (
    <li key='moreFooter' className="footer" style={{...styles, backgroundColor: 'orange'}}>
      <button onClick={onMoreClick}>MORE</button>
  </li>);

  return [rowHeader, rows, moreFooter];
}

export default Row;
