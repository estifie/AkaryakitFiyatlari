import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BasicCustomButton } from "../../../components/BasicButton";
import BasicText from "../../../components/BasicText";
import styles from "./styles";

const CityDistrictArea = ({ theme, cityData, handleBottomSheetToggle }) => {
	const themedStyles = styles(theme);

	return (
		<View style={themedStyles.container}>
			<BasicCustomButton
				onPress={() => {
					handleBottomSheetToggle();
				}}
				activeOpacity={0.7}
			>
				{(
					cityData.cityDisplayName !== cityData.districtName
						? cityData.cityDisplayName.length * 1.3 + cityData.districtName.length > 20
						: cityData.cityDisplayName.length * 1.3 > 20
				) ? (
					<View style={themedStyles.longContainer}>
						<BasicText h1 style={themedStyles.cityText}>
							{cityData.cityDisplayName}
						</BasicText>
						<View style={{ flexDirection: "row" }}>
							{cityData.cityDisplayName === cityData.districtName ? null : (
								<BasicText h3 style={themedStyles.districtText}>
									{cityData.districtName}
								</BasicText>
							)}
							<View style={themedStyles.changeCityButton}>
								<MaterialIcons name="expand-more" size={hp("3%")} color={theme.tertiaryColor} />
							</View>
						</View>
					</View>
				) : (
					<View style={themedStyles.shortContainer}>
						<BasicText h1 style={themedStyles.cityText}>
							{cityData.cityDisplayName}
							<Text style={themedStyles.cityDistrictSpacing}> </Text>
							{cityData.cityDisplayName === cityData.districtName ? null : (
								<BasicText h3 style={themedStyles.districtText}>
									{cityData.districtName}
								</BasicText>
							)}
						</BasicText>
						<View style={themedStyles.changeCityButton}>
							<MaterialIcons name="expand-more" size={hp("3%")} color={theme.tertiaryColor} />
						</View>
					</View>
				)}
			</BasicCustomButton>
		</View>
	);
};

export default CityDistrictArea;
