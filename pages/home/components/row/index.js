import React, { Component } from 'react';
import Cell from '../cell';

const Row = props => {
  const { hits, onMoreClick, onTopClick, onNewClick } = props;
  let cellValue = '';
  const styles = {
    display: 'inline-block',
    width: '100%',
    textAlign: 'left'
  }

  const buttonStyle = {
    background: 'none',
    border: 'none'
  };

  const style1 = {
    ...styles,
    backgroundColor: '#E6E6DF'
  };
  const style2 = {
    ...styles,
    backgroundColor: '#F6F6EF'
  };
  const rowHeader = (
    <li key='rowHeader' className="header" style={{...styles, height: '30px', marginBottom: '10px', backgroundColor: '#ff6600'}}>
      <a>Y </a>
      <button onClick={onTopClick} style={buttonStyle}>top</button>
      <button onClick={onNewClick} style={buttonStyle}>new</button>
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
    <li key='moreFooter' className="footer" style={{...styles, height: '30px'}}>
      <button onClick={onMoreClick}>MORE</button>
  </li>);

  return [rowHeader, rows, moreFooter];
}

export default Row;
