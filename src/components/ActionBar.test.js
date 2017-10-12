import React from 'react';
import { shallow } from 'enzyme';
import { ActionBar } from './ActionBar';

describe('<ActionBar />', () => {

    let wrapper;
    let addTask;
    let saveTasks;
    let tasks;

    beforeEach(() => {
        addTask = jest.fn();
        saveTasks = jest.fn();
        tasks = [1,2,3];

        wrapper = shallow(
            <ActionBar
                addTask={addTask}
                saveTasks={saveTasks}
                dirty={false}
                tasks={tasks}
                saving={false}
                loadError={false}
            />
        );
    });

    it('should add a task', () => {
        wrapper.find('.btn-primary').simulate('click');
        expect(addTask).toBeCalled();
    });

    it('should have disabled save button', () => {
        const button = wrapper.find('.btn-success');
        expect(button.prop('disabled')).toBe(true);
    });

    it('should save a task', () => {
        wrapper.setProps({dirty: true});

        const button = wrapper.find('.btn-success');
        expect(button.prop('disabled')).toBe(false);

        button.simulate('click');
        expect(saveTasks).toBeCalled();
    });

    it('should have saving text', () => {
        wrapper.setProps({saving: true});

        const button = wrapper.find('.btn-success');
        expect(button.text()).toBe('Saving...');
    });

});