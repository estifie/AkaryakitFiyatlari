import React from "react";
import { Text, TextProps } from "react-native";
import { responsiveFontSize } from "../../utils/utils";

interface BasicTextProps {
	children: React.ReactNode;
	h1?: boolean;
	h2?: boolean;
	h3?: boolean;
	h4?: boolean;
	h5?: boolean;
	h6?: boolean;
	h7?: boolean;
	h8?: boolean;
	p?: boolean;
	s20?: boolean;
	s18?: boolean;
	bold?: boolean;
	italic?: boolean;
	style?: any;
}

const BasicText = ({
	children,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	h7,
	h8,
	p,
	s20,
	s18,
	bold,
	italic,
	style,
	...props
}: BasicTextProps & TextProps) => {
	return (
		<Text
			style={[
				h1 && { fontSize: responsiveFontSize(40) },
				h2 && { fontSize: responsiveFontSize(34) },
				h3 && { fontSize: responsiveFontSize(28) },
				h4 && { fontSize: responsiveFontSize(22) },
				h5 && { fontSize: responsiveFontSize(16) },
				h6 && { fontSize: responsiveFontSize(14) },
				h7 && { fontSize: responsiveFontSize(12) },
				h8 && { fontSize: responsiveFontSize(10) },
				s20 && { fontSize: responsiveFontSize(20) },
				s18 && { fontSize: responsiveFontSize(18) },
				p && { fontSize: responsiveFontSize(14) },
				bold && { fontWeight: "bold" },
				italic && { fontStyle: "italic" },
				style,
			]}
			{...props}
		>
			{children}
		</Text>
	);
};

export default BasicText;
