import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { responsiveFontSize } from "../../../utils/utils";

const styles = (theme) =>
	StyleSheet.create({
		titleContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		container: {
			paddingStart: wp("6%"),
			paddingEnd: wp("6%"),
			marginTop: hp("3%"),
			width: "100%",
		},
		descriptionContainer: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: hp("2%"),
		},
		descriptionVerticalLine: {
			borderRadius: 100,
			width: "2%",
			backgroundColor: theme.tertiaryColor,
			marginRight: wp("1.5%"),
		},
		text: {
			color: theme.tertiaryColor,
		},
		descriptionText: {
			color: theme.grey2,
		},
		descriptionSubtitle: {
			color: theme.grey2,
		},
		descriptionTitle: {
			color: theme.grey,
		},
		stationsContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: hp("2%"),
			width: "100%",
		},
		stationsBackground: {
			flex: 1,
			backgroundColor: theme.grey5,
			marginRight: wp("2%"),
			borderRadius: wp("2%"),
			justifyContent: "space-between",
			flexDirection: "row",
			paddingVertical: wp("5%"),
			paddingHorizontal: wp("3%"),
		},
		stationsImage: {
			height: wp("12%"),
			width: wp("12%"),
			resizeMode: "contain",
		},
		stationsTextContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "flex-end",
		},
		stationsText: {
			color: theme.grey2,
		},
	});

export default styles;
