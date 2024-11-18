import { FoodEvent } from "../types/types"

export const API_BASE_URL = "http://localhost:8080";

export const dummyEventList = [
    {
        id: 1,
        orgName: "Org1",
        foodName: "Food1",
        quantity: 1,
        location: "Location1",
        description: "Description1",
        headcount: 0,
        dietary: ["Halal"]
    },
    {
        id: 2,
        orgName: "Org2",
        foodName: "Food2",
        quantity: 2,
        location: "Location2",
        description: "Description2",
        headcount: 0,
        dietary: []
    },
    {
        id: 3,
        orgName: "Org3",
        foodName: "Food3",
        quantity: 3,
        location: "Location3",
        description: "Description3",
        headcount: 0,
        dietary: ["Vegetarian"]
    },
    {
        id: 4,
        orgName: "Org4",
        foodName: "Food4",
        quantity: 4,
        location: "Location4",
        description: "Description4",
        headcount: 0,
        dietary: ["Contains Nuts"]
    },
]