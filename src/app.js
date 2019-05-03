import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from './context/AppContext';
import './styles/styles.scss'; 
import Dashboard from './components/Dashboard';

const App = () => {
    const [ foodPlace, setFoodPlace ] = useState();
    const [ funPlace, setFunPlace ] = useState();

    return (
        <AppContext.Provider 
            value={{
                foodPlace,
                setFoodPlace,

                funPlace,
                setFunPlace
            }}
        >
            <Dashboard />
        </AppContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));