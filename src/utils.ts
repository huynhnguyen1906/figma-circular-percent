// Helper function to convert hex color to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16) / 255,
				g: parseInt(result[2], 16) / 255,
				b: parseInt(result[3], 16) / 255,
		  }
		: { r: 0, g: 0, b: 0 };
}

// Helper function to try loading fonts
export async function tryLoadFont(): Promise<FontName | null> {
	const fontsToTry = [
		{ family: "Roboto", style: "Bold" },
		{ family: "Inter", style: "Bold" },
		{ family: "Arial", style: "Bold" },
		{ family: "Helvetica", style: "Bold" },
	];

	for (const font of fontsToTry) {
		try {
			await figma.loadFontAsync(font);
			return font;
		} catch (error) {
			continue;
		}
	}

	return null;
}
