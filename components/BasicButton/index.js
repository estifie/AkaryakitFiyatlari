import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BasicImage } from "../BasicImage";
import BasicText from "../BasicText";

const BasicButton = ({ title, onPress, textColor = "white", buttonColor = "black", activeOpacity = 0.2 }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[buttonStyles.buttonContainer, { backgroundColor: buttonColor }]}
			activeOpacity={activeOpacity}
		>
			<BasicText h5 bold style={{ color: textColor }}>
				{title}
			</BasicText>
		</TouchableOpacity>
	);
};

const BasicImageButton = ({
	title,
	onPress,
	textColor = "white",
	buttonColor = "black",
	imageOnLeft = true,
	imageHeight,
	imageWidth,
	imageSource,
	imageTextDistance = wp("2%"),
	activeOpacity = 0.2,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[buttonStyles.buttonContainer, { backgroundColor: buttonColor }]}
			activeOpacity={activeOpacity}
		>
			{imageOnLeft ? (
				<BasicImage
					height={imageHeight}
					width={imageWidth}
					source={imageSource}
					style={{ marginRight: imageTextDistance }}
				/>
			) : null}
			<BasicText h5 bold style={[{ color: textColor }]}>
				{title}
			</BasicText>
			{imageOnLeft ? null : (
				<BasicImage
					height={imageHeight}
					width={imageWidth}
					source={imageSource}
					style={{ marginLeft: imageTextDistance }}
				/>
			)}
		</TouchableOpacity>
	);
};

const BasicOnlyImageButton = ({ onPress, imageHeight, imageWidth, imageSource, activeOpacity = 0.2 }) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
			<BasicImage height={imageHeight} width={imageWidth} source={imageSource} />
		</TouchableOpacity>
	);
};

const BasicOnlyImageButtonWithBackground = ({
	onPress,
	imageHeight,
	imageWidth,
	imageSource,
	backgroundColor,
	backgroundRadius,
	activeOpacity = 0.2,
}) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
			<View
				style={{
					borderRadius: backgroundRadius,
					overflow: "hidden",
					backgroundColor: backgroundColor,
				}}
			>
				<BasicImage height={imageHeight} width={imageWidth} source={imageSource} />
			</View>
		</TouchableOpacity>
	);
};

const BasicCustomButton = ({ onPress, children, activeOpacity = 0.2, disabled = false, style }) => {
	return !style ? (
		<TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} disabled={disabled}>
			<View
				style={{
					opacity: disabled ? 0.5 : 1,
				}}
			>
				{children}
			</View>
		</TouchableOpacity>
	) : (
		<TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} disabled={disabled}>
			<View style={[style, { opacity: disabled ? 0.5 : 1 }]}>{children}</View>
		</TouchableOpacity>
	);
};

const buttonStyles = StyleSheet.create({
	buttonContainer: {
		padding: hp("2.5%"),
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "red",
		flexDirection: "row",
	},
});

export { BasicButton, BasicCustomButton, BasicImageButton, BasicOnlyImageButton, BasicOnlyImageButtonWithBackground };
