import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = (theme) =>
	StyleSheet.create({
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
