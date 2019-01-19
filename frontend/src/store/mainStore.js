import { createStore } from 'redux'
import mainApp from '../reducers/mainReducer'

const mainStore = createStore(mainApp);

export default mainStore;