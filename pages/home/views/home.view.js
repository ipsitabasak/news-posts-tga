import React, { Component } from 'react';
import fetch from 'node-fetch';
import Table from '../components/table';

const Home = props => {
  render() {
    const { hits } = props;
    return (
      <div className="App">
       <Table hits={hits} />
      </div>
    );
  }
}

export default Home;
