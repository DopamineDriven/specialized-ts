import {
	ImageLayer,
	ImageMeta,
	Layer,
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

const textLayer1 = {
	type: LayerType.Text,
	maxWidth: 1000,
	position: { x: 250, y: 100 },
	color: "blue",
	id: "10",
	rotation: 0,
	text: "Such JAM",
	fontSize: "30px"
};

const textLayer2 = {
	type: LayerType.Text,
	maxWidth: 1000,
	position: { x: 750, y: 350 },
	color: "#FF0000",
	id: "30",
	rotation: 0,
	text: "Much Stack",
	fontSize: "30px"
};

const imageLayer = {
	type: LayerType.Image,

	position: { x: 0, y: 0 },
	id: "20",
	rotation: 0,
	src: "Joe.png",
	maxBounds: { width: projectSize.width }
};

const isTextLayer = (layer: Layer): layer is TextLayer => {
	return layer.type === LayerType.Text;
};

const setFontSize = (layer: TextLayer, value: string | number) => {
	if (typeof value === "number") {
		layer.fontSize = `${value}px`;
	} else {
		layer.fontSize = value;
	}
};

const setFontSizeOnSelection = (layers: Layer[], value: string | number) => {
	layers.forEach((layer) => {
		if (isTextLayer(layer)) {
			setFontSize(layer, value);
		}
	});
};

const isImageLayer = (layer: Layer): layer is ImageLayer => {
	return layer.type === LayerType.Image;
};

const setSrc = (layer: ImageLayer, value: string) => {
	layer.src = value;
};

const setSrcOnSelection = (layers: Layer[], value: string) => {
	layers.forEach((layer) => {
		if (isImageLayer(layer)) {
			setSrc(layer, value);
		}
	});
};

const project: Project = {
	layers: [imageLayer, textLayer1, textLayer2],
	size: projectSize
};

setFontSizeOnSelection(project.layers, "1.5em");
setSrcOnSelection(project.layers, "doge.jpg");

render(project);
