import React from 'react';
import Chatroom from '../../components/chatroom/chatroom';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Chatroom />', () => {
    it('has 2 message indexes', () => {
        const component = shallow(<Chatroom currentUser={1} />);
        expect(component.props().children.length).toEqual(2);
    });
    
    it('renders 1 Chatroom component', () => {
        const component = shallow(<Chatroom currentUser={1}/>);
        expect(component).toHaveLength(1);
    });

    
});