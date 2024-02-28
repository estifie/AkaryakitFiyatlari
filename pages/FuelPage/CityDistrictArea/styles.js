import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { responsiveFontSize } from "../../../utils/utils";

const styles = (theme) =>
	StyleSheet.create({
		container: {
			width: "100%",
			marginTop: hp("1%"),
		},
		shortContainer: {
			paddingVertical: hp("1%"),
			width: "100%",
			flexDirection: "row",
			paddingStart: wp("6%"),
			paddingEnd: wp("6%"),
		},
		longContainer: {
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
		changeCityButton: {
			justifyContent: "flex-end",
		},
	});

export default styles;
