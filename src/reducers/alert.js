import { HIDE_ALERT, LOAD_TASKS_ERROR, SAVE_TASKS_ERROR, SAVE_TASKS_SUCCESS } from '../actions/index';

const DEFAULT_STATE = {
    message: '',
    type: 'success'
};

// alert reducer that determines what alerts look like and when are they shown
export default function alert(state = DEFAULT_STATE, action) {
    const { type } = action;

    switch (type) {
        case LOAD_TASKS_ERROR: {
            return {
                ...state,
                type: 'danger',
                message: 'There was an error loading your tasks. Please reload to the page.'
            }
        }
        case SAVE_TASKS_ERROR: {
            return {
                ...state,
                type: 'danger',
                message: 'There was an error saving your tasks. Please try saving again.'
            }
        }
        case SAVE_TASKS_SUCCESS: {
            return {
                ...state,
                type: 'success',
                message: 'Tasks saved successfully.'
            }
        }
        case HIDE_ALERT: {
            return {
                ...DEFAULT_STATE
            }
        }
        default: {
            return state;
        }
    }
}