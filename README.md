# Import React Component

## Why?

Certain projects don't lend themselves to using the React framework, or are already well into development. This package provides multiple functions that each bridge the gap between vanilla JS or TS and React, enabling the use of React components inside of a non-React project. This way, React component found on NPM can be easily integrated into a design, or sections of a design that lend themselves to React's strengths can take full advantage of the framework.

## Caveats

This package does not transpile JSX into vanilla JS. Rather, it brings React along as a dependency and handles the implementation of React DOMs into the larger project. Since React is a dependency of this project, you will not save any space on installation as opposed to just installing React. The intended function of this package is to make React a more flexible option for designs that can only partially embrace its strengths.

## WARNING

This package uses React's `dangerouslySetInnerHTML` parameter to apply children to imported React components. Do not pass unsanitized or untrusted HTML as a child to any imported React component. [View React's documentation here](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

## Usage

### Setup

Import any React components, and the desired function from this package.

```javascript
import { ExampleReactComponent } from '...';
import { ImportReactComponentById, ImportReactComponentByClass, ImportReactComponentByTag } from 'import-react-component';
```

Create an HTML element which will act as the root of the imported React DOM. This can be any element, but since it's function is purely syntactic it's recommended to use a custom element.

```html
<react-component>
    <p>Children</p>
    <p>More children</p>
</react-component>
```

Children of an HTML element that is the root of a React component are passed to that component as children.

### Functions

**Import a single React component at an HTML element distinguished by its `id` attribute.**

`ImportReactComponentById(rootId: string, component: any, props?: Object)`

- `rootId`: The HTML Id of the root element.
- `component`: The imported React component.
- `props`: Optional. An object containing props that will be passed to the React component.

**Import one or more instances of a React component at each HTML element distinguished by their `class` attribute.**

`ImportReactComponentByClass(rootClass: string, component: any, props?: Object | Object[])`

- `rootClass`: The HTML class of the root element or elements.
- `component`: The imported React component.
- `props`: Optional. If passed as an object, those props are passed to each instance of the React component. If passed as an array of objects, the array must contain exactly as many objects as there are HTML elements with the passed `rootClass`. The props are bijectively mapped to the React components such that props are applied in sequence from the start to the end of the document.

**Import one or more instances of a React component at each HTML element distinguished by their tag.**

`ImportReactComponentByTag(rootTag: string, component: any, props?: Object | Object[])`

- `rootTag`: The HTML tag of the root element or elements.
- `component`: The imported React component.
- `props`: Optional. If passed as an object, those props are passed to each instance of the React component. If passed as an array of objects, the array must contain exactly as many objects as there are HTML tags of the passed `rootTag`. The props are bijectively mapped to the React components such that props are applied in sequence from the start to the end of the document.

## Examples

