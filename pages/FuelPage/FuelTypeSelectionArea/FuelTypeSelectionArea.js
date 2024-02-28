import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BasicCustomButton } from "../../../components/BasicButton";
import BasicText from "../../../components/BasicText";
import styles from "./styles";

const fuelTypes = [
	{
		id: "all",
		display: "Hepsi",
	},
	{
		id: "gasoline",
		display: "Benzin",
	},
	{
		id: "diesel",
		display: "Mazot",
	},
	{
		id: "lpg",
		display: "LPG",
	},
];

const FuelTypeSelectionArea = ({ theme, selectedFuelType, setSelectedFuelType }) => {
	const themedStyles = styles(theme);

	return (
		<View style={themedStyles.container}>
			<View style={themedStyles.innerContainer}>
				{fuelTypes.map((fuelType, index) => {
					return (
						<BasicCustomButton
							onPress={() => setSelectedFuelType(fuelType.id)}
							style={{ padding: 0 }}
							key={index}
							activeOpacity={0.5}
						>
							<View style={[themedStyles.innerContainer, index === 0 && themedStyles.firstFuelType]}>
								<SelectedDot selectedFuelType={selectedFuelType} fuelTypeName={fuelType.id} theme={theme} />
								<BasicText s20 bold={selectedFuelType == fuelType.id ? true : false} style={themedStyles.fuelTypeText}>
									{fuelType.display}
								</BasicText>
							</View>
						</BasicCustomButton>
					);
				})}
			</View>
		</View>
	);
};

const SelectedDot = ({ selectedFuelType, fuelTypeName, theme }) => {
	return fuelTypeName === selectedFuelType ? (
		<FontAwesome
			name="circle"
			size={wp("2%")}
			color={theme.tertiaryColor}
			style={{
				marginRight: wp("1%"),
			}}
		/>
	) : null;
};

export default FuelTypeSelectionArea;
