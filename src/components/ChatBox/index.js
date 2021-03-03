import React, { useState, useEffect } from "react"
import "antd/dist/antd.css"
import { Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import css from "./index.module.css"
import feathers from "feathers-client"
import io from "socket.io-client"

const ChatBox = () => {
  const socket = io("http://localhost:3003")
  const app = feathers()
  app.configure(feathers.socketio(socket))

  const [msgs, setMsgs] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [userInput, setUserInput] = useState("")

  const renderMessages = async () => {
    const messages = await app.service("messages").find()
    const msgs = messages.map(msg => msg.text)
    setMsgs(msgs)
    setIsLoading(false)
  }

  const sendMsg = async e => {
    await app.service("messages").create({
      text: userInput,
    })
    // e.target.value = ""
  }

  useEffect(() => {
    renderMessages()
    app.service("messages").on("created", msg => setMsgs([msg.text]))
  }, [])

  return (
    <div style={{ width: 350, margin: 30 }}>
      <div className={css.container}>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}
        >
          {!isLoading &&
            msgs.map(msg => (
              <div>
                <span>{msg.datetime} :</span>
                <span> {msg.text}</span>
              </div>
            ))}
        </div>
      </div>
      <form
        style={{ display: "flex" }}
        onSubmit={e => {
          e.preventDefault()
          sendMsg(e)
        }}
      >
        <input
          style={{ width: 280, height: 50 }}
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        ></input>
        <button type="submit" style={{ width: 70, height: 50 }}>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatBox
