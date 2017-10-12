import shortid from 'shortid';

// types

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const MOVE_TASK = 'MOVE_TASK';

export const LOAD_TASKS_PENDING = 'LOAD_TASKS_PENDING';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const LOAD_TASKS_ERROR = 'LOAD_TASKS_ERROR';

export const SAVE_TASKS_PENDING = 'SAVE_TASKS_PENDING';
export const SAVE_TASKS_SUCCESS = 'SAVE_TASKS_SUCCESS';
export const SAVE_TASKS_ERROR = 'SAVE_TASKS_ERROR';

export const HIDE_ALERT = 'HIDE_ALERT';

// actions

export function addTask() {
    const task = {
        id: shortid.generate(),
        text: ''
    };

    return {
        type: ADD_TASK,
        task
    }
}

export function updateTask(id, props) {
    return {
        type: UPDATE_TASK,
        id,
        props
    }
}

export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        id
    }
}

export function moveTask(oldIndex, newIndex) {
    return {
        type: MOVE_TASK,
        oldIndex,
        newIndex
    }
}

export function loadTasks() {
    return (dispatch) => {
        dispatch(loadTasksPending());
        fetch('/tasks')
            .then((response) => response.json())
            .then((response) => {
                const { tasks, error } = response;
                if (error) {
                    dispatch(loadTaskError());
                } else {
                    dispatch(loadTasksSuccess(tasks));
                }
            })
    }
}

export function saveTasks(tasks) {
    return (dispatch) => {
        dispatch(saveTasksPending());
        fetch("/tasks", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({tasks})
            })
            .then((response) => response.json())
            .then((response) => {
                const { error } = response;
                if (error) {
                    dispatch(saveTasksError());
                } else {
                    dispatch(saveTasksSuccess());
                }
            })
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

// private

function loadTasksPending() {
    return {
        type: LOAD_TASKS_PENDING
    }
}

function loadTasksSuccess(tasks) {
    return {
        type: LOAD_TASKS_SUCCESS,
        tasks
    }
}

function loadTaskError(message) {
    return {
        type: LOAD_TASKS_ERROR,
        message
    }
}

function saveTasksPending() {
    return {
        type: SAVE_TASKS_PENDING
    }
}

function saveTasksSuccess() {
    return {
        type: SAVE_TASKS_SUCCESS
    }
}

function saveTasksError(message) {
    return {
        type: SAVE_TASKS_ERROR,
        message
    }
}