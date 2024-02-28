import { createContext, useContext, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

const lightTheme = {
	primaryColor: "#FC6843",
	secondaryColor: "#F2F2F2",
	tertiaryColor: "#1E1E1E",
	white: "#F1f2f1",
	black: "#1E1E1E",
	grey: "#848484",
	grey2: "#B8B8B8",
	grey3: "#151515",
	grey4: "#cdcdcd",
	grey5: "#f2f2f2",
};

const darkTheme = {
	primaryColor: "#FC6843",
	secondaryColor: "#1E1E1E",
	tertiaryColor: "#F2F2F2",
	white: "#F1f2f1",
	black: "#1E1E1E",
	grey: "#848484",
	grey2: "#B8B8B8",
	grey3: "#bbbbbb",
	grey4: "#2e2e2e",
	grey5: "#191919",
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
