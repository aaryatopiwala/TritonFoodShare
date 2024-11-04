import { createContext, useState } from "react";
import { FoodEvent } from "../types/types";

// Exercise: Create add budget to the context



interface AppContextType {
  foodEvents: FoodEvent[];
  setfoodEvents: React.Dispatch<React.SetStateAction<FoodEvent[]>>;
}

const initialState: AppContextType = {
  foodEvents: [],
  setfoodEvents: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [foodEvents, setfoodEvents] = useState<FoodEvent[]>(initialState.foodEvents);

  return (
    <AppContext.Provider
      value={{
        foodEvents: foodEvents,
        setfoodEvents: setfoodEvents
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};