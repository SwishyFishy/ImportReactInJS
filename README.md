# Import React Component

## Why?

Certain projects don't lend themselves to using the React framework, or are already well into development. This package provides multiple functions that each bridge the gap between vanilla JS or TS and React, enabling the use of React components inside of a non-React project. This way, React component found on NPM can be easily integrated into a design, or sections of a design that lend themselves to React's strengths can take full advantage of the framework.

## Caveats

This package does not transpile JSX into vanilla JS. Rather, it brings React along as a dependency and handles the implementation of React DOMs into the larger project. Since React is a dependency of this project, you will not save any space on installation as opposed to just installing React. The intended function of this package is to make React a more flexible option for designs that can only partially embrace its strengths.
