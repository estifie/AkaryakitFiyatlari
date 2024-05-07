import React, { useState } from "react";
import { FlatList, Image, ScrollView, View } from "react-native";
import { BasicCustomButton } from "../../../components/BasicButton";
import BasicText from "../../../components/BasicText";
import { PUBLIC_URL } from "../../../constants/apiConfig";
import { useFuel } from "../../../context/FuelContext";
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

/* Root Component For Displaying Fuel Data */
const FuelTypeDisplayArea = ({ selectedDistrict, stations, cityData, selectedFuelType, setSelectedFuelType }) => {
	const selectedCity = cityData.cityDisplayName;
	if (selectedDistrict === "") {
		selectedDistrict = selectedCity;
	}

	return (
		/* It displays a container for each fuel type */
		<View>
			{selectedFuelType === "all" ? (
				<View>
					<ScrollView showsVerticalScrollIndicator={false}>
						{fuelTypes.map((fuelType, index) => {
							return (
								<FuelTypeContainer
									key={index}
									fuelType={fuelType}
									selectedDistrict={selectedDistrict}
									selectedCity={selectedCity}
									stations={stations}
									selectedFuelType={selectedFuelType}
									setSelectedFuelType={setSelectedFuelType}
								/>
							);
						})}
					</ScrollView>
				</View>
			) : (
				<View>
					<FuelTypeContainer
						fuelType={fuelTypes.find((fuelType) => fuelType.id === selectedFuelType)}
						selectedDistrict={selectedDistrict}
						selectedCity={selectedCity}
						stations={stations}
						selectedFuelType={selectedFuelType}
						setSelectedFuelType={setSelectedFuelType}
					/>
				</View>
			)}
		</View>
	);
};

const FuelTypeContainer = ({
	fuelType,
	selectedDistrict,
	selectedCity,
	stations,
	selectedFuelType,
	setSelectedFuelType,
}) => {
	const { fuelData } = useFuel();
	const { theme } = useTheme();
	const themedStyles = styles(theme);

	if (selectedFuelType !== "all" && selectedFuelType !== fuelType.id) {
		return null;
	}

	if (fuelData == [] || fuelData[fuelType.id] === undefined) {
		return null;
	}

	const filteredFuelData = filterFuelData(fuelData, fuelType, selectedDistrict, selectedCity);

	const minimumStation = {
		price: filteredFuelData[0]?.price,
		stationName: getStationName(stations, filteredFuelData[0]),
	};

	const maximumStation = {
		price: filteredFuelData[filteredFuelData.length - 1]?.price,
		stationName: getStationName(stations, filteredFuelData[filteredFuelData.length - 1]),
	};

	return (
		<View style={themedStyles.container} key={fuelType.id}>
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
				minimumPrice={minimumStation.price}
				maximumPrice={maximumStation.price}
				maximumStationName={maximumStation.stationName}
				minimumStationName={minimumStation.stationName}
			/>

			{/* Stations */}
			<View>
				{selectedFuelType === "all" ? (
					<FuelTypeStations
						minimumPrice={minimumStation.price}
						maximumPrice={maximumStation.price}
						minimumStationName={minimumStation.stationName}
						maximumStationName={maximumStation.stationName}
					/>
				) : (
					<FuelTypeSelectedStations
						stations={stations}
						fuelType={fuelType}
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

const FuelTypeSelectedStations = ({ stations, selectedDistrict, selectedCity, fuelType }) => {
	const { fuelData } = useFuel();
	const { theme } = useTheme();
	const [renderCount, setRenderCount] = useState(20);

	const onEndReached = () => {
		setRenderCount((prevCount) => prevCount + 20);
	};

	const filteredFuelData = filterFuelData(fuelData, fuelType, selectedDistrict, selectedCity);

	return (
		<View>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={filteredFuelData.slice(0, renderCount)}
				renderItem={({ item: fuel }) => {
					const station = stations.find((station) => station.id === fuel.stationId);
					return (
						<FuelTypeSelectedStationItem
							station={station}
							selectedDistrict={selectedDistrict}
							selectedCity={selectedCity}
							fuel={fuel}
						/>
					);
				}}
				onEndReached={onEndReached}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

const FuelTypeSelectedStationItem = ({ station, selectedDistrict, selectedCity, fuel }) => {
	const { theme } = useTheme();
	const themedStyles = styles(theme);

	return (
		<View style={themedStyles.stationsContainer}>
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
					<BasicText style={themedStyles.stationsText}>{fuel.price.toFixed(3)} ₺</BasicText>
				</View>
			</View>
		</View>
	);
};

const filterFuelData = (fuelData, fuelType, selectedCity, selectedDistrict) => {
	const filteredFuelData = fuelData[fuelType.id].filter((fuel) =>
		selectedCity.toLocaleUpperCase("tr-TR") === selectedDistrict.toLocaleUpperCase("tr-TR")
			? true
			: fuel.districtName === selectedDistrict.toLocaleUpperCase("tr-TR"),
	);
	return filteredFuelData;
};

const getStationName = (stations, station) => {
	const foundStation = stations?.find(({ id }) => id === station?.stationId);
	return foundStation?.displayName ?? "İstasyon";
};

export default FuelTypeDisplayArea;
