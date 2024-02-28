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
	});

export default styles;
