import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import BasicText from "../../components/BasicText";
import styles from "./styles";

const CityDistrictArea = ({ theme, cityData }) => {
	const themedStyles = styles(theme);

	return (
		<View
			style={{
				width: "100%",
			}}
		>
			{cityData.cityDisplayName.length * 1.33 + cityData.districtName.length > 18 ? (
				<View style={themedStyles.twoLinedCityDistrictContainer}>
					<BasicText h1 style={themedStyles.cityText}>
						{cityData.cityDisplayName}
					</BasicText>
					<View style={themedStyles.twoLinedDistrictContainer}>
						<BasicText h3 style={themedStyles.districtText}>
							{cityData.districtName}
						</BasicText>
						<View style={themedStyles.changeCityButton}>
							<MaterialIcons name="expand-more" size={hp("3%")} color={theme.tertiaryColor} />
						</View>
					</View>
				</View>
			) : (
				<View style={themedStyles.cityDistrictContainer}>
					<BasicText h1 style={themedStyles.cityText}>
						{cityData.cityDisplayName}
						<Text style={themedStyles.cityDistrictSpacing}> </Text>
						<BasicText h3 style={themedStyles.districtText}>
							{cityData.districtName}
						</BasicText>
					</BasicText>
					<View style={themedStyles.changeCityButton}>
						<MaterialIcons name="expand-more" size={hp("3%")} color={theme.tertiaryColor} />
					</View>
				</View>
			)}
		</View>
	);
};

export default CityDistrictArea;
