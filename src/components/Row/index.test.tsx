/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import Row from '.';

describe('Row component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Row />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});