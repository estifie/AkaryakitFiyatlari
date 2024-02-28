import axios from "axios";
import { createContext, useContext } from "react";
import { CITIES_URL, DISTRICTS_URL, FUELS_URL, STATIONS_URL } from "../constants/apiConfig";

export const useFuel = () => {
	const context = useContext(FuelContext);
	if (context === undefined) {
		throw new Error("useFuel must be used within a FuelProvider");
	}
	return context;
};

export const FuelContext = createContext();

export const FuelProvider = ({ children }) => {
	const getStations = async () => {
		try {
			return axios
				.get(`${STATIONS_URL}`)
				.then(async (response) => {
					const { data } = response.data;

					return data;
				})
				.catch((error) => {
					console.error("An error occurred", error);
					return null;
				});
		} catch (error) {
			console.error("An error occurred", error);
			return null;
		}
	};

	const getFuelOfCity = async (cityId) => {
		try {
			return axios.get(`${FUELS_URL}/cities/${cityId}`).then(async (response) => {
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

	const getFuelOfCityAndDistrict = async (cityId, districtName) => {
		try {
			return axios
				.get(`${DISTRICTS_URL}`.replace("{cityId}", cityId).replace("{districtName}", districtName))
				.then(async (response) => {
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

	const getDistrictsOfCity = async (cityId) => {
		try {
			return axios
				.get(`${DISTRICTS_URL}`.replace("{cityId}", cityId))
				.then(async (response) => {
					const { data } = response.data;
					if (data.status === "error") {
						throw new Error(data.message || "An error occurred");
					}
					return data;
				})
				.catch((error) => {
					console.error("An error occurred", error);
					return null;
				});
		} catch (error) {
			console.error("An error occurred", error);
			return null;
		}
	};

	return (
		<FuelContext.Provider value={{ getFuelOfCity, getDistrictsOfCity, getStations }}>{children}</FuelContext.Provider>
	);
};
