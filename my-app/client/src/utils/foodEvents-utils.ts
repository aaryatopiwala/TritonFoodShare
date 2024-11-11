import { API_BASE_URL } from "../constants/constants";
import { FoodEvent } from "../types/types";

// Function to create an Food Event in the backend. Method: POST
export const createFoodEvent = async (expense: FoodEvent): Promise<FoodEvent> => {
	const response = await fetch(`${API_BASE_URL}/foodEvents`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(expense),
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
    	throw new Error("Failed to delete Food Event");
	}
};

// Function to get all expenses from the backend. Method: GET
export const fetchFoodEvents = async (): Promise<FoodEvent[]> => {
	const response = await fetch(`${API_BASE_URL}/foodEvents`);
	if (!response.ok) {
    	throw new Error('Failed to fetch Food Events');
	}

	// Parsing the response to get the data
	let foodEventsList = response.json().then((jsonResponse) => {
    	console.log("data in fetchFoodEvents", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchFoodEvents", foodEventsList);
	return foodEventsList;
};

// Function to update the headcount of a food event. Method: POST
export const updateFoodEventHeadcount = async (eventId: number, newHeadcount: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/foodEvents/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ headcount: newHeadcount }),
  });
  if (!response.ok) {
    throw new Error("Failed to update headcount");
  }
};