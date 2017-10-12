import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from './Alert';

describe('<Alert />', () => {

    let wrapper;
    let hideAlert;

    beforeEach(() => {
        const message = 'Hello world!';
        const type = 'success';
        hideAlert = jest.fn();

        wrapper = shallow(<Alert message={message} type={type} hideAlert={hideAlert}/>);
    });

    it('should render a message', () => {
        const alert = wrapper.find('.alert');

        expect(alert.hasClass('alert-success')).toBe(true);
        expect(alert.text()).toContain('Hello world!');
    });

    it('should close an alert message', () => {
        wrapper.find('button').simulate('click');
        expect(hideAlert).toBeCalled();
    });

    it('should render no message if none specified', () => {
        wrapper.setProps({message: ''});
        expect(wrapper.type()).toBe(null);
    });

});