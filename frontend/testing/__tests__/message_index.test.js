import React from 'react';
import MessagesIndex from '../../components/messages/message_index';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<MessagesIndex />', () => {

    let btn = document.createElement("button");

    it('renders 1 MessagesIndex component', () => {
        const component = mount(<MessagesIndex currentUser={1} 
                                                 chatroom={1} 
                                                 messages={[]}
                                                 submitBtn={btn}
                                                 currentList={[]}/>);
        expect(component).toHaveLength(1);
    });

    it('allows us to set props', () => {
        const wrapper = mount(<MessagesIndex currentUser={1} 
                                             chatroom={1} 
                                             messages={[]}
                                             submitBtn={btn}
                                             currentList={[]}/>);
        expect(wrapper.props().currentUser).toEqual(1);
        wrapper.setProps({ messages: ["hey!"] });
        expect(wrapper.props().messages).toEqual(["hey!"]);
    });

    it('it contains a message-list', () => {
        const component = mount((<MessagesIndex currentUser={1} 
                                                 chatroom={1} 
                                                 messages={[]}
                                                 submitBtn={btn}
                                                 currentList={[]}>
                                                    <div className="message-list"/>
                                                 </MessagesIndex>
                                                 
                                                 ));
        expect(component.find(".message-list").length).toEqual(1);
    });

});