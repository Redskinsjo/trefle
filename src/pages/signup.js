import React, { useState } from "react"
import Fog from "../assets/img/fog2.jpg"
import axios from "axios"
import { Ellipsis } from "react-css-spinners"
import Footer from "../components/shared/Footer"
import Header from "../components/shared/Header/index"

export default function Signup({ location }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [displayCatchError, setDisplayCatchError] = useState(false)
  const [displaySignup, setDisplaySignup] = useState(true)

  console.log(location)

  const signup = async () => {
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
        location.state.setUser(data.token)
        location.state.setUserOptions(
          Object.assign(location.state.userOptions, {
            status: "logged-in",
            firstName: data.firstName,
            lastName: data.lastName,
          })
        )
        setIsLoading(false)
      }
    } catch (error) {
      setDisplaySignup(false)
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
        <Header back={true} />

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
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
          ){/* Modal d'erreur apparait aussi sur toggle true du state */}
          {displayCatchError && <div style={{ width: 350, height: 800 }}></div>}
        </div>
      </div>
      <Footer />
    </div>
  )
}
