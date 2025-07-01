export interface ChartData {
	percentage: number;
	size: number;
	strokeWidth: number;
	bgColor: string;
	progressColor: string;
	textColor: string;
}

export interface UIMessage {
	type: string;
	data?: ChartData;
	percentage?: number;
	error?: string;
}
