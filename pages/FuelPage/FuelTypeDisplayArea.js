import { FontAwesome } from "@expo/vector-icons";
import { Image, Platform, ScrollView, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BasicCustomButton } from "../../components/BasicButton";
import { AnimatedBasicImage, BasicImage } from "../../components/BasicImage";
import BasicText from "../../components/BasicText";
import { BASE_URL, PUBLIC_URL } from "../../constants/apiConfig";
import styles from "./styles";

const fuelTypes = [
	{
		id: "gasoline",
		display: "Benzin",
	},
	{
		id: "diesel",
		display: "Mazot",
	},
	{
		id: "lpg",
		display: "LPG",
	},
];

const findMinMaxPrice = (fuelData, fuelType) => {
	const prices = fuelData.filter((fuel) => fuel[fuelType] !== 0).map((fuel) => fuel[fuelType]);

	return {
		minimum: Math.min(...prices),
		maximum: Math.max(...prices),
		minimumStation: fuelData.find((fuel) => fuel[fuelType] === Math.min(...prices)),
		maximumStation: fuelData.find((fuel) => fuel[fuelType] === Math.max(...prices)),
	};
};

const FuelTypeDisplayArea = ({ theme, fuelData, selectedDistrict, selectedCity, stations }) => {
	if (selectedDistrict === "") {
		selectedDistrict = selectedCity;
	}

	const themedStyles = styles(theme);

	// Filter fuel data by selected district
	const filteredFuelData =
		selectedDistrict.toLocaleUpperCase("tr-TR") === selectedCity.toLocaleUpperCase("tr-TR")
			? fuelData
			: fuelData.filter((fuel) => fuel.districtName === selectedDistrict.toLocaleUpperCase("tr-TR"));

	return (
		<View>
			{fuelTypes.map((fuelType, index) => {
				const {
					minimum: minimumPrice,
					maximum: maximumPrice,
					minimumStation: minimumStation,
					maximumStation: maximumStation,
				} = findMinMaxPrice(filteredFuelData, fuelType.id + "Price");

				const minimumStationName =
					stations && minimumStation
						? stations.find((station) => station.id === minimumStation.stationId).displayName
						: "İstasyon";
				const maximumStationName =
					stations && maximumStation
						? stations.find((station) => station.id === maximumStation.stationId).displayName
						: "İstasyon";

				return (
					<View style={themedStyles.fuelTypeDisplayContainer} key={index}>
						{/* Fuel Type */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<BasicText h4 style={themedStyles.fuelTypeText}>
								{fuelType.display}
							</BasicText>
							<BasicText s16 style={themedStyles.fuelTypeText}>
								Tümünü Gör
							</BasicText>
						</View>
						{/* Price Description */}
						<View
							style={{
								width: "100%",
								flexDirection: "row",
								justifyContent: "space-between",
								marginTop: hp("2%"),
							}}
						>
							<View style={{ flexDirection: "row", flex: 3 }}>
								<View
									style={{
										borderRadius: 100,
										width: "2%",
										backgroundColor: theme.tertiaryColor,
										marginRight: wp("1.5%"),
									}}
								></View>
								<View>
									<BasicText style={themedStyles.fuelTypeStationTitle}>En Ucuz {fuelType.display}</BasicText>
									<BasicText bold style={themedStyles.fuelTypeStationName}>
										{minimumStationName}
									</BasicText>
									<BasicText style={themedStyles.fuelTypeStationName}>{minimumPrice.toFixed(3)} ₺</BasicText>
								</View>
							</View>
							<View style={{ flex: 3 }}>
								<BasicText style={themedStyles.fuelTypeStationTitle}>En Pahalı {fuelType.display}</BasicText>
								<BasicText bold style={themedStyles.fuelTypeStationName}>
									{maximumStationName}
								</BasicText>
								<BasicText style={themedStyles.fuelTypeStationName}>{maximumPrice.toFixed(3)} ₺</BasicText>
							</View>
							<View style={{ flex: 2 }}>
								<BasicText style={themedStyles.fuelTypeStationTitle}>Fark</BasicText>
								<BasicText style={themedStyles.fuelTypeStationName}>
									{(maximumPrice - minimumPrice).toFixed(4)} ₺
								</BasicText>
							</View>
						</View>
						{/* Stations */}
						<View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									marginTop: hp("2%"),
									width: "100%",
								}}
							>
								{/* Lowest Station */}
								<View
									style={{
										flex: 1,
										backgroundColor: theme.grey5,
										marginRight: wp("2%"),
										borderRadius: wp("2%"),
										justifyContent: "space-between",
										flexDirection: "row",
										paddingVertical: wp("5%"),
										paddingHorizontal: wp("3%"),
									}}
								>
									<View
										style={{
											flex: 1,
										}}
									>
										<Image
											source={{ uri: PUBLIC_URL + minimumStationName + ".png" }}
											style={{
												height: wp("12%"),
												width: wp("12%"),
												resizeMode: "contain",
											}}
										/>
									</View>
									<View
										style={{
											flex: 1,
											justifyContent: "center",
											alignItems: "flex-end",
										}}
									>
										<BasicText bold style={themedStyles.fuelTypeStationName}>
											{minimumStationName}
										</BasicText>
										<BasicText style={themedStyles.fuelTypeStationName}>{minimumPrice.toFixed(3)} ₺</BasicText>
									</View>
								</View>
								{/* Highest Station */}
								<View
									style={{
										flex: 1,
										backgroundColor: theme.grey5,
										marginRight: wp("2%"),
										borderRadius: wp("2%"),
										justifyContent: "space-between",
										flexDirection: "row",
										paddingVertical: wp("5%"),
										paddingHorizontal: wp("3%"),
									}}
								>
									<View
										style={{
											flex: 1,
										}}
									>
										<Image
											source={{ uri: PUBLIC_URL + maximumStationName + ".png" }}
											style={{
												height: wp("12%"),
												width: wp("12%"),
												resizeMode: "contain",
											}}
										/>
									</View>
									<View
										style={{
											flex: 1,
											justifyContent: "center",
											alignItems: "flex-end",
										}}
									>
										<BasicText bold style={themedStyles.fuelTypeStationName}>
											{maximumStationName}
										</BasicText>
										<BasicText style={themedStyles.fuelTypeStationName}>{maximumPrice.toFixed(3)} ₺</BasicText>
									</View>
								</View>
							</View>
						</View>
					</View>
				);
			})}
		</View>
	);
};

export default FuelTypeDisplayArea;
