import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTask, saveTasks } from '../actions/index';

// title and button bar
export const ActionBar = ({addTask, saveTasks, dirty, tasks, saving, loadError}) => (
    <div className="row justify-content-center mt-4">
        <div className="col-4">
            <h3>Tasks</h3>
        </div>
        <div className="col-4">
            <button
                type="button"
                className="btn btn-success float-right pointer"
                onClick={() => saveTasks(tasks)}
                disabled={!dirty || saving || loadError}
            >{saving ? 'Saving...' : 'Save'}</button>
            <button
                type="button"
                className="btn btn-primary float-right mr-2 pointer"
                onClick={addTask}
                disabled={loadError}
            >Add Task</button>
        </div>
    </div>
);

ActionBar.propTypes = {
    addTask: PropTypes.func.isRequired,
    saveTasks: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    tasks: PropTypes.array.isRequired,
    saving: PropTypes.bool.isRequired,
    loadError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    const { tasks: taskReducer } = state;
    const { dirty, saving, loadError } = taskReducer;
    const tasks = taskReducer.taskOrder.map((id) => taskReducer.tasks[id]);

    return {
        dirty,
        tasks,
        saving,
        loadError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: () => dispatch(addTask()),
        saveTasks: (tasks) => dispatch(saveTasks(tasks))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);