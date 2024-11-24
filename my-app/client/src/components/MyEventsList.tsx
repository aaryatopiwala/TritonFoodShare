import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { FoodEvent } from "../types/types";
import FoodEventItem from "./FoodEventItem";

const MyEventsList = () => {
  const { foodEvents } = useContext(AppContext);

  return (
    <ul className="list-group">
      {foodEvents.map((foodEvent: FoodEvent) => (
        <FoodEventItem
          key={foodEvent.id}
          id={foodEvent.id}
          orgName={foodEvent.orgName}
          foodName={foodEvent.foodName}
          quantity={foodEvent.quantity}
          location={foodEvent.location}
          description={foodEvent.description || ''}
          headcount={foodEvent.headcount || 0}
        />
      ))}
    </ul>
  );
};

export default MyEventsList;
