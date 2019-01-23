import React from 'react';
import { Route } from 'react-router-dom'

import LangaugeSelector from '../containers/landing/languageSelector';
import HomePage from '../containers/landing/homePage';

const routes = [
    <Route exact path='/' component={LangaugeSelector} />,
    <Route exact path='/home' component={HomePage}/>
]

export default routes;