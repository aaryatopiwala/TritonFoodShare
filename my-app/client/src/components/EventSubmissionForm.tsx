import React, { useState, useContext } from "react";
import { AppContext, AppProvider } from "../context/AppContext";
import { FoodEvent } from "../types/types";

const EventSubmissionForm = () => {
  // Exercise: Consume the AppContext here
  // const expenses = useContext(AppContext).expenses;
  // const setExpenses = useContext(AppContext).setExpenses;
  
  const {foodEvents, setfoodEvents} = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [orgName, setOrgName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  // Exercise: Add add new expense to expenses context array
  
    const newFoodEvent: FoodEvent = {id : (foodEvents.length+1), orgName : orgName, foodName: foodName, quantity: quantity, location: location };
    // console.log(expenses);
    //createFoodEvent(newFoodEvent);
    const updatedFoodEvents = [...foodEvents, newFoodEvent];
    // console.log(expenses);
    
    setfoodEvents(updatedFoodEvents);
    console.log(foodEvents); 
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="orgName">orgName</label>
          <input
            required
            type="text"
            placeholder="orgName"
            data-testid ="orgName"
            className="form-control"
            id="name"
            value={orgName}
            // HINT: onChange={}
            onChange={(event) => 
              setOrgName(event.target.value)
            }
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="foodName">foodName</label>
          <input
            required
            type="text"
            placeholder="foodName"
            data-testid ="foodName"
            className="form-control"
            id="name"
            value={foodName}
            // HINT: onChange={}
            onChange={(event) => 
              setFoodName(event.target.value)
            }
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="quantity">Quantity</label>
          <input
            required
            type="number"
            placeholder="123"
            data-testid ="quantity"
            className="form-control"
            id="cost"
            value={quantity}
            // HINT: onChange={}
            onChange={(event) => 
              setQuantity(event.target.valueAsNumber)
            }
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="location">location</label>
          <input
            required
            type="text"
            placeholder="location"
            data-testid ="location"
            className="form-control"
            id="name"
            value={location}
            // HINT: onChange={}
            onChange={(event) => 
              setLocation(event.target.value)
            }
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" 
          className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventSubmissionForm;