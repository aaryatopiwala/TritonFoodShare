import { API_BASE_URL } from "../constants/constants";
import { FoodEvent } from "../types/types";

// Function to create an Food Event in the backend. Method: POST
export const createFoodEvent = async (foodEvent: FoodEvent): Promise<FoodEvent> => {
	const response = await fetch(`${API_BASE_URL}/foodEvents`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(foodEvent),
	});
	if (!response.ok) {
    	throw new Error("Failed to create Food Event");
	}
	return response.json();
};

// Function to delete an Food Event in the backend. Method: DELETE
export const deleteFoodEvent = async (id: string): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/foodEvents/${id}`, {
    	method: "DELETE",
	});
	if (!response.ok) {
		console.log(`Failed to delete Food Event with ID: ${id}`, response);
    	throw new Error("Failed to delete Food Event");
	}
};

// Function to get all expenses from the backend. Method: GET
export const fetchFoodEvents = async (): Promise<FoodEvent[]> => {
	const response = await fetch(`${API_BASE_URL}/foodEvents`, {
        method: "GET",
    });
	if (!response.ok) {
    	throw new Error('Failed to fetch Food Events');
	}

	// Parsing the response to get the data
	let foodEventsList = await response.json().then((jsonResponse) => {
    	console.log("data in fetchFoodEvents", jsonResponse);
		const foodEventsList = jsonResponse as FoodEvent[];
    	return foodEventsList;
	});

	console.log("response in fetchFoodEvents", foodEventsList);
	console.log(typeof foodEventsList)
	return foodEventsList;
};



// Function to update a food event. Method: POST
export const updateFoodEvent = async (id: string ,foodEvent: FoodEvent): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/foodEvents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodEvent),
    });
    if (!response.ok) {
      throw new Error("Failed to update food event");
    }
  };