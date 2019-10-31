const logActionsMiddleware = action => {
  console.log(action.type);
};

let previousStates = [];
const undoMiddleware = state => {
  previousStates.push(state);
};

export const initialState = {
  name: "Alex",
  message: "",
  messageEvents: []
};

export function handleChatAppActions(state, action) {
  logActionsMiddleware(action);

  if (action.type !== "UNDO") undoMiddleware(state);

  if (action.type === "SET_NAME") {
    return {
      ...state,
      name: action.payload
    };
  }

  if (action.type === "SET_MESSAGE") {
    return {
      ...state,
      message: action.payload
    };
  }

  if (action.type === "CLEAR_MESSAGE") {
    return {
      ...state,
      message: ""
    };
  }

  if (action.type === "INCOMING_MESSAGE") {
    return {
      ...state,
      messageEvents: [action.payload, ...state.messageEvents]
    };
  }

  if (action.type === "UNDO") {
    let lastState = previousStates[previousStates.length - 1];
    previousStates = previousStates.slice(0, -1);
    return lastState;
  }

  return state;
}
