import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
export const responsiveFontSize = (size) => size / fontScale;
