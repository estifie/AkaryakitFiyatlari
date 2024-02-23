import React, { useEffect, useState } from "react";
import { Animated, Easing, Image, ImageBackground, ImageProps, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import images from "../../constants/images";
import { responsiveFontSize } from "../../utils/utils";

interface BasicImageProps {
	width: number;
	height: number;
	source: any;
	style?: any;
	borderRadius: number;
	src?: any;
	resizeMode?: any;
}

const BasicImage = ({ width, height, source, style, borderRadius, src, resizeMode }: BasicImageProps & ImageProps) => {
	return (
		<Image
			style={[
				{
					width: width,
					height: height,
					borderRadius: borderRadius,
				},
				style,
			]}
			source={source}
			src={src}
			resizeMode={resizeMode}
		/>
	);
};

interface AnimatedBasicImageProps {
	source: any;
	style?: any;
	borderRadius: number;
	resizeMode?: any;
	onPress?: any;
}

const AnimatedBasicImage = ({ source, style, borderRadius, resizeMode, onPress }: AnimatedBasicImageProps) => {
	const [scaleAnimation] = useState(new Animated.Value(1)); // Initial scale value is 1

	const handlePressIn = () => {
		// Shrink animation
		Animated.timing(scaleAnimation, {
			toValue: 0.95, // Scale down to 95%
			duration: 80,
			useNativeDriver: false,
		}).start();
	};

	const handlePressOut = () => {
		// Grow back animation
		Animated.timing(scaleAnimation, {
			toValue: 1, // Scale back to 100%
			duration: 80,
			useNativeDriver: false,
		}).start();

		// Call the onPress function if it exists
		if (onPress) {
			onPress();
		}
	};

	useEffect(() => {
		// Clean up the animation when the component unmounts or when the state changes
		return () => {
			scaleAnimation.setValue(1); // Reset the scale to 1
		};
	}, [scaleAnimation]);

	return (
		<TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={1}>
			<Animated.Image
				style={[
					{
						borderRadius: borderRadius,
						transform: [{ scale: scaleAnimation }],
					},
					style,
				]}
				source={source}
				resizeMode={resizeMode}
			/>
		</TouchableOpacity>
	);
};

interface AnimatedBasicImageBackgroundProps {
	source: any;
	style?: any;
	borderRadius: number;
	resizeMode?: any;
	onPress?: any;
	children?: any;
	imageStyle?: any;
}

const AnimatedBasicImageBackground = ({
	source,
	style,
	borderRadius,
	resizeMode,
	onPress,
	children,
	imageStyle,
}: AnimatedBasicImageBackgroundProps) => {
	const [scaleAnimation] = useState(new Animated.Value(1)); // Initial scale value is 1

	const handlePressIn = () => {
		// Shrink animation
		Animated.timing(scaleAnimation, {
			toValue: 0.95, // Scale down to 95%
			duration: 80,
			useNativeDriver: false,
		}).start();
	};

	const handlePressOut = () => {
		// Grow back animation
		Animated.timing(scaleAnimation, {
			toValue: 1, // Scale back to 100%
			duration: 80,
			useNativeDriver: false,
		}).start(() => {});
	};

	useEffect(() => {
		// Clean up the animation when the component unmounts or when the state changes
		return () => {
			scaleAnimation.setValue(1); // Reset the scale to 1
		};
	}, [scaleAnimation]);

	return (
		<TouchableOpacity
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={1}
			onLongPress={onPress}
			delayLongPress={200}
		>
			<Animated.View
				style={[
					{
						borderRadius: borderRadius,
						transform: [{ scale: scaleAnimation }],
					},
				]}
			>
				<ImageBackground
					style={[
						{
							borderRadius: borderRadius,
						},
						style,
					]}
					imageStyle={[{ borderRadius: borderRadius }, imageStyle]}
					source={source}
					resizeMode={resizeMode}
				>
					{children}
				</ImageBackground>
			</Animated.View>
		</TouchableOpacity>
	);
};

export { AnimatedBasicImage, AnimatedBasicImageBackground, BasicImage };
