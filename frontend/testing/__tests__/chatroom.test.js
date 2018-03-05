import React from 'react';
import Chatroom from '../../components/chatroom/chatroom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Chatroom />', () => {
    it('renders 1 Chatroom component', () => {
        const component = shallow(<Chatroom chatroomActive={1}/>);
        expect(component).toHaveLength(1);
    });
});