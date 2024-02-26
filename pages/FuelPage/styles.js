import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { responsiveFontSize } from "../../utils/utils";

const styles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.secondaryColor,
		},
		screenTopContainer: {
			flex: 1,
			width: "100%",
			paddingTop: hp("2%"),
			alignItems: "center",
		},
		cityDistrictContainer: {
			paddingVertical: hp("1%"),
			width: "100%",
			flexDirection: "row",
			paddingStart: wp("5%"),
			paddingEnd: wp("5%"),
		},
		twoLinedCityDistrictContainer: {
			paddingVertical: hp("1%"),
			width: "100%",
			paddingStart: wp("5%"),
			paddingEnd: wp("5%"),
			flexDirection: "column",
		},
		cityText: {
			textTransform: "uppercase",
			letterSpacing: wp("1%"),
			fontSize: responsiveFontSize(32),
			color: theme.tertiaryColor,
		},
		districtText: {
			textTransform: "uppercase",
			letterSpacing: wp("0.5%"),
			fontSize: responsiveFontSize(24),
			color: theme.grey,
		},
		cityDistrictSpacing: {
			fontSize: responsiveFontSize(2),
		},
		twoLinedDistrictContainer: {
			flexDirection: "row",
		},
		changeCityButton: {
			justifyContent: "flex-end",
		},
		fuelTypeContainer: {
			flexDirection: "row",
			alignItems: "center",
			marginRight: wp("4%"),
		},
		firstFuelType: {
			marginLeft: wp("1%"),
		},
		fuelTypeDisplayContainer: {
			paddingStart: wp("5%"),
			paddingEnd: wp("5%"),
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
		bottomSheetContainer: {
			backgroundColor: theme.grey3,
			flex: 1,
		},
		bottomSheetHandleIndicator: {
			backgroundColor: theme.tertiaryColor,
		},
	});

export default styles;
