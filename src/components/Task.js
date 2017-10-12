import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

// drag handle for sortable HOC
const DragHandle = SortableHandle(() => (
    <span className="float-left icon reorder">
        <i className="fa fa-bars" />
    </span>
));

// main task component
export const Task = ({task, onChange, deleteTask, focus}) => (
    <div className="task">
        <DragHandle />
        <span className="float-right icon pointer" onClick={() => deleteTask(task.id)}>
            <i className="fa fa-trash-o" />
        </span>
        <div className="textarea-container">
            <textarea
                autoFocus={focus}
                className="textarea-task"
                placeholder="TASK"
                value={task.text}
                onChange={(event) => onChange(task.id, event.target.value)}
            />
        </div>
    </div>
);

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    focus: PropTypes.bool.isRequired
};

export default SortableElement(Task);