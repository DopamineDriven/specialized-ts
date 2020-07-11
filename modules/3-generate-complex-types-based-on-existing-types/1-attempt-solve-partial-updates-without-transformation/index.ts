import { ImageLayer, LayerType, Project, Size, TextLayer } from "../types";
import { render } from "../render";

const projectSize: Size = {
	width: 960,
	height: 650
};

const textLayer: TextLayer = {
	type: LayerType.Text,
	maxWidth: 1000,
	position: { x: 250, y: 90 },
	color: "blue",
	id: "10",
	rotation: 0,
	text: "Advanced TypeScript with Doge",
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

function setTextLayerProps(
	project: Project,
	id: string,
	props: { [key: string]: any }
) {
	const layer = project.layers.find((l) => l.id === id);
	if (layer) {
		Object.entries(props).forEach(([k, v]) => {
			(layer as any)[k] = v;
		});
	}
}

const project: Project = {
	layers: [imageLayer, textLayer],
	size: projectSize
};

setTextLayerProps(project, "10", {
	shouldnotwork: false
});

render(project);
