import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import fetch from 'node-fetch';
import isEqual from 'lodash/isEqual';
import Table from '../table';
import isClient from '../../util';

const CONSTANT_API_URL = {
  '/top': 'https://hn.algolia.com/api/v1/search?hitsPerPage=30&page=',
  '/': 'https://hn.algolia.com/api/v1/search?hitsPerPage=40&page=',
  '/new': 'https://hn.algolia.com/api/v1/search_by_date?hitsPerPage=30&page='
};

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      page: props.page,
      hits: null,
      url: CONSTANT_API_URL[props.type]
    };
  }

  getAPIData = (newUrl, newPage, type) => {
    fetch(`${newUrl}${newPage}`)
      .then(res => res.json().then(response => {
        this.setState({
          hits: response.hits,
          page: newPage,
          url: newUrl,
          type: type
        });
      })
    )
  }

  static async getInitialProps(initialProps) {
    const { req, res } = initialProps;
    const reqUrl = (req && req.url);
    if(!isClient() && reqUrl) {
      // comment added just for fun
      // comment fun
      const apiUrl = `${CONSTANT_API_URL[reqUrl] || CONSTANT_API_URL['/']}0`;
      const ApiResponse = await fetch(apiUrl);
      const response = await ApiResponse.json();
      return {
        initialHits: response.hits,
        type: reqUrl,
        page: 0,
        hits: null
      };
    } else {
      return {
        initialProps
      };
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // hhhh
    if (isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { initialProps: { pathname } = {} } = this.props;
    const { url } = this.state;
    if(pathname && (url !== CONSTANT_API_URL[pathname])) {
      this.getAPIData(CONSTANT_API_URL[pathname], 0, pathname);  
    }
  }

  onMoreClick = () => {
    const { url, page, type } = this.state;
    this.getAPIData(url, page + 1, type);
  };

  render() {
    const { initialHits } = this.props;
    const { page, hits, type } = this.state;
    return (
      <>
        <Head>
          <title>{type} page | My TGA Assignment</title>
        </Head>
        <div className="App">
          <h1 style={{textAlign: 'center'}}>Hacker News</h1>
          <Table
            hits={hits || initialHits}
            onMoreClick={this.onMoreClick}
            pageNumber={page}
            type={type}
          />
        </div>
      </>
    );
  }
}


Wrapper.propTypes = {
  initialProps: PropTypes.shape({}),
  initialHits: PropTypes.array
};

Wrapper.defaultProps = {
  initialProps: null,
  initialHits: []
};

export default withRouter(Wrapper);
