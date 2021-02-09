import React from "react"
import Cookie from "js-cookie"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  status: "away",
  firstName: null,
  lastName: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECT":
      return {
        ...state,
        status: action.payload.status,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      }
    case "DISCONNECT":
      return {
        status: "away",
        firstName: null,
        lastName: null,
      }
    default:
      return state
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
