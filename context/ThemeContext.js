import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

const lightTheme = {
	primaryColor: "#FC6843",
	secondaryColor: "#F2F2F2",
	tertiaryColor: "#1E1E1E",
	white: "#F1f2f1",
	black: "#1E1E1E",
	grey: "#E4E4E4",
	grey2: "#575757",
	grey3: "#B2B1B3",
	grey4: "#DCDDDE",
};

const darkTheme = {
	primaryColor: "#FC6843",
	secondaryColor: "#1E1E1E",
	tertiaryColor: "#F2F2F2",
	white: "#F1f2f1",
	black: "#1E1E1E",
	grey: "#151515",
	grey2: "#575757",
	grey3: "#B2B1B3",
	grey4: "#DCDDDE",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const isDarkMode = useColorScheme() === "dark";
	const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

	const toggleTheme = () => {
		setTheme(theme === lightTheme ? darkTheme : lightTheme);
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
