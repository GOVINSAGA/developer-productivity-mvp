import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});

export const getDevelopers = () => API.get("/developers");
export const getMonths = () => API.get("/months");

export const getReport = (developerId, month, previousMonth) =>
    API.get("/report", {
        params: { developerId, month, previousMonth }
    });

export const getManagerReport = (managerId, month) =>
    API.get("/manager-report", {
        params: { managerId, month }
    });