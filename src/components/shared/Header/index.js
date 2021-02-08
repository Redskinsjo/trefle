import React, { useState } from "react"
import css from "./index.module.css"
import Logo from "../../../assets/img/logo_transparent.png"
import { Link } from "gatsby"
import Layout from "../Layout/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "@fontsource/permanent-marker"
import "@fontsource/catamaran"

const layoutStyles = {
  height: "100%",
}

const Header = ({ style, userOptions, setUserOptions, setDisplayLogin }) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  return (
    <div className={css.container} style={style}>
      <div style={{ width: "100%" }}></div>
      <Layout style={layoutStyles}>
        <Link to="/">
          <img src={Logo} style={{ height: "100%" }} alt="logo"></img>
        </Link>
      </Layout>
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
          {userOptions.status === "away" && (
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
          {userOptions.status === "logged-in" && (
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
                {userOptions.firstName}
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
                <FontAwesomeIcon icon="info-circle" style={{ fontSize: 22 }} />À
                propos
              </li>
              {userOptions.status === "logged-in" ? (
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
                >
                  <FontAwesomeIcon icon="user" style={{ fontSize: 22 }} />
                  Se déconnecter
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
