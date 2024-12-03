import { createContext, useState } from "react";
import { FoodEvent } from "../types/types";

interface FoodEventContextType {
  foodEvents: FoodEvent[];
  setfoodEvents: React.Dispatch<React.SetStateAction<FoodEvent[]>>;
}

const foodEventContextInitialState: FoodEventContextType = {
  foodEvents: [],
  setfoodEvents: () => {},
};

interface UserContextType {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const userContextInitialState: UserContextType = {
  login: false,
  setLogin: () => {},
  username: "Have not logged in", // Resolved to use the more descriptive initial value
  setUsername: () => {},
};

export const FoodEventContext = createContext<FoodEventContextType>(
  foodEventContextInitialState
);
export const UserContext = createContext<UserContextType>(userContextInitialState);

export const AppProvider = (props: any) => {
  const [foodEvents, setfoodEvents] = useState<FoodEvent[]>(
    foodEventContextInitialState.foodEvents
  );
  const [login, setLogin] = useState<boolean>(userContextInitialState.login);
  const [username, setUsername] = useState<string>(userContextInitialState.username);

  return (
    <FoodEventContext.Provider
      value={{
        foodEvents: foodEvents,
        setfoodEvents: setfoodEvents,
      }}
    >
      <UserContext.Provider
        value={{
          login: login,
          setLogin: setLogin,
          username: username,
          setUsername: setUsername,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </FoodEventContext.Provider>
  );
};
