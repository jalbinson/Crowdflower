import React from 'react';
import { shallow } from 'enzyme';
import { Task } from './Task';

describe('<Task />', () => {

    let wrapper;
    let task;
    let onChange;
    let deleteTask;

    beforeEach(() => {
        task = {
            id: 'abc123',
            text: 'Task text'
        };
        onChange = jest.fn();
        deleteTask = jest.fn();

        wrapper = shallow(<Task task={task} onChange={onChange} deleteTask={deleteTask} focus={false} />);
    });

    it('should render a task', () => {
        expect(wrapper.find('textarea').prop('value')).toBe('Task text');
    });

    it('should fire change event', () => {
        const textarea = wrapper.find('textarea');
        textarea.simulate('change', {
            target: {
                value: 'new val'
            }
        });

        expect(onChange).toBeCalledWith("abc123", "new val");
    });

    it('should delete a task', () => {
        const icon = wrapper.find('.fa-trash-o').parent();
        icon.simulate('click');

        expect(deleteTask).toBeCalled();
    });

});