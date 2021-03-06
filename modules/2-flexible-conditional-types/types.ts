export interface Size {
	width: number;
	height: number;
}

export interface Constraint {
	width?: number;
	height?: number;
}

export enum LayerType {
	Text,
	Image
}

export interface Position {
	x: number;
	y: number;
}

export interface Layer {
	id: string;
	type: LayerType;
	rotation: number;
	position: Position;
}

export interface TextMeta {
	fontFoundry: string;
	licenseExpiration: Date;
}

export interface TextLayer extends Layer {
	type: LayerType.Text;

	text: string;
	color: string;
	fontSize: string;
	maxWidth: number;
	meta?: TextMeta;
}

export interface ImageMeta {
	origin: string;
	format: "jpg" | "png";
}

export interface ImageLayer extends Layer {
	type: LayerType.Image;
	src: string;
	maxBounds: Constraint;

	meta?: ImageMeta;
}

export interface Project {
	layers: Layer[];
	size: Size;
}
