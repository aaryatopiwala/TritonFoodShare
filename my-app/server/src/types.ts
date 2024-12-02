export interface FoodEvent {
    id: number;
    orgName: string;
    foodName: string;
    quantity: string;
    locationDescription: string;
    bigLocation: string;
    dietary: string;
    description: string;
    headcount: number;
    userId: string;
}

export interface User {
    username: string;
    password: string;
}