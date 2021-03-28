import React, { createContext, useContext, useReducer } from 'react';


//prepares the dataLayer
export const StateContext = createContext(null);

//Wraps our app and provides Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//pulls information from the data layer
export const useStateValue = () => useContext(StateContext)