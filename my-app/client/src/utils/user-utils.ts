import { API_BASE_URL } from "../constants/constants";
import { User } from "../types/types";

// Function to create a User in the backend. Method: POST
export const signup = async (user: User): Promise<boolean> => {
	const response = await fetch(`${API_BASE_URL}/users/signup`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(user),
	});
	if (!response.ok) {
    	throw new Error("Failed to create User");
	}
	
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
};

// Function to attempt to login to a user. Method: GET
export const login = async (user: User): Promise<boolean> => {
	const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
	if (!response.ok) {
    	throw new Error('Failed to fetch User');
	}

	if (response.status === 200) {
        return true;
    } else {
        return false;
    }
};
