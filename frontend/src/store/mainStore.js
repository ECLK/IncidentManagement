import { createStore } from 'redux'
import mainApp from '../reducers/mainReducer'

const store = createStore(mainApp);

export default mainStore;
