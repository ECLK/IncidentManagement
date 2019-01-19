import LangaugeSelector from '../containers/landing/languageSelector';
import HomePage from '../containers/landing/homePage';

const mainRoutes = [
    {
        path:'/',
        component: LangaugeSelector
    },
    {
        path:'/home',
        component: HomePage
    }
]

export default mainRoutes;