const React = require("react")
const GlobalContextProvider = require("./src/context/GlobalContextProvider")

exports.wrapRootElement = ({ element, props }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
