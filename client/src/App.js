import React, { useEffect, useReducer } from "react";
import { useSocket } from "./useSocket";
import "./App.css";
import { handleChatAppActions, initialState } from "./state";

function App() {
  const { socket, socketOpen } = useSocket();
  const [state, dispatch] = useReducer(handleChatAppActions, initialState);

  useEffect(() => {
    if (socketOpen) {
      socket.addEventListener("message", event => {
        const data = JSON.parse(event.data);

        dispatch({
          type: "INCOMING_MESSAGE",
          payload: data
        });
      });
    }
  }, [socket, socketOpen]);

  return (
    <div className="App">
      <button
        onClick={() => {
          dispatch({ type: "UNDO" });
        }}
      >
        undo
      </button>

      <h1>Hello {state.name}</h1>

      <input
        value={state.name}
        onChange={event => {
          dispatch({
            type: "SET_NAME",
            payload: event.target.value
          });
        }}
      />

      <hr />

      <input
        value={state.message}
        onChange={event => {
          dispatch({
            type: "SET_MESSAGE",
            payload: event.target.value
          });
        }}
      />

      <button
        onClick={() => {
          if (socketOpen) {
            socket.send(
              JSON.stringify({
                message: state.message,
                name: state.name
              })
            );
            dispatch({ type: "CLEAR_MESSAGE" });
          }
        }}
      >
        send
      </button>

      <hr />

      {state.messageEvents.map(data => (
        <div key={data.date}>
          <b>{data.name}</b>:<span>{data.message} </span>
          <pre>{new Date(data.date).toString()}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;
