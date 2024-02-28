import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { responsiveFontSize } from "../../../utils/utils";

const styles = (theme) =>
	StyleSheet.create({
		container: {
			width: "100%",
			marginTop: wp("5%"),
			alignItems: "center",
		},
		innerContainer: {
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: wp("2.5%"),
		},
		firstFuelType: {
			marginLeft: wp("1%"),
		},
		fuelTypeDisplayContainer: {
			paddingStart: wp("6%"),
			paddingEnd: wp("6%"),
			marginTop: hp("3%"),
			width: "100%",
		},
		fuelTypeText: {
			color: theme.tertiaryColor,
		},
		fuelTypeStationName: {
			color: theme.grey2,
		},
		fuelTypeStationTitle: {
			color: theme.grey,
		},
	});

export default styles;
