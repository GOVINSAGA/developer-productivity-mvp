import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});

export const getDevelopers = () => API.get("/developers");
export const getReport = (developerId, month, previousMonth) =>
    API.get("/report", {
        params: { developerId, month, previousMonth }
    });