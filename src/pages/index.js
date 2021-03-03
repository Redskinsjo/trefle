import React, { useState, useContext } from "react"
import Header from "../components/shared/Header/index"
import css from "../assets/styles/index.module.css"
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "../assets/styles/reset.css"
import Footer from "../components/shared/Footer"
import Fog from "../assets/img/fog.jpg"
import "@fontsource/catamaran"
import { Link } from "@reach/router"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider"
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
  faLongArrowAltLeft,
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
  faCheck,
  faLongArrowAltLeft
)

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayLogin, setDisplayLogin] = useState(false)
  const [displayCatchError, setDisplayCatchError] = useState({
    status: null,
    message: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  // Login function request to API
  const verifyLogin = e => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const { data, status } = await axios.post(
          "http://localhost:3003/login",
          {
            email,
            password,
          }
        )
        if (status === 200) {
          state.setUser(data.token)
          dispatch({
            type: "CONNECT",
            payload: {
              status: "logged-in",
              firstName: data.firstName,
              lastName: data.lastName,
            },
          })
          setIsLoading(false)
          setDisplayLogin(false)
          setEmail("")
          setPassword("")
          setDisplayCatchError({
            status: null,
            message: null,
          })
        }
      } catch (error) {
        setIsLoading(false)
        setDisplayCatchError(
          error.response.data.type === "password"
            ? { status: "password", message: error.response.data.error }
            : error.response.data.type === "email"
            ? { status: "email", message: error.response.data.error }
            : { status: "general", message: error.response.data.error }
        )
      }
    }, 2000)
  }

  return (
    <>
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
          }}
        >
          <Header
            setDisplayLogin={setDisplayLogin}
            nav={true}
            isLoading={isLoading}
          />

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
                    setEmail("")
                    setPassword("")
                    setDisplayCatchError({
                      status: null,
                      message: null,
                    })
                  }}
                />

                <h1
                  style={{
                    padding: "35px 0 25px 0",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Connectez-vous
                </h1>
                <form
                  onSubmit={verifyLogin}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {displayCatchError.status === "email" ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="text"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value)
                        }}
                        placeholder="Email"
                        style={{ height: 25 }}
                      />
                      <div style={{ height: 25, color: "red" }}>
                        {displayCatchError.message}
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value)
                      }}
                      placeholder="Email"
                      style={{ height: 25, marginBottom: 25 }}
                    />
                  )}
                  {displayCatchError.status === "password" ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="text"
                        value={email}
                        onChange={e => {
                          setPassword(e.target.value)
                        }}
                        placeholder="Email"
                        style={{ height: 25 }}
                      />
                      <div style={{ height: 25, color: "red" }}>
                        {displayCatchError.message}
                      </div>
                    </div>
                  ) : displayCatchError.status === "general" ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="text"
                        value={email}
                        onChange={e => {
                          setPassword(e.target.value)
                        }}
                        placeholder="Email"
                        style={{ height: 25 }}
                      />
                      <div style={{ height: 25, color: "red" }}>
                        {displayCatchError.message}
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value)
                      }}
                      placeholder="Mot de passe"
                      style={{ height: 25, marginBottom: 25 }}
                    />
                  )}
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
                    <Link to="/forgot-password" className={css.loginLink}>
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div style={{ marginTop: 15 }}>
                    <Link to="/signup/" className={css.loginLink}>
                      S'inscrire
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
