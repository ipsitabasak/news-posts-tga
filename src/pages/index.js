import React, { Component } from 'react';

class abcd extends Component {
  static async getInitialProps({ req, res }) {
    console.log('req', req.url);
    return {};
  }
  render() {
      return <h1>Hi there</h1>;
  }
};

export default abcd;