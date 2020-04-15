import React from 'react';
import Table from '../pages/home/components/table';
import renderer from 'react-test-renderer';

describe('table component', () => {
  it('works correctly', () => {
    const component = renderer.create(
      <Table hits={[]} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
}); 