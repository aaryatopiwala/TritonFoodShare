// Display the events currently submitted by the form user.
// This will not show ALL the events

//import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import { FoodEvent } from "../types/types";
import FoodEventItem from "./FoodEventItem";
//import { fetchExpenses } from "../../utils/expense-utils";

const MyEventsList = () => {
  const { foodEvents, setfoodEvents } = useContext(AppContext);
  
  return (
    <ul className="list-group">
      {foodEvents.map((foodEvent: FoodEvent) => (
        <FoodEventItem id={foodEvent.id} orgName={foodEvent.orgName} foodName={foodEvent.foodName} quantity={foodEvent.quantity} location={foodEvent.location} />
      ))}
    </ul> 
  );
};

export default MyEventsList;