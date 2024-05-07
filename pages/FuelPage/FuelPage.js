import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CITY_IDS from "../../constants/cities";
import DISTRICTS from "../../constants/districts";
import { useFuel } from "../../context/FuelContext";
import { useTheme } from "../../context/ThemeContext";
import BottomSheet from "./BottomSheet/BottomSheet";
import CityDistrictArea from "./CityDistrictArea/CityDistrictArea";
import FuelTypeDisplayArea from "./FuelTypeDisplayArea/FuelTypeDisplayArea";
import FuelTypeSelectionArea from "./FuelTypeSelectionArea/FuelTypeSelectionArea";
import styles from "./styles";

const FuelPage = () => {
	const { theme } = useTheme();
	const themedStyles = styles(theme);
	const { getFuelOfCity, getStations } = useFuel();
	const [cityData, setCityData] = useState({
		// Initial value is -1, it will be recognized as Istanbul in backend
		cityId: -1,
		cityDisplayName: "İSTANBUL",
		districtName: "",
		districtsOfCity: [],
	});
	const [stations, setStations] = useState([]);
	const [selectedFuelType, setSelectedFuelType] = useState("all");

	const cityBottomSheetRef = useRef(null);
	const districtBottomSheetRef = useRef(null);

	const handlePresentModalPress = () => {
		cityBottomSheetRef.current?.present();
	};

	useEffect(() => {
		getStations().then((stations) => {
			setStations(stations);
		});
	}, []);

	useEffect(() => {
		setCityData({ ...cityData, districtsOfCity: DISTRICTS[cityData.cityId] });
		getFuelOfCity(cityData.cityId);

		if (cityData.cityId === -1) return;

		districtBottomSheetRef.current?.present();
	}, [cityData.cityId]);

	return (
		<View style={themedStyles.pageContainer}>
			<SafeAreaView style={themedStyles.container}>
				<View style={themedStyles.screenTopContainer}>
					<CityDistrictArea theme={theme} cityData={cityData} handleBottomSheetToggle={handlePresentModalPress} />
					<FuelTypeSelectionArea
						theme={theme}
						selectedFuelType={selectedFuelType}
						setSelectedFuelType={setSelectedFuelType}
					/>
					<FuelTypeDisplayArea
						selectedFuelType={selectedFuelType}
						setSelectedFuelType={setSelectedFuelType}
						selectedDistrict={cityData.districtName}
						cityData={cityData}
						selectedCity={cityData.cityDisplayName}
						stations={stations}
					/>
				</View>
			</SafeAreaView>
			<BottomSheet
				bottomSheetRef={cityBottomSheetRef}
				theme={theme}
				data={CITY_IDS}
				cityData={cityData}
				setCityData={setCityData}
				isSelectingCity={true}
				setSelectedFuelType={setSelectedFuelType}
			/>
			<BottomSheet
				bottomSheetRef={districtBottomSheetRef}
				theme={theme}
				cityData={cityData}
				setCityData={setCityData}
				isSelectingCity={false}
				data={cityData.districtsOfCity}
				setSelectedFuelType={setSelectedFuelType}
			/>
		</View>
	);
};

export default FuelPage;
