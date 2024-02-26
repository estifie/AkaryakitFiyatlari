import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicText from "../../components/BasicText";
import { useFuel } from "../../context/FuelContext";
import { useTheme } from "../../context/ThemeContext";
import CityDistrictArea from "./CityDistrictArea";
import FuelTypeDisplayArea from "./FuelTypeDisplayArea";
import FuelTypeSelectionArea from "./FuelTypeSelectionArea";
import styles from "./styles";

const FuelPage = () => {
	const { theme } = useTheme();
	const { getFuelOfCity } = useFuel();
	const themedStyles = styles(theme);
	const [cityData, setCityData] = useState({
		cityId: 34,
		cityDisplayName: "ANKARA",
		districtName: "KADIKÖY",
	});
	const [selectedFuelType, setSelectedFuelType] = useState("all");

	const bottomSheetRef = useRef(null);

	const snapPoints = useMemo(() => ["60%"], []);

	useEffect(() => {
		bottomSheetRef.current?.close();
	}, []);

	return (
		<View
			style={{
				backgroundColor: theme.secondaryColor,
				flex: 1,
				height: "100%",
			}}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<SafeAreaView style={themedStyles.container}>
					<View style={themedStyles.screenTopContainer}>
						<CityDistrictArea theme={theme} cityData={cityData} />
						<FuelTypeSelectionArea
							theme={theme}
							selectedFuelType={selectedFuelType}
							setSelectedFuelType={setSelectedFuelType}
						/>
						<FuelTypeDisplayArea theme={theme} fuelTypeDisplayName={"Benzin"} />
						<FuelTypeDisplayArea theme={theme} fuelTypeDisplayName={"Mazot"} />
						<FuelTypeDisplayArea theme={theme} fuelTypeDisplayName={"LPG"} />
					</View>
				</SafeAreaView>
			</ScrollView>
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				onChange={() => {}}
				enablePanDownToClose
				backgroundStyle={themedStyles.bottomSheetContainer}
				handleIndicatorStyle={themedStyles.bottomSheetHandleIndicator}
			>
				<View>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheet>
		</View>
	);
};

export default FuelPage;
