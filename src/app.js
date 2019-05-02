import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter';
import { AppContext } from './context/AppContext';
import './styles/styles.scss'; 

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
            <AppRouter />
        </AppContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));