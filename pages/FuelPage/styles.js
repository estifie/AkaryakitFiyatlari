import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		screenTopContainer: {
			flex: 1,
			width: "100%",
			paddingTop: hp("2%"),
			alignItems: "center",
		},
		categoryContainer: {
			flexDirection: "row",
			alignItems: "center",
			marginRight: wp("4%"),
			justifyContent: "center",
		},
	});

export default styles;
