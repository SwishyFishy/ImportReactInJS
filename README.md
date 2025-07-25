# Import React Component

## Why?

Certain projects don't lend themselves to using the React framework, or are already well into development. This package provides multiple functions that each bridge the gap between vanilla JS or TS and React, enabling the use of React components inside of a non-React project. This way, React components found on NPM can be easily integrated into a design, or sections of a design that lend themselves to React's strengths can take full advantage of the framework.

## Caveats

This package does not transpile JSX into vanilla JS. Rather, it brings React along as a dependency and handles the implementation of React DOMs into the larger project. Since React is a dependency of this project, you will not save any space on installation as opposed to just installing React. The intended function of this package is to make React a more flexible option for designs that can only partially embrace its strengths.

## Usage

### Install

`npm i import-react-component`

### Setup

Import any React components and the `ImportReactComponents()` and `RenderReactComponents()` functions to a script attached to your HTML.

```typescript
import { ExampleReactComponent } from '...';
import { ImportReactComponents, RenderReactComponents } from 'import-react-component';
```

In your HTML, create a `<react-component>` HTML element with a `data-component` custom attribute. This element is the root of an imported React DOM, and you'll use the attribute to indicate which `<react-component>` elements spawn any given React component.

Your `<react-component>` element can have children, which will be passed into the React component as children.

```html
<react-component data-component="exampleReactComponent">
    <p>Children</p>
    <p>More children</p>
</react-component>
```

### WARNING

This package uses React's `dangerouslySetInnerHTML` parameter to apply children to imported React components. Do not pass unsanitized or untrusted HTML as a child to any imported React component. [View React's documentation here](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

### Adding the React Component

In the attached script, call the `ImportReactComponents()` function. This function has three parameters:

```typescript
ImportReactComponents(componentType: string, component: any, props: Object | Object[] = {})
```

* `componentType`: A value of one or more `data-component` attributes in your HTML.
* `component`: An imported React component.
* `props`: If passed as an object, the object is passed to the React component as props. If passed as an array, the first element is passed as props to the first React component, the second to the second, and so on.

Once all the React components have been imported, call the `RenderReactComponents()` function.

## Example

```html
html



<script type="module" src="...index.js"></script>

...

<react-component data-component="componentWithProps">
    <p>Hello World</p>
</react-component>
<react-component data-component="componentWithProps">
    <p>Hello World</p>
</react-component>
<react-component data-component="componentWithoutProps">
    <p>Hello World</p>
</react-component>
```

```typescript
index.js



import { ComponentWithProps, ComponentWithoutProps } from 'a-react-library';
import { ImportReactComponents, RenderReactComponents } from 'import-react-component';

ImportReactComponents("componentWithProps", ComponentWithProps, [{...}, {...}]);
ImportReactComponents("componentWithoutProps", ComponentWithoutProps);
RenderReactComponents();
```

## Expected Behaviour FAQ

### Dynamic DOM Updates

Because `ImportReactComponents()` uses the Document's `querySelectorAll()` method to retrieve the appropriate `<react-component>` elements as a static `NodeList`, updating the DOM dynamically will not add React components. To resolve this, call `ImportReactComponents()` and `RenderReactComponents()` again after dynamically inserting `<react-component>` elements.

```typescript
// Example: Creating a new React component dynamically whenever the user double-clicks

import { ExampleComponent } from 'a-react-library';
import { ImportReactComponents, RenderReactComponents } from 'import-react-component';

document.addEventListener('dblclick', () => {
    const newReactComponent = document.createElement("react-component");
    newReactComponent.setAttribute("data-component", "exampleComponent");
    document.body.appendChild(newReactComponent);
    ImportReactComponents("exampleComponent", ExampleComponent);
    RenderReactComponents();
});
```

### Nested React Components

Because the children of a spawned React component are set using React's `dangerouslySetInnerHTML()` function, nesting `<react-component>` elements will only spawn a React component on the outermost such element. To resolve this, build and import a single React component rather than importing multiple nested components. If the React component nests other React components dynamically, use a prop to indicate which nested component to render.
