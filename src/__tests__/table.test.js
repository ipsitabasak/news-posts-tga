import React from 'react';
import Table from '../components/table';
import renderer from 'react-test-renderer';

describe('table component', () => {
  it('works correctly', () => {
    const component = renderer.create(
      <Table hits={[]} />,
    );
    let tree = component.toJSON();
  // again change
    expect(tree).toMatchSnapshot();
  });
}); 
