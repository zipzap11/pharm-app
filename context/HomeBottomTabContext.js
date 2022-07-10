import { createContext, useState } from "react";

export const HomeBottomTabContext = createContext({
  isShown: true,
  setIsShown: () => {},
});

export function HomeBottomTabContextProvider({ children }) {
  const [isShown, setIsShown] = useState(true);
  function setShownFalse() {
    setIsShown(false);
  }
  return (
    <HomeBottomTabContext.Provider
      value={{ isShown: isShown, setIsShown: setShownFalse }}
    >
      {children}
    </HomeBottomTabContext.Provider>
  );
}
