import {
    ADD_TASK, DELETE_TASK, LOAD_TASKS_ERROR, LOAD_TASKS_PENDING, LOAD_TASKS_SUCCESS, MOVE_TASK, SAVE_TASKS_ERROR,
    SAVE_TASKS_PENDING, SAVE_TASKS_SUCCESS, UPDATE_TASK
} from '../actions/index';
import { arrayMove } from 'react-sortable-hoc';

const DEFAULT_STATE = {
    tasks: {},
    taskOrder: [],
    dirty: false,
    loading: false,
    loadError: false,
    saveError: false,
    saving: false,
    focusFirst: false
};

// tasks reducer that drives all task related actions
export default function tasks(state = DEFAULT_STATE, action) {
    const { type } = action;

    switch (type) {
        case LOAD_TASKS_PENDING: {
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_TASKS_SUCCESS: {
            const { tasks: serverTaskList } = action;
            const taskList = serverTaskList || [];
            const tasks = taskList.reduce((obj, curr) => {
                return {
                    ...obj,
                    [curr.id]: curr
                }
            }, {});
            const taskOrder = taskList.map((task) => task.id);

            return {
                ...state,
                tasks,
                taskOrder,
                loading: false,
                loadError: false
            }
        }
        case LOAD_TASKS_ERROR: {
            return {
                ...state,
                loading: false,
                loadError: true
            }
        }
        case SAVE_TASKS_PENDING: {
            return {
                ...state,
                saving: true,
                focusFirst: false
            }
        }
        case SAVE_TASKS_SUCCESS: {
            return {
                ...state,
                saving: false,
                saveError: false,
                dirty: false
            }
        }
        case SAVE_TASKS_ERROR: {
            return {
                ...state,
                saving: false,
                saveError: true
            }
        }
        case ADD_TASK: {
            const { task } = action;

            return {
                ...state,
                dirty: true,
                tasks: {
                    ...state.tasks,
                    [task.id]: task
                },
                taskOrder: [
                    task.id,
                    ...state.taskOrder
                ],
                focusFirst: true
            }
        }
        case UPDATE_TASK: {
            const { id, props } = action;

            return {
                ...state,
                dirty: true,
                tasks: {
                    ...state.tasks,
                    [id]: {
                        ...state.tasks[id],
                        ...props
                    }
                },
                focusFirst: false
            }
        }
        case DELETE_TASK: {
            const { id } = action;
            const taskOrder = state.taskOrder.filter((taskId) => taskId !== id);
            const tasks = taskOrder.reduce((obj, taskId) => {
                return {
                    ...obj,
                    [taskId]: state.tasks[taskId]
                }
            }, {});

            return {
                ...state,
                dirty: true,
                taskOrder,
                tasks,
                focusFirst: false
            }
        }
        case MOVE_TASK: {
            const { oldIndex, newIndex } = action;

            return {
                ...state,
                dirty: true,
                taskOrder: arrayMove(state.taskOrder, oldIndex, newIndex),
                focusFirst: false
            }
        }
        default: {
            return state;
        }


    }
}