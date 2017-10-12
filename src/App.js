import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import ActionBar from './components/ActionBar';
import TaskContainer from './components/TaskContainer';
import { moveTask } from './actions/index';
import { connect } from 'react-redux';
import Alert from './components/Alert';

// root level app structure
// handles reordering actions
export const App = ({moveTask}) => (
    <div className="container-fluid">
        <div className="row">
            <div className="header" />
        </div>
        <ActionBar />
        <Alert />
        <TaskContainer onSortEnd={moveTask} useDragHandle={true} />
    </div>
);

App.propTypes = {
    moveTask: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        moveTask: ({oldIndex, newIndex}) => dispatch(moveTask(oldIndex, newIndex))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
