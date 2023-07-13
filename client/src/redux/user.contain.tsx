const initialState: any = {};
export default function dataUser(state = initialState, action: any) {
  switch (action.type) {
    case "LOAD_DATA_USER":
      state = { ...action.payload };
      break;
  }
  return state;
}
