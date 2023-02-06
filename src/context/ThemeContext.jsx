import { createContext, useReducer } from "react";
const ThemeContexttt = createContext();

const initialData = { theme: localStorage.getItem("theme")=== null ?"light":localStorage.getItem("theme") === "light" ?"light":"dark"};
const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...firstState, theme: action.newValue };
    default:
      return firstState;
  }}
   

export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const toggelTheme = (newName) => {
    localStorage.setItem("theme", newName);
    dispatch({ type: "CHANGE_THEME", newValue: newName });
  };
  return (
     <ThemeContexttt.Provider value={{ ...firstState,toggelTheme}}>
      {children}
     </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;