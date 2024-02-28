import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FuelProvider } from "../context/FuelContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function Root() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider>
				<FuelProvider>
					<BottomSheetModalProvider>
						<Slot />
					</BottomSheetModalProvider>
				</FuelProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
