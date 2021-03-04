import React, { useState, useEffect, useRef } from "react"
import "antd/dist/antd.css"
import { Button } from "antd"
import { SendOutlined } from "@ant-design/icons"
import css from "./index.module.css"
import "./index.css"
import feathers from "feathers-client"
import io from "socket.io-client"

const socket = io("http://localhost:3003")
const app = feathers()
app.configure(feathers.socketio(socket))

const ChatBox = () => {
  const [msgs, setMsgs] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [userInput, setUserInput] = useState("")

  const settleMessageService = async () => {
    const msgs = await app.service("messages").find()
    setMsgs(msgs)
    setIsReady(true)

    app.service("messages").on("created", async msg => {
      const messages = await app.service("messages").find()
      setMsgs(messages)
    })
  }

  const sendMsg = async e => {
    await app.service("messages").create({
      text: userInput,
    })
    setUserInput("")
  }

  useEffect(() => {
    settleMessageService()
  }, [])

  return (
    <div style={{ width: 450, margin: 30, padding: "0px 35px" }}>
      <div className={css.container}>
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "0.5px solid lightgray",
          }}
        >
          {isReady &&
            msgs.map((msg, index) => {
              const now = Date.now()
              let diffSeconds = Math.floor(
                (now - Number(msg.datetime || now)) / 1000
              )
              if (!diffSeconds) {
                diffSeconds = 1
              }
              let diffMinutes
              if (diffSeconds >= 60) {
                diffMinutes = Math.floor(
                  (now - Number(msg.datetime)) / 1000 / 60
                )
                diffSeconds = null
              }
              let diffHours
              if (diffMinutes >= 60) {
                diffHours = Math.floor(
                  (now - Number(msg.datetime)) / 1000 / 60 / 60
                )
                diffMinutes = null
              }
              let diffDays
              if (diffHours >= 24) {
                diffDays = Math.floor(
                  (now - Number(msg.datetime)) / 1000 / 60 / 60 / 24
                )
                diffHours = null
              }

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "7px 0px",
                    backgroundColor: index % 2 !== 0 ? "aliceblue" : "white",
                  }}
                >
                  <p
                    style={{
                      color: msg.color,
                      fontSize: 14,
                      minWidth: 70,
                      marginTop: 1,
                      // marginLeft: 4,
                    }}
                  >
                    {diffSeconds
                      ? diffSeconds + "s ago"
                      : diffMinutes
                      ? diffMinutes + "min ago"
                      : diffHours
                      ? diffHours + "hours ago"
                      : diffDays + "days ago"}
                    :
                  </p>
                  <span
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-line",
                      overflowWrap: "break-word",
                      marginRight: 8,
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
      <div style={{ display: "flex", margin: "0px 35px", width: "100%" }}>
        <input
          style={{ flexGrow: 1, height: 50 }}
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        ></input>
        <Button
          icon={<SendOutlined />}
          type="primary"
          onClick={e => {
            if (userInput) sendMsg(e)
          }}
          style={{ width: 70, height: 50 }}
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export default ChatBox
