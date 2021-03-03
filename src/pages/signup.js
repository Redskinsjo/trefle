import React, { useState, useContext } from "react"
import Fog from "../assets/img/fog2.jpg"
import axios from "axios"
import Footer from "../components/shared/Footer"
import Header from "../components/shared/Header/index"
import { navigate } from "@reach/router"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider"

export default function Signup(props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [displayCatchError, setDisplayCatchError] = useState({
    status: null,
    message: null,
  })
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)

  // Signup function request to API
  const signup = e => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const { data, status } = await axios.post(
          "http://localhost:3003/signup",
          {
            firstName,
            lastName,
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
          setFirstName("")
          setLastName("")
          setEmail("")
          setPassword("")
          navigate("/")
        }
      } catch (error) {
        setIsLoading(false)
        setDisplayCatchError(
          error.response.data.type === "email"
            ? { status: "email", message: error.response.data.error }
            : { status: "general", message: error.response.data.error }
        )
      }
    }, 2000)
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
        <Header back={true} isLoading={isLoading} />

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Modal de login apparait sur toggle true du state */}(
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
              onSubmit={signup}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <input
                type="text"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value)
                }}
                placeholder="Prénom"
                style={{ height: 25, marginBottom: 25 }}
              />
              <input
                type="text"
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value)
                }}
                placeholder="Nom de famille"
                style={{ height: 25, marginBottom: 25 }}
              />
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

              {displayCatchError.status === "general" ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value)
                    }}
                    placeholder="Mot de passe"
                    style={{ height: 25, width: "100%" }}
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
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
