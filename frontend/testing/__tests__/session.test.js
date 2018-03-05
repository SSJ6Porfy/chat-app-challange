import React from 'react';
import SignupLoginPage from '../../components/session/login_page';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<SignupLoginPage />', () => {

    it('allows us to set props', () => {
        const component = mount(<SignupLoginPage errors="Error!" />);
        expect(component.props().errors).toEqual("Error!");
        component.setProps({ errors: [] });
        expect(component.props().errors).toEqual([]);
    });

    it('renders 1 SignupLoginPage component', () => {
        const component = shallow(<SignupLoginPage errors={[]} />);
        expect(component).toHaveLength(1);
    });
});