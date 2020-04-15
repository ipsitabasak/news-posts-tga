import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell';

const Row = props => {
  const { hits, onMoreClick } = props;
  let cellValue = '';

  const rows = hits && hits.map((hit, index) => {
    const rowStyle = index%2 ? 'style1' : 'style2';
    return (
      <li className={rowStyle} key={`row_${hit && hit.objectID}`} >
        <Cell hit={ hit } />
        <style jsx>{`
          .style1 {
              display: inline-block;
              width: 100%;
              text-align: left;
              background-color: #E6E6DF;
            }
          }
          .style2 {
            display: inline-block;
            width: 100%;
            text-align: left;
            background-color: #F6F6EF;
          }
        `}</style>
      </li>
    )
  }) || [];
  return rows;
}


Row.propTypes = {
  hits: PropTypes.array.isRequired,
  onMoreClick: PropTypes.func.isRequired
}

export default Row;
