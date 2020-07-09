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
variableName instanceof ClassName
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