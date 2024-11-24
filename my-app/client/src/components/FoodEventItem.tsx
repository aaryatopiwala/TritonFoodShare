import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";

const FoodEventItem = (currentFoodEvent: FoodEvent) => {
  // Exercise: Consume the AppContext here
  const expenses = useContext(AppContext).foodEvents;
  const setExpenses = useContext(AppContext).setfoodEvents;
  
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentFoodEvent.orgName}</div>
      <div>{currentFoodEvent.foodName}</div>
      <div>{currentFoodEvent.quantity}</div>
      <div>{currentFoodEvent.location}</div>
      <div>{currentFoodEvent.description}</div>
      <div>{currentFoodEvent.headcount}</div>
    </li>
  );
};

export default FoodEventItem;