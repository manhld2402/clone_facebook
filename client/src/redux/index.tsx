import { combineReducers } from "redux";
import dataUser from "./user.contain";
import authen from "./authen";
export * from "../redux";
export const reducer = combineReducers({ dataUser,authen });
