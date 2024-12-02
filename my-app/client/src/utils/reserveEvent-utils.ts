import { API_BASE_URL } from "../constants/constants";

// Function to reserve for a Food Event. Method: POST
export const makeReservation = async (eventId: number, userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/reserve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, userId }),
    });
    if (!response.ok) {
        throw new Error("Failed to update headcount");
    }
};

// Function to remove a reservation for a Food Event. Method: DELETE
export const removeReservation = async (eventId: number, userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/reserve`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, userId }),
    });
    if (!response.ok) {
        throw new Error("Failed to update headcount");
    }
};

// Function to get all reservations for a user. Method: GET
export const getReservations = async (userId: string): Promise<Array<number>> => {
    const response = await fetch(`${API_BASE_URL}/reserve/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to get reservations");
    } 
    let reservations = response.json().then((jsonResponse) => {
    	console.log("data in reservations", jsonResponse);
    	return jsonResponse as Array<number>;
	});

	console.log("response in reservations", reservations);
	return reservations;
};