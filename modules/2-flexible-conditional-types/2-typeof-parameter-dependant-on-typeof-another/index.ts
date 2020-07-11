import {
	ImageLayer,
	ImageMeta,
	LayerType,
	Project,
	Size,
	TextLayer,
	TextMeta
} from "../types";
import { render } from "../render";

const projectSize: Size = {
	width: 960,
	height: 650
};

const textLayer: TextLayer = {
	type: LayerType.Text,
	maxWidth: 1000,
	position: { x: 250, y: 100 },
	color: "blue",
	id: "10",
	rotation: 0,
	text: "Advanced TypeScript",
	fontSize: "30px"
};

const imageLayer: ImageLayer = {
	type: LayerType.Image,
	position: { x: 0, y: 0 },
	id: "20",
	rotation: 0,
	src: "doge.jpg",
	maxBounds: { width: projectSize.width }
};

function setMeta<T extends TextLayer | ImageLayer>(
	layer: T,
	meta: T extends TextLayer ? TextMeta : ImageMeta
): void {
	layer.meta = meta;
};

setMeta(imageLayer, {
	format: "jpg",
	origin: "Download"
});

setMeta(textLayer, {
	fontFoundry: "OS stock",
	licenseExpiration: new Date(2025, 7, 10)
});

const project: Project = {
	layers: [imageLayer, textLayer],
	size: projectSize
};

render(project);
