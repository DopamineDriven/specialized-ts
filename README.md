# Specialized-TypeScript

- https://code.visualstudio.com/docs/editor/debugging#_launch-configurations

## Differentiating between types

- Differentiating between types at
  - Compile Time
  - Run Time
- Avoid using
  - the 'any' type
  - the ts-ignore comment

## Conditional types

- Implementing overloads for a function without using actual overloads
- Build a factory function that delivers different results based on params passed in without using overloads

## Generating new types from existing types

- Generate a function signature based on existing functions
  - Add on extra params while staying type-safe

## Extending objects &rarr; Symbols

- Use symbols to prevent the following from happening to metadata
  - clashes
  - unwanted serialization
  - unwanted iteration

## Working with Tuples

- useState hook in React relies on Tuples
- RxJS relies on Tuples when combining observables
  - https://blog.logrocket.com/understanding-rxjs-observables/
- Used in a design-tool context herein
  - Describe dimensions and positions of objects

## Breaking classes down &rarr; Mixins

- Challenge
  - Make classes composable and add concerns without ending up with massive files
- Split a class into Mixins
  - Understand how to compose a class in a programatically advantageous way

## Separating structure from looping &rarr; Iterators

- Iterators make it possible for end-users to to loop through objects in a friendly manner
  - Separate the way in which objects are stored vs how they're consumed
- Learn how to Bold a Custom Iterator
  - Loop over a document with layers
  - Simultaneously store the layers as a keyed object

## Dealing with sequences that change over time &rarr; Generators

- Generators &rarr; exceedingly underutilized concept
- How are Generators powerful?
  - Emit values over time
  - Pause consumption of possible infinite states of data
- Render an image that changes every second
  - allow users to pause and resume it

---

## Launching files in this repository

- After cloning the repo and installing dependencies, click F5 to launch a file
- How is this achieved?
  - Examine the .vscode/launch.json file contents

```json
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Current TS File",
      "type": "node",
      "request": "launch",
      "args": ["${relativeFile}"],
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "env": {
        "TS_NODE_PROJECT": "${workspaceRoot}/tsconfig.json",
        "ROOT": "${workspaceRoot}"
      }
    }
```

## Three levels of Differentiation

- (1) typeof keyword
  - Differentiate between value types

```ts
typeof variable === "string" | "number" | ...
```

- (2) instanceof keyword
  - Differentiate between instances of classes

```ts
variableName instanceof ClassName;
```

- (3) user-defined type guards
  - Most powerful of the three
  - Expression that performs a runtime check that guarantees the type in some scope
    - https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types

```ts
const isX = (var): var is TheType => {};
```

- assertion is a return function
  - variable passed to it is of a specific type

---

## Flexibility with Conditional Types

- add two new interfaces to types.ts

```ts
export interface TextMeta {
	fontFoundry: string;
	licenseExpiration: Date;
}

export interface ImageMeta {
	origin: string;
	format: "jpg" | "png";
}
```

### Incorporate Functions with varying signatures

- overload functions

```ts
function setMeta(layer: TextLayer, meta: TextMeta): void;
function setMeta(layer: ImageLayer, meta: ImageMeta): void;
function setMeta(
	layer: ImageLayer | TextLayer,
	meta: ImageMeta | TextMeta
): void {
	layer.meta = meta;
}

setMeta(imageLayer, {
	format: "jpg",
	origin: "Download"
});

setMeta(textLayer, {
	fontFoundry: "OS stock",
	licenseExpiration: new Date(2025, 7, 10)
});
```

### Type of a Param dependant on the Type of Another

- Cannot use conditional types without generics

```ts
function setMeta<T extends TextLayer | ImageLayer>(
	layer: T,
	meta: T extends TextLayer ? TextMeta : ImageMeta
): void {
	layer.meta = meta;
}
```

- deciphering the snippet above for param meta
  - if T extends TextLayer
    - then meta will be TextMeta
    - else meta will be ImageMeta

### Function return type dependant on Param types

- Factory function usage

```ts
type FactoryLayer<T> = T extends LayerType.Text ? TextLayer : ImageLayer;

function createLayer<T extends LayerType>(type: T): FactoryLayer<T> {
	if (type === LayerType.Text) {
		return {
			color: "blue",
			fontSize: "30px",
			id: new Date().toISOString(),
			maxWidth: 1000,
			position: { x: 250, y: 100 },
			rotation: 0,
			text: "Advanced TypeScript",
			type: LayerType.Text
		} as FactoryLayer<T>;
	}

	return {
		id: new Date().toISOString(),
		maxBounds: { width: 400 },
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
```

- Note:
  - Function overloading (as seen previously) is a more idiomatic approach to this problem
  - Solid example of the power of conditional types however
