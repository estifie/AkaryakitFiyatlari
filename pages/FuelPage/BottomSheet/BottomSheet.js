import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import BasicText from "../../../components/BasicText";
import CITY_IDS from "../../../constants/cities";
import styles from "./styles";

const BottomSheet = ({ bottomSheetRef, theme, cityData, setCityData, isSelectingCity, data }) => {
	const themedStyles = styles(theme);

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			snapPoints={["60%"]}
			enableDismissOnClose
			enablePanDownToClose
			stackBehavior="replace"
			backdropComponent={(props) => (
				<BottomSheetBackdrop {...props} enableTouchThrough={false} appearsOnIndex={0} disappearsOnIndex={-1} />
			)}
			handleIndicatorStyle={themedStyles.bottomSheetHandleIndicator}
			backgroundStyle={themedStyles.bottomSheetContainer}
		>
			<View style={themedStyles.bottomSheetTitleContainer}>
				<BasicText s18 semibold style={themedStyles.bottomSheetTitleText}>
					{isSelectingCity ? "Bir Şehir Seç" : "Bir İlçe Seç"}
				</BasicText>
			</View>
			<BottomSheetFlatList
				keyExtractor={isSelectingCity ? (item) => item.id : (item) => item}
				data={data}
				renderItem={({ item, index }) => (
					<ListItem
						displayName={
							isSelectingCity
								? `${item.displayName[0]}${item.displayName.slice(1).toLocaleLowerCase("tr-TR")}`
								: `${item[0]}${item.slice(1).toLocaleLowerCase("tr-TR")}`
						}
						bottomSheetRef={bottomSheetRef}
						id={isSelectingCity ? item.id : item}
						seperator={index !== 0}
						themedStyles={themedStyles}
						cityData={cityData}
						setCityData={setCityData}
						isSelectingCity={isSelectingCity}
					/>
				)}
			/>
		</BottomSheetModal>
	);
};

const ListItem = ({
	bottomSheetRef,
	displayName,
	id,
	seperator,
	themedStyles,
	cityData,
	setCityData,
	isSelectingCity,
}) => {
	return (
		<View>
			{seperator && <View style={themedStyles.bottomSheetListItemSeperator} />}
			<TouchableOpacity
				onPress={() => {
					bottomSheetRef.current?.dismiss();
					if (isSelectingCity) {
						setCityData({
							...cityData,
							cityId: id,
							districtName: "",
							cityDisplayName: displayName.toLocaleUpperCase("tr-TR"),
						});
					} else {
						setCityData({ ...cityData, districtName: displayName.toLocaleUpperCase("tr-TR") });
					}
				}}
			>
				<View style={themedStyles.bottomSheetListItemContainer}>
					<BasicText h5 bold={cityData.cityId === id ? true : false} style={themedStyles.bottomSheetListItemText}>
						{cityData.cityDisplayName === displayName.toLocaleUpperCase("tr-TR") && !isSelectingCity
							? "Bütün İlçeler"
							: displayName}
					</BasicText>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default BottomSheet;
