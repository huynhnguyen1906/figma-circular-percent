import { UIMessage } from "./types";
import { createCircularChart } from "./chart-creator";
import { uiHtml } from "./ui";

export default function () {
	// Show the plugin UI using the imported HTML content
	figma.showUI(uiHtml, {
		width: 450,
		height: 850,
		themeColors: true,
	});

	// Listen for messages from the UI
	figma.ui.onmessage = async (message: UIMessage) => {
		if (message.type === "create-circular-chart" && message.data) {
			await createCircularChart(message.data);
		}
	};
}
