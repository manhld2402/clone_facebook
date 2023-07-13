let initialState: string = "";
export default function authen(state = initialState, action: any) {
  switch (action.type) {
    case "LOGOUT":
      console.log("LOGOUT");
      state = "LOGOUT";
      break;
    case "LOGIN":
      state = "LOGIN";
      break;
  }
  return state;
}
