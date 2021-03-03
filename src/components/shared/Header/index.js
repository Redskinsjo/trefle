import React, { useState, useContext } from "react"
import css from "./index.module.css"
import Logo from "../../../assets/img/logo_transparent.png"
import { Link } from "@reach/router"
import Layout from "../Layout/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "@fontsource/permanent-marker"
import "@fontsource/catamaran"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../../context/GlobalContextProvider"
import { Ellipsis } from "react-css-spinners"

const layoutStyles = {
  height: "100%",
}

const Header = ({ style, setDisplayLogin, back, nav, isLoading }) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  return (
    <div className={css.container} style={style}>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        {back && (
          <FontAwesomeIcon
            icon="long-arrow-alt-left"
            style={{ fontSize: 33, margin: "30px 60px", cursor: "pointer" }}
            onClick={() => {
              window.history.back()
            }}
          />
        )}
        {isLoading && back ? (
          <Ellipsis type="ThreeDots" color="black" height={80} width={40} />
        ) : (
          isLoading && (
            <Ellipsis
              type="ThreeDots"
              color="black"
              height={80}
              width={40}
              style={{ margin: "0 60px" }}
            />
          )
        )}
      </div>
      <Layout style={layoutStyles}>
        <Link to="/">
          <img src={Logo} style={{ height: "100%" }} alt="logo"></img>
        </Link>
      </Layout>
      {nav ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 280,
            }}
          >
            {/* Élément visuel lorsque le user n'est PAS connecté */}
            {state.status === "away" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 18,
                  cursor: "pointer",
                  height: 50,
                }}
                onClick={() => {
                  setDisplayLogin(true)
                }}
              >
                <FontAwesomeIcon icon="user" style={{ marginRight: 10 }} />
                <span style={{ fontFamily: "Catamaran" }}>Se connecter</span>
              </div>
            )}

            {/* Élément visuel lorsque le user est connecté */}
            {state.status === "logged-in" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 18,
                }}
              >
                <FontAwesomeIcon icon="check" style={{ marginRight: 10 }} />
                <span style={{ fontFamily: "Catamaran" }}>
                  {state.firstName}
                </span>
              </div>
            )}

            {!isMenuClicked ? (
              <FontAwesomeIcon
                icon="bars"
                style={{ margin: "30px 60px", fontSize: 33, cursor: "pointer" }}
                onClick={() => {
                  setIsMenuClicked(!isMenuClicked)
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon="times"
                style={{ margin: "30px 60px", fontSize: 33, cursor: "pointer" }}
                onClick={() => {
                  setIsMenuClicked(!isMenuClicked)
                }}
              />
            )}
          </div>
          {isMenuClicked && (
            <div
              style={{
                backgroundColor: "#FFFCF3",
                width: 300,
                height: "calc(100vh - 258px)",
                position: "absolute",
                top: 129,
                right: 6,
                border: "1px solid black",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                transition: "1s ease-out",
                background:
                  "linear-gradient(rgba(244, 238, 213, 1), rgba(32, 65, 55, 0.9))",
              }}
            >
              <ul
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  margin: "25px 30px",
                }}
              >
                <li
                  style={{
                    padding: "12px 30px",
                    fontSize: 24,
                    fontFamily: "Permanent Marker",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    margin: "10px 0px",
                  }}
                  className={css.menuItem}
                >
                  <FontAwesomeIcon icon="home" style={{ fontSize: 22 }} />
                  Accueil
                </li>
                <li
                  style={{
                    padding: "12px 30px",
                    fontSize: 24,
                    fontFamily: "Permanent Marker",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    margin: "10px 0px",
                  }}
                  className={css.menuItem}
                >
                  <FontAwesomeIcon icon="leaf" style={{ fontSize: 22 }} />
                  Plantes
                </li>

                <Link
                  to="/chat/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <li
                    style={{
                      padding: "12px 30px",
                      fontSize: 24,
                      fontFamily: "Permanent Marker",
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      margin: "10px 0px",
                    }}
                    className={css.menuItem}
                  >
                    <FontAwesomeIcon icon="comments" style={{ fontSize: 22 }} />
                    Chat
                  </li>
                </Link>
                <li
                  style={{
                    padding: "12px 30px",
                    fontSize: 24,
                    fontFamily: "Permanent Marker",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    margin: "10px 0px",
                  }}
                  className={css.menuItem}
                >
                  <FontAwesomeIcon
                    icon="info-circle"
                    style={{ fontSize: 22 }}
                  />
                  À propos
                </li>
                {state.status === "logged-in" ? (
                  <li
                    style={{
                      padding: "12px 15px",
                      fontSize: 24,
                      fontFamily: "Permanent Marker",
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      margin: "10px 0px",
                    }}
                    className={css.menuItem}
                    onClick={() => {
                      dispatch({ type: "DISCONNECT" })
                      state.setUser(null)
                    }}
                  >
                    <FontAwesomeIcon icon="user" style={{ fontSize: 22 }} />
                    Se déconnecter
                  </li>
                ) : null}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: "100%" }}></div>
      )}
    </div>
  )
}

export default Header
