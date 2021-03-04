const React = require("react")
const GlobalContextProvider = require("./src/context/GlobalContextProvider")
  .default

exports.wrapRootElement = ({ element, props }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
