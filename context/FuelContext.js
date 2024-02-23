import axios from "axios";
import { createContext, useContext } from "react";
import { CITIES_URL, FUELS_URL } from "../constants/apiConfig";

export const useFuel = () => {
	const context = useContext(FuelContext);
	if (context === undefined) {
		throw new Error("useFuel must be used within a FuelProvider");
	}
	return context;
};

export const FuelContext = createContext();

export const FuelProvider = ({ children }) => {
	const getFuelOfCity = async (cityId) => {
		try {
			return axios.get(`${CITIES_URL}/${cityId}`).then(async (response) => {
				const { data } = response.data;
				if (data.status === "error") {
					throw new Error(data.message || "An error occurred");
				}
				return data;
			});
		} catch (error) {
			console.error("An error occurred", error);
			return null;
		}
	};

	return <FuelContext.Provider value={{ getFuelOfCity }}>{children}</FuelContext.Provider>;
};
