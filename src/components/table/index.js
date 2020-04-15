import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Row from '../row';

const selectStyle = {
  textDecoration: 'none',
  color: 'white',
  borderColor: 'white'
}

const nonSelectStyle = {
  textDecoration: 'none',
  color: 'black',
  borderColor: 'black'
}

const Table = props => {
  const { hits, onMoreClick, pageNumber, type } = props;
  return (
    <div className="container">
      <ul>
        <li key='rowHeader' className="header">
          <Link href='/'>
            <a className="title" style={type === '/' ? selectStyle: nonSelectStyle}>Y</a>
          </Link>
          <Link href='/top'>
            <a className="title-spacing" style={type === '/top' ? selectStyle: nonSelectStyle}>top</a>
          </Link>
          <span>|</span>
          <Link href='/new'>
            <a className="title-spacing" style={type === '/new' ? selectStyle: nonSelectStyle}>new</a>
          </Link>
        </li>
        <Row hits={hits} onMoreClick={onMoreClick} />
        <li key='moreFooter' className="footer">
          <button className="more-button" onClick={onMoreClick}>MORE</button>
        </li>
      </ul>
      <style jsx>{`
        .title {
          padding: 5px;
          display: inline-block;
          border: 1px solid white;
          margin: 3px 5px 0 5px;
          font-size: 10px;
        }
        .title-spacing {
          padding: 0 10px;
        }
        .container {
          display: flex;
          justify-content: center;
          font-family: Arial;
          letter-spacing: 0.2px;
        }
        ul {
          background-color: #F6F6EF;
          max-width: 1440px;
          padding: 0;
        }
        .header {
          display: inline-block;
          width: 100%;
          text-align: left;
          height: 30px;
          margin-bottom: 10px;
          background-color: #ff6600;
          font-size: 12px;
        }
        .footer {
          display: inline-block;
          width: 100%;
          text-align: left;
          height: 30px;
        }
        .more-button {
          background: none;
          border: none;
          margin-left: 120px;
        }
      `}</style>
    </div>
  );
}

Table.propTypes = {
  hits: PropTypes.array,
  onMoreClick: PropTypes.func.isRequired,
  pageNumber: PropTypes.number,
  type: PropTypes.string.isRequired
};

Table.defaultProps = {
  hits: [],
  disabled: '',
  fullWidth: true,
  type: 'button',
  customStyle: '',
  uniqueKey: '',
  noCurve: false,
  cta: null,
  active: false,
};


export default Table;
