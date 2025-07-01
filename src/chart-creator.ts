import { ChartData } from "./types";
import { tryLoadFont, hexToRgb } from "./utils";

export async function createCircularChart(data: ChartData): Promise<void> {
	try {
		const { percentage, size, strokeWidth, bgColor, progressColor, textColor } = data;

		// Create main frame to contain the chart
		const frame = figma.createFrame();
		frame.name = `Circular Chart - ${percentage}%`;
		frame.resize(size, size);
		frame.fills = []; // Transparent background

		// Calculate circle properties
		const center = size / 2;
		const outerRadius = size / 2;
		const innerRadius = outerRadius - strokeWidth;

		// Create background ring using SVG
		const bgSvg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <path d="M ${center},${center - outerRadius} A ${outerRadius},${outerRadius} 0 1,1 ${center - 0.001},${
			center - outerRadius
		} L ${center - 0.001},${center - innerRadius} A ${innerRadius},${innerRadius} 0 1,0 ${center},${
			center - innerRadius
		} Z" fill="${bgColor}"/>
      </svg>
    `;

		const bgRing = figma.createNodeFromSvg(bgSvg);
		bgRing.name = "Background Ring";

		// Create progress ring using SVG if percentage > 0
		let progressRing: SceneNode | null = null;

		if (percentage > 0) {
			// Calculate progress angle (starting from top, clockwise)
			const progressAngle = (percentage / 100) * 2 * Math.PI;

			// Calculate end position for progress arc
			const endX = center + outerRadius * Math.sin(progressAngle);
			const endY = center - outerRadius * Math.cos(progressAngle);
			const innerEndX = center + innerRadius * Math.sin(progressAngle);
			const innerEndY = center - innerRadius * Math.cos(progressAngle);

			// Use large arc flag if progress > 50%
			const largeArcFlag = percentage > 50 ? 1 : 0;

			// Create progress arc SVG
			const progressSvg = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <path d="M ${center},${
				center - outerRadius
			} A ${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${endX},${endY} L ${innerEndX},${innerEndY} A ${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${center},${
				center - innerRadius
			} Z" fill="${progressColor}"/>
        </svg>
      `;

			progressRing = figma.createNodeFromSvg(progressSvg);
			progressRing.name = "Progress Ring";
		}

		// Add rings to frame
		frame.appendChild(bgRing);
		if (progressRing) {
			frame.appendChild(progressRing);
		}

		// Create percentage text
		const text = figma.createText();

		// Try to load fonts
		const font = await tryLoadFont();
		if (font) {
			text.fontName = font;
		}

		// Set text properties
		text.characters = `${percentage}%`;
		text.fontSize = Math.max(16, size * 0.12);

		// Convert hex color to RGB for text
		const textColorRgb = hexToRgb(textColor);
		text.fills = [{ type: "SOLID", color: textColorRgb }];
		text.textAlignHorizontal = "CENTER";
		text.textAlignVertical = "CENTER";

		text.x = center - text.width / 2;
		text.y = center - text.height / 2 + 1;

		// Add text to frame
		frame.appendChild(text);

		// Position frame in viewport center
		frame.x = figma.viewport.center.x - size / 2;
		frame.y = figma.viewport.center.y - size / 2;

		// Add frame to current page
		figma.currentPage.appendChild(frame);

		// Select the created frame
		figma.currentPage.selection = [frame];

		// Focus on the created chart
		figma.viewport.scrollAndZoomIntoView([frame]);

		// Send success message back to UI
		figma.ui.postMessage({
			type: "creation-complete",
			percentage: percentage,
		});
	} catch (error) {
		console.error("Chart creation error:", error);

		// Send error message back to UI
		figma.ui.postMessage({
			type: "creation-error",
			error: error instanceof Error ? error.message : "Failed to create chart",
		});
	}
}
