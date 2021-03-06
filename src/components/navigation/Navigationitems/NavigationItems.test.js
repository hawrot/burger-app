import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import navigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
   let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<NavigationItems/>);
    });

    it('should render two  NavItem elements if not authenticated', () => {
        expect(wrapper.find(navigationItem)).toHaveLength(2);
    });
    it('should render three  NavItem elements if  authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(navigationItem)).toHaveLength(3);
    });
});
