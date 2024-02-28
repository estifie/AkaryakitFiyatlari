import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { responsiveFontSize } from "../../utils/utils";

const styles = (theme) =>
	StyleSheet.create({
		pageContainer: {
			backgroundColor: theme.secondaryColor,
			flex: 1,
			height: "100%",
		},
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
			paddingStart: wp("6%"),
			paddingEnd: wp("6%"),
		},
		twoLinedCityDistrictContainer: {
			paddingVertical: hp("1%"),
			width: "100%",
			paddingStart: wp("6%"),
			paddingEnd: wp("6%"),
			flexDirection: "column",
		},
		cityText: {
			letterSpacing: wp("1%"),
			fontSize: responsiveFontSize(32),
			color: theme.tertiaryColor,
		},
		districtText: {
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
		bottomSheetContainer: {
			backgroundColor: theme.secondaryColor,
			flex: 1,
		},
		bottomSheetHandleIndicator: {
			backgroundColor: theme.tertiaryColor,
		},
		bottomSheetTitleContainer: {
			width: "100%",
			alignItems: "center",
			paddingVertical: hp("1%"),
		},
		bottomSheetTitleText: {
			color: theme.grey3,
		},
		bottomSheetListItemContainer: {
			paddingHorizontal: wp("6%"),
			paddingVertical: hp("2%"),
		},
		bottomSheetListItemSeperator: {
			height: wp("0.2%"),
			backgroundColor: theme.grey4,
		},
		bottomSheetListItemText: {
			color: theme.grey3,
		},
	});

export default styles;
