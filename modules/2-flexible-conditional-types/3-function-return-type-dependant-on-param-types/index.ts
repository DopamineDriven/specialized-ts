import { ImageLayer, LayerType, Project, Size, TextLayer } from "../types";
import { render } from "../render";

const projectSize: Size = {
	width: 960,
	height: 650
};

type FactoryLayer<T> = T extends LayerType.Text ? TextLayer : ImageLayer;

function createLayer<T extends LayerType>(type: T): FactoryLayer<T> {
	if (type === LayerType.Text) {
		return {
			color: "blue",
			fontSize: "30px",
			id: new Date().toISOString(),
			maxWidth: 1000,
			position: { x: 250, y: 80 },
			rotation: 0,
			text: "Advanced TypeScript",
			type: LayerType.Text
		} as FactoryLayer<T>;
	}

	return {
		id: new Date().toISOString(),
		maxBounds: { width: 1000 },
		position: { x: 0, y: 0 },
		rotation: 0,
		src: "doge.jpg",
		type: LayerType.Image
	} as FactoryLayer<T>;
}

const textLayer = createLayer(LayerType.Text);
textLayer.text = "Advanced TypeScript with Doge";
textLayer.fontSize = "30px";
textLayer.position.y += 20;

const project: Project = {
    layers: [createLayer(LayerType.Image), textLayer],
    size: projectSize
};

render(project);

// const textLayer: TextLayer = {
// 	type: LayerType.Text,
// maxWidth: 1000,
// position: { x: 250, y: 100 },
// color: "blue",
// id: "10",
// rotation: 0,
// text: "Advanced TypeScript",
// fontSize: "30px"
// };

// const imageLayer: ImageLayer = {
// 	type: LayerType.Image,
// 	position: { x: 0, y: 0 },
// 	id: "20",
// 	rotation: 0,
// 	src: "doge.jpg",
// 	maxBounds: { width: projectSize.width }
// };
