import { FontAwesome } from "@expo/vector-icons";
import { Platform, ScrollView, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BasicCustomButton } from "../../components/BasicButton";
import { BasicImage } from "../../components/BasicImage";
import BasicText from "../../components/BasicText";
import styles from "./styles";

const FuelTypeDisplayArea = ({ theme, fuelTypeDisplayName }) => {
	const themedStyles = styles(theme);

	return (
		<View style={themedStyles.fuelTypeDisplayContainer}>
			{/* Fuel Type */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<BasicText h4 style={themedStyles.fuelTypeText}>
					{fuelTypeDisplayName}
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
					marginTop: hp("1.5%"),
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
						<BasicText style={themedStyles.fuelTypeStationTitle}>En Ucuz Benzin</BasicText>
						<BasicText bold style={themedStyles.fuelTypeStationName}>
							BP
						</BasicText>
						<BasicText style={themedStyles.fuelTypeStationName}>39,384</BasicText>
					</View>
				</View>
				<View style={{ flex: 3 }}>
					<BasicText style={themedStyles.fuelTypeStationTitle}>En Pahalı Benzin</BasicText>
					<BasicText bold style={themedStyles.fuelTypeStationName}>
						Petrol Ofisi
					</BasicText>
					<BasicText style={themedStyles.fuelTypeStationName}>39,947</BasicText>
				</View>
				<View style={{ flex: 2 }}>
					<BasicText style={themedStyles.fuelTypeStationTitle}>Fark</BasicText>
					<BasicText style={themedStyles.fuelTypeStationName}>00,563</BasicText>
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
					<View
						style={{
							flex: 1,
							backgroundColor: theme.grey3,
							marginRight: wp("2%"),
							borderRadius: wp("3.5%"),
							justifyContent: "space-between",
							flexDirection: "row",
						}}
					>
						<BasicImage></BasicImage>
					</View>
					<View
						style={{
							flex: 1,
							backgroundColor: theme.grey3,
							marginLeft: wp("2%"),
							borderRadius: wp("3.5%"),
						}}
					></View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: wp("3%"),
						width: "100%",
					}}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: theme.grey3,
							marginRight: wp("2%"),
							borderRadius: wp("3.5%"),
						}}
					></View>
					<View
						style={{
							flex: 1,
							backgroundColor: theme.grey3,
							marginLeft: wp("2%"),
							borderRadius: wp("3.5%"),
						}}
					></View>
				</View>
			</View>
		</View>
	);
};

export default FuelTypeDisplayArea;
