import { combineReducers } from 'redux'
import tasks from './tasks';
import alert from './alert';

export default combineReducers({
    tasks,
    alert
});