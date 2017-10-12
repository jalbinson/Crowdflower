import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Task from './Task';
import { deleteTask, updateTask } from '../actions/index';
import { SortableContainer } from 'react-sortable-hoc';

// container that holds all tasks and dispatches actions to redux store
export const TaskContainer = ({tasks, onChange, deleteTask, loading, focusFirst, loadError}) => {
    if (loadError) {
        return null;
    }

    if (loading) {
        return (
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <i className="fa fa-spinner fa-spin fa-4x fa-fw" />
                    </div>
                </div>
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        You have no tasks. Add a task to start!
                    </div>
                </div>
            </div>
        )
    }

    const renderedTasks = tasks.map((task, index) => (
        <Task
            key={task.id}
            index={index}
            task={task}
            onChange={onChange}
            deleteTask={deleteTask}
            focus={focusFirst && index === 0}
        />
    ));

    return (
        <div className="row justify-content-center mt-2">
            <div className="col-8">
                {renderedTasks}
            </div>
        </div>
    )
};

TaskContainer.propTypes = {
    tasks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    focusFirst: PropTypes.bool.isRequired,
    loadError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    const { tasks: taskReducer } = state;
    const { loading, focusFirst, loadError } = taskReducer;
    const tasks = taskReducer.taskOrder.map((id) => taskReducer.tasks[id]);

    return {
        tasks,
        loading,
        focusFirst,
        loadError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (id, text) => dispatch(updateTask(id, {text})),
        deleteTask: (id) => dispatch(deleteTask(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SortableContainer(TaskContainer));