import { MaterialIcons } from "@expo/vector-icons";
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import CITY_IDS from "../../constants/cities";
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
	const { getFuelOfCity, getDistrictsOfCity, getStations } = useFuel();
	const [cityData, setCityData] = useState({
		cityId: -1, // Initial value is -1, it will be recognized as Istanbul in backend
		cityDisplayName: "İSTANBUL",
		districtName: "",
		districtsOfCity: [],
		fuelData: [],
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
		getDistrictsOfCity(cityData.cityId).then((districts) => {
			getFuelOfCity(cityData.cityId).then((fuel) => {
				setCityData({ ...cityData, fuelData: fuel, districtsOfCity: districts });
			});

			// If cityId is initial value, do not show the ilçe bottom sheet
			if (cityData.cityId === -1) return;

			districtBottomSheetRef.current?.present();
		});
	}, [cityData.cityId]);

	return (
		<View style={themedStyles.pageContainer}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<SafeAreaView style={themedStyles.container}>
					<View style={themedStyles.screenTopContainer}>
						<CityDistrictArea theme={theme} cityData={cityData} handleBottomSheetToggle={handlePresentModalPress} />
						<FuelTypeSelectionArea
							theme={theme}
							selectedFuelType={selectedFuelType}
							setSelectedFuelType={setSelectedFuelType}
						/>
						<FuelTypeDisplayArea
							theme={theme}
							fuelData={cityData.fuelData}
							selectedFuelType={selectedFuelType}
							selectedDistrict={cityData.districtName}
							selectedCity={cityData.cityDisplayName}
							stations={stations}
						/>
					</View>
				</SafeAreaView>
			</ScrollView>
			<BottomSheet
				bottomSheetRef={cityBottomSheetRef}
				theme={theme}
				data={CITY_IDS}
				cityData={cityData}
				setCityData={setCityData}
				isSelectingCity={true}
			/>
			<BottomSheet
				bottomSheetRef={districtBottomSheetRef}
				theme={theme}
				cityData={cityData}
				setCityData={setCityData}
				isSelectingCity={false}
				data={cityData.districtsOfCity}
			/>
		</View>
	);
};

export default FuelPage;
