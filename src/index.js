import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

import App from "./components/App/App";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	Typography: {
		fontSize: "1.2rem",
	},
	h3: {
		fontStyle: "italic",
	},
});

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById("react-root")
);
