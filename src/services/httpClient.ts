import axios from "axios"

export const httpClient = axios.create({
    baseURL: "https://kx9lxfcxs3.execute-api.us-east-1.amazonaws.com"
})