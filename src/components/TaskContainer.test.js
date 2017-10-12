import React from 'react';
import { shallow } from 'enzyme';
import { TaskContainer } from './TaskContainer';
import { Task } from './Task';

describe('<TaskContainer />', () => {

    let wrapper;
    let tasks;
    let onChange;
    let deleteTask;
    let loading;
    let focusFirst;
    let loadError;

    beforeEach(() => {
        tasks = [{
                id: 'abc123',
                text: 'Task text'
            },
            {
                id: 'def456',
                text: 'Other task text'
            }];
        onChange = jest.fn();
        deleteTask = jest.fn();

        wrapper = shallow(
            <TaskContainer
                tasks={tasks}
                onChange={onChange}
                deleteTask={deleteTask}
                loading={false}
                focusFirst={false}
                loadError={false}
            />
        );
    });

    it('should render tasks', () => {
        expect(wrapper.find('.col-8').children()).toHaveLength(2);
    });

});