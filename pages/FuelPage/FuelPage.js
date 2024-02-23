import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicText from "../../components/BasicText";
import { useFuel } from "../../context/FuelContext";
import { useTheme } from "../../context/ThemeContext";
import styles from "./styles";

const FuelPage = () => {
	const { theme } = useTheme();
	const { getFuelOfCity } = useFuel();
	const themedStyles = styles(theme);

	return (
		<SafeAreaView style={themedStyles.container}>
			<View style={themedStyles.screenTopContainer}>
				<BasicText style={themedStyles.title}>Fuel Prices</BasicText>
			</View>
		</SafeAreaView>
	);
};

export default FuelPage;
