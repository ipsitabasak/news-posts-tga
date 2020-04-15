import React, { Component } from 'react';
import fetch from 'node-fetch';
import isEqual from 'lodash/isEqual';
import Table from '../home/components/table';

class HackerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      hits: null,
      url: 'https://hn.algolia.com/api/v1/search?hitsPerPage=30&page='
    };
  }

  static async fetchData (url) {
    const ApiResponse = await fetch(url);
    const response = await ApiResponse.json();

    return {
      initialHits: response.hits
    };
  }

  static getInitialProps({ req, res }) {
    return this.fetchData(`https://hn.algolia.com/api/v1/search?hitsPerPage=30&page=0`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  getAPIData = (newUrl, newPage) => {
    fetch(`${newUrl}${newPage}`)
      .then(res => res.json().then(response => {
        this.setState({
          hits: response.hits,
          page: newPage,
          url: newUrl
        });
      })
    )
  }

  onMoreClick = () => {
    const { url, page } = this.state;
    this.getAPIData(url, page + 1);
  };

  onNewClick = () => {
    this.getAPIData(`https://hn.algolia.com/api/v1/search_by_date?hitsPerPage=30&page=`, 0);
  };

  onTopClick = () => {
    this.getAPIData(`https://hn.algolia.com/api/v1/search?hitsPerPage=30&page=`, 0);
  };

  render() {
    const { initialHits } = this.props;
    const { page, hits } = this.state;
    return (
      <div className="App">
        <Table
          hits={hits || initialHits}
          onMoreClick={this.onMoreClick}
          onNewClick={this.onNewClick}
          onTopClick={this.onTopClick}
          pageNumber={page}
        />
      </div>
    );
  }
}

export default HackerApp;
