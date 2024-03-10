import { Image, View } from "react-native";
import { BasicCustomButton } from "../../../components/BasicButton";
import BasicText from "../../../components/BasicText";
import { PUBLIC_URL } from "../../../constants/apiConfig";
import { useTheme } from "../../../context/ThemeContext";
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

const FuelTypeDisplayArea = ({
	fuelData,
	selectedDistrict,
	stations,
	cityData,
	selectedFuelType,
	setSelectedFuelType,
}) => {
	const selectedCity = cityData.cityDisplayName;
	if (selectedDistrict === "") {
		selectedDistrict = selectedCity;
	}

	const filteredFuelData = fuelData.filter((fuel) =>
		selectedCity.toLocaleUpperCase("tr-TR") === selectedDistrict.toLocaleUpperCase("tr-TR")
			? true
			: fuel.districtName === selectedDistrict.toLocaleUpperCase("tr-TR"),
	);

	return (
		<View>
			{fuelTypes.map((fuelType, index) => {
				return (
					<FuelTypeContainer
						key={index}
						fuelType={fuelType}
						filteredFuelData={filteredFuelData}
						selectedDistrict={selectedDistrict}
						selectedCity={selectedCity}
						stations={stations}
						selectedFuelType={selectedFuelType}
						setSelectedFuelType={setSelectedFuelType}
					/>
				);
			})}
		</View>
	);
};

const FuelTypeContainer = ({
	fuelType,
	filteredFuelData,
	selectedDistrict,
	selectedCity,
	stations,
	selectedFuelType,
	setSelectedFuelType,
	index,
}) => {
	const { theme } = useTheme();
	const themedStyles = styles(theme);

	if (selectedFuelType !== "all" && selectedFuelType !== fuelType.id) {
		return null;
	}

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
			{/* Fuel Type Title */}
			<FuelTypeTitle
				isSelected={selectedFuelType === fuelType.id}
				fuelTypeDisplayName={fuelType.display}
				selectFuelType={() => {
					setSelectedFuelType(fuelType.id);
				}}
			/>

			{/* Price Description */}
			<FuelTypeDescription
				fuelTypeDisplayName={fuelType.display}
				minimumPrice={minimumPrice}
				maximumPrice={maximumPrice}
				maximumStationName={maximumStationName}
				minimumStationName={minimumStationName}
			/>

			{/* Stations */}
			<View>
				{selectedFuelType === "all" ? (
					<FuelTypeStations
						minimumPrice={minimumPrice}
						maximumPrice={maximumPrice}
						minimumStationName={minimumStationName}
						maximumStationName={maximumStationName}
					/>
				) : (
					<FuelTypeSelectedStations
						stations={stations}
						fuelType={fuelType}
						filteredFuelData={filteredFuelData}
						selectedDistrict={selectedDistrict}
						selectedCity={selectedCity}
					/>
				)}
			</View>
		</View>
	);
};

const FuelTypeTitle = ({ fuelTypeDisplayName, isSelected, selectFuelType }) => {
	const { theme } = useTheme();
	const themedStyles = styles(theme);

	return (
		<View style={themedStyles.titleContainer}>
			<BasicText h4 style={themedStyles.text}>
				{fuelTypeDisplayName}
			</BasicText>
			<BasicCustomButton
				activeOpacity={0.75}
				onPress={() => {
					selectFuelType();
				}}
			>
				<BasicText s16 style={themedStyles.text}>
					{!isSelected && "Tümünü Gör"}
				</BasicText>
			</BasicCustomButton>
		</View>
	);
};

const FuelTypeDescription = ({
	fuelTypeDisplayName,
	maximumPrice,
	maximumStationName,
	minimumPrice,
	minimumStationName,
}) => {
	const { theme } = useTheme();
	const themedStyles = styles(theme);

	return (
		<View style={themedStyles.descriptionContainer}>
			<View style={{ flexDirection: "row", flex: 3 }}>
				<View style={themedStyles.descriptionVerticalLine} />
				<View>
					<BasicText style={themedStyles.descriptionTitle}>En Ucuz {fuelTypeDisplayName}</BasicText>
					<BasicText bold style={themedStyles.descriptionSubtitle}>
						{minimumStationName}
					</BasicText>
					<BasicText style={themedStyles.descriptionText}>{minimumPrice.toFixed(3)} ₺</BasicText>
				</View>
			</View>
			<View style={{ flex: 3 }}>
				<BasicText style={themedStyles.descriptionTitle}>En Pahalı {fuelTypeDisplayName}</BasicText>
				<BasicText bold style={themedStyles.descriptionSubtitle}>
					{maximumStationName}
				</BasicText>
				<BasicText style={themedStyles.descriptionSubtitle}>{maximumPrice.toFixed(3)} ₺</BasicText>
			</View>
			<View style={{ flex: 2 }}>
				<BasicText style={themedStyles.descriptionTitle}>Fark</BasicText>
				<BasicText style={themedStyles.descriptionSubtitle}>{(maximumPrice - minimumPrice).toFixed(4)} ₺</BasicText>
			</View>
		</View>
	);
};

const FuelTypeStations = ({ minimumPrice, maximumPrice, minimumStationName, maximumStationName }) => {
	const { theme } = useTheme();
	const themedStyles = styles(theme);

	return (
		<View style={themedStyles.stationsContainer}>
			{/* Lowest Station */}
			<View style={themedStyles.stationsBackground}>
				<View style={{ flex: 1 }}>
					<Image
						source={{ uri: PUBLIC_URL + minimumStationName.toLocaleLowerCase("tr-TR") + ".png" }}
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
						source={{ uri: PUBLIC_URL + maximumStationName.toLocaleLowerCase("tr-TR") + ".png" }}
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
	);
};

const FuelTypeSelectedStations = ({ stations, fuelType, filteredFuelData, selectedDistrict, selectedCity }) => {
	const { theme } = useTheme();
	const themedStyles = styles(theme);

	return (
		<View>
			{filteredFuelData.map((fuel, index) => {
				if (fuel[fuelType.id + "Price"] === 0) {
					return null;
				}

				const station = stations.find((station) => station.id === fuel.stationId);

				return (
					<View style={themedStyles.stationsContainer} key={index}>
						<View style={themedStyles.stationsBackground}>
							<View style={{ flex: 1 }}>
								<Image
									source={{ uri: PUBLIC_URL + station.displayName.toLocaleLowerCase("tr-TR") + ".png" }}
									style={themedStyles.stationsImage}
								/>
							</View>
							<View style={themedStyles.stationsTextContainer}>
								{selectedDistrict.toLocaleUpperCase("tr-TR") === selectedCity.toLocaleUpperCase("tr-TR") && (
									<BasicText bold style={themedStyles.descriptionTitle}>
										{fuel.districtName}
									</BasicText>
								)}
								<BasicText bold style={themedStyles.stationsText}>
									{station.displayName}
								</BasicText>
								<BasicText style={themedStyles.stationsText}>{fuel[fuelType.id + "Price"].toFixed(3)} ₺</BasicText>
							</View>
						</View>
					</View>
				);
			})}
		</View>
	);
};

const findMinMaxPrice = (fuelData, fuelType) => {
	const prices = fuelData.filter((fuel) => fuel[fuelType] !== 0).map((fuel) => fuel[fuelType]);

	return {
		minimum: Math.min(...prices),
		maximum: Math.max(...prices),
		minimumStation: fuelData.find((fuel) => fuel[fuelType] === Math.min(...prices)),
		maximumStation: fuelData.find((fuel) => fuel[fuelType] === Math.max(...prices)),
	};
};

export default FuelTypeDisplayArea;
