import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"

export const wrapPageElement = ({ element, props }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
