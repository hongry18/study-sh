import React from 'react';
import Home from '#/containers/Home';
import { shallow, mount, render } from 'enzyme';

describe('Home container', () => {

    console.log("TEST")
    it('Home contaner render', () => {
        console.log("TEST")
        const wrapper = shallow(<Home/>);
        expect(wrapper).to.be(null);
    });
});