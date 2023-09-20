import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';


it('should render without crashing', () => {
    render(<Card caption="testing image 1" src="test1.com" currNum={1} totalNum={3} />);
});

it('should match the snapshot', () => {
    const { asFragment } = render(<Card caption="testing image 1" src="test1.com" currNum={1} totalNum={3} />);
    console.log(asFragment());
    expect(asFragment()).toMatchSnapshot();
});