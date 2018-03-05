import React from 'react';
import SignupLoginPage from '../../components/session/login_page';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<SignupLoginPage />', () => {
    it('renders 1 SignupLoginPage component', () => {
        const component = shallow(<SignupLoginPage errors={{}} />);
        expect(component).toHaveLength(1);
    });
});