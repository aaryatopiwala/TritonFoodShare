import { createContext, useState } from "react";
import { FoodEvent } from "../types/types";

interface FoodEventContextType {
  foodEvents: FoodEvent[];
  setfoodEvents: React.Dispatch<React.SetStateAction<FoodEvent[]>>;
}

const initialState: FoodEventContextType = {
  foodEvents: [],
  setfoodEvents: () => {},
};

export const FoodEventContext = createContext<FoodEventContextType>(initialState);

export const AppProvider = (props: any) => {
  const [foodEvents, setfoodEvents] = useState<FoodEvent[]>(initialState.foodEvents);

  return (
    <FoodEventContext.Provider
      value={{
        foodEvents: foodEvents,
        setfoodEvents: setfoodEvents,
      }}
    >
      {props.children}
    </FoodEventContext.Provider>
  );
};