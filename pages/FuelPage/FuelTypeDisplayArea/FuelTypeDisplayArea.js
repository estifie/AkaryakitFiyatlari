import { Image, View } from "react-native";
import { BasicCustomButton } from "../../../components/BasicButton";
import BasicText from "../../../components/BasicText";
import { PUBLIC_URL } from "../../../constants/apiConfig";
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
					<View style={themedStyles.container} key={index}>
						{/* Fuel Type */}
						<View style={themedStyles.titleContainer}>
							<BasicText h4 style={themedStyles.text}>
								{fuelType.display}
							</BasicText>
							<BasicCustomButton activeOpacity={0.75}>
								<BasicText s16 style={themedStyles.text}>
									Tümünü Gör
								</BasicText>
							</BasicCustomButton>
						</View>

						{/* Price Description */}
						<View style={themedStyles.descriptionContainer}>
							<View style={{ flexDirection: "row", flex: 3 }}>
								<View style={themedStyles.descriptionVerticalLine} />
								<View>
									<BasicText style={themedStyles.descriptionTitle}>En Ucuz {fuelType.display}</BasicText>
									<BasicText bold style={themedStyles.descriptionSubtitle}>
										{minimumStationName}
									</BasicText>
									<BasicText style={themedStyles.descriptionText}>{minimumPrice.toFixed(3)} ₺</BasicText>
								</View>
							</View>
							<View style={{ flex: 3 }}>
								<BasicText style={themedStyles.descriptionTitle}>En Pahalı {fuelType.display}</BasicText>
								<BasicText bold style={themedStyles.descriptionSubtitle}>
									{maximumStationName}
								</BasicText>
								<BasicText style={themedStyles.descriptionSubtitle}>{maximumPrice.toFixed(3)} ₺</BasicText>
							</View>
							<View style={{ flex: 2 }}>
								<BasicText style={themedStyles.descriptionTitle}>Fark</BasicText>
								<BasicText style={themedStyles.descriptionSubtitle}>
									{(maximumPrice - minimumPrice).toFixed(4)} ₺
								</BasicText>
							</View>
						</View>

						{/* Stations */}
						<View>
							<View style={themedStyles.stationsContainer}>
								{/* Lowest Station */}
								<View style={themedStyles.stationsBackground}>
									<View style={{ flex: 1 }}>
										<Image
											source={{ uri: PUBLIC_URL + minimumStationName + ".png" }}
											style={themedStyles.stationsImage}
										/>
									</View>
									<View style={themedStyles.stationsTextContainer}>
										<BasicText bold style={themedStyles.stationsText}>
											{minimumStationName}
										</BasicText>
										<BasicText style={themedStyles.stationsText}>{minimumPrice.toFixed(3)} ₺</BasicText>
									</View>
								</View>
								{/* Highest Station */}
								<View style={themedStyles.stationsBackground}>
									<View style={{ flex: 1 }}>
										<Image
											source={{ uri: PUBLIC_URL + maximumStationName + ".png" }}
											style={themedStyles.stationsImage}
										/>
									</View>
									<View style={themedStyles.stationsTextContainer}>
										<BasicText bold style={themedStyles.stationsText}>
											{maximumStationName}
										</BasicText>
										<BasicText style={themedStyles.stationsText}>{maximumPrice.toFixed(3)} ₺</BasicText>
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
