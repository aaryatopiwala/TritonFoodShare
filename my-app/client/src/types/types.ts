export type FoodEvent = {
    id: number;
    orgName: string;
    foodName: string;
    quantity: string;
    locationDescription: string;
    biglocation: string;
    description: string;
    dietary: string,
    headcount: number;
    userId: string;
};

export type User = {
    username: string;
    password: string;
}