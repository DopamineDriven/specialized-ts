import { ImageLayer, Layer, LayerType, Project, TextLayer } from "./types";
import { createCanvas, loadImage, Canvas } from "canvas";
import process from "process";
import fs from "fs";
import open from "open";
const probe = require("probe-image-size");

const BASE_IMAGE_PATH = `${process.env.ROOT}/modules/common/images`;

const isTextLayer = (layer: Layer): layer is TextLayer => {
	return layer.type === LayerType.Text;
};

const isImageLayer = (layer: Layer): layer is ImageLayer => {
	return layer.type === LayerType.Image;
};

const renderImage = async (canvas: Canvas, layer: ImageLayer) => {
	const ctx = canvas.getContext("2d");
	const imagePath = `${BASE_IMAGE_PATH}/${layer.src}`;
	console.log(`Loading image with path ${imagePath}`);

	const fileBuffer = fs.readFileSync(imagePath);

	const image = await loadImage(fileBuffer);

	const imageSize = probe.sync(fileBuffer);

	const maxScaleSize = {
		width: layer.maxBounds.width || imageSize.width,
		height: layer.maxBounds.height || imageSize.height
	};

	const scale = Math.min(
		maxScaleSize.height / imageSize.height,
		maxScaleSize.width / imageSize.width
	);

	ctx.drawImage(
		image,
		layer.position.x,
		layer.position.y,
		scale * imageSize.width,
		scale * imageSize.height
	);
};

const renderText = async (canvas: Canvas, layer: TextLayer) => {
	const ctx = canvas.getContext("2d");
	ctx.font = `${layer.fontSize}px Helvetica Arial`;
	ctx.fillStyle = layer.color;
	ctx.fillText(layer.text, layer.position.x, layer.position.y, layer.maxWidth);
};

const exportPng = async (canvas: Canvas) => {
	return new Promise((resolve) => {
		const fileName = `${__dirname}/../../out.png`;

		const out = fs.createWriteStream(fileName);
		const stream = canvas.createJPEGStream();
		stream.pipe(out);
		out.on("finish", () => open(fileName).then(resolve));
	});
};

const renderAsync = async (project: Project) => {
	const canvas = createCanvas(project.size.width, project.size.height);

	for (const layer of project.layers) {
		try {
			if (isTextLayer(layer)) {
				await renderText(canvas, layer);
			}

			if (isImageLayer(layer)) {
				await renderImage(canvas, layer);
			}
		} catch (error) {
			console.error(`Could not render with id ${layer.id}`);
			console.error(error.stack);
			process.exit(1);
		}
	}

	await exportPng(canvas);
};

export const render = (project: Project) => {
	renderAsync(project)
		.then(() => console.log("finished rendering"))
		.catch((err) => console.error(err));
};
