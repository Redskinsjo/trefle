import React, { useState } from "react"
import Header from "../components/shared/Header/index"
import css from "../assets/styles/index.module.css"
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import Cookie from "js-cookie"
import "../assets/styles/reset.css"
import Footer from "../components/shared/Footer"
import Fog from "../assets/img/fog.jpg"
import { Link } from "gatsby"
import "@fontsource/catamaran"
import { Ellipsis } from "react-css-spinners"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faBars,
  faTimes,
  faComments,
  faHome,
  faLeaf,
  faInfoCircle,
  faUser,
  faCheck,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
library.add(
  faBars,
  faTimes,
  faComments,
  faHome,
  faLeaf,
  faInfoCircle,
  faUser,
  faCheck
)

export default function Home() {
  const [userOptions, setUserOptions] = useState({
    status: "away",
    firstName: null,
    lastName: null,
  })
  const [displayLogin, setDisplayLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [displayCatchError, setDisplayCatchError] = useState(false)

  const setUser = async token => {
    if (token) {
      await Cookie.set("token", token)
    } else {
      await Cookie.remove("token")
    }
  }

  const verifyLogin = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data, status } = await axios.post("http://localhost:3003", {
        email,
        password,
      })
      if (status === 200) {
        setUser(data.token)
        setUserOptions(
          Object.assign(userOptions, {
            status: "logged-in",
            firstName: data.firstName,
            lastName: data.lastName,
          })
        )
        setIsLoading(false)
      }
    } catch (error) {
      setDisplayLogin(false)
      setDisplayCatchError(true)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        src={Fog}
        alt="background"
      ></img>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Header
          userOptions={userOptions}
          setUserOptions={setUserOptions}
          setDisplayLogin={setDisplayLogin}
        />

        {isLoading && (
          <Ellipsis
            type="ThreeDots"
            color="black"
            height={80}
            width={40}
            style={{ position: "absolute", top: 20, left: 40 }}
          />
        )}

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Modal de login apparait sur toggle true du state */}
          {displayLogin && (
            <div
              style={{
                width: 350,
                height: 500,
                background: "rgba(255, 255, 255, 0.9)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 20,
                boxSizing: "border-box",
                fontFamily: "Catamaran",
              }}
            >
              {/* Croix pour fermer la modal  */}
              <FontAwesomeIcon
                icon="times"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDisplayLogin(false)
                }}
              />

              <h1
                style={{
                  padding: "35px 0 25px 0",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Veuillez renseigner vos informations
              </h1>
              <form
                onSubmit={verifyLogin}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <input
                  type="text"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  placeholder="Email"
                  style={{ height: 25, marginBottom: 25 }}
                />
                <input
                  type="text"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                  placeholder="Mot de passe"
                  style={{ height: 25, marginBottom: 25 }}
                />
                <div
                  style={{
                    marginTop: 15,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="submit"
                    style={{ height: 35, width: "33%", cursor: "pointer" }}
                  >
                    Se connecter
                  </button>
                </div>
                <div style={{ marginTop: 15 }}>
                  <Link to="/forgot-password" className={css.forgotPassword}>
                    Mot de passe oublié ?
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* Modal d'erreur apparait aussi sur toggle true du state */}
          {displayCatchError && <div style={{ width: 350, height: 800 }}></div>}
        </div>
      </div>
      <Footer />
    </div>
  )
}
