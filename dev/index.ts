import { createRoot, Root } from 'react-dom/client';
import { createElement } from 'react';

// Errors //
////////////

// Passed HTML element identifier fails to resolve
class ElementDoesNotExistError extends Error
{
    constructor(message: string)
    {
        super(message);
        this.name = "ElementDoesNotExistError";
    }
}

// Passed props array length does not match number of HTML elements
class ElementPropsCountMismatchError extends Error
{
    constructor(message: string)
    {
        super(message);
        this.name = "ElementPropsCountMismatchError";
    }
}

// Create the React components //
/////////////////////////////////
type dom = {
    type: string,
    root: Root,
    element: React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}
let reactComponents: dom[] = []

// Assign a passed React component with passed props to passed HTMLElement
// Assign the children of passed HTMLElement as children of created React component
function AssignReactComponent(componentType: string, rootElement: Node, component: any, props: Object = {})
{
    // Create the root and the component
    const castRootElement = rootElement as Element;
    const root = createRoot(castRootElement)
    const content = createElement(component, props, 
                        createElement("div", {dangerouslySetInnerHTML: {
                            __html: castRootElement.innerHTML
                        }})
                    );

    // Add the root and content to the reactElements array
    reactComponents.push({type: componentType, root: root, element: content});
}

// Render all components
export function RenderReactComponents()
{
    reactComponents.forEach((dom) => {
        dom.root.render(dom.element);
    });
}

// Callable Function //
///////////////////////

// Maps a React component to each <react-component> HTML element
// props: Object        -> props are passed to each component
// props: Object[]      -> props.length must equal number of elements that are passed tag. Bijective mapping
export function ImportReactComponents(componentType: string, component: any, props: Object | Object[] = {})
{
    // Get elements with passed class
    const rootElements: NodeList = document.querySelectorAll(`react-component[data-component=${componentType}]`);

    // Check that at least one component will be created
    if (rootElements.length <= 0)
    {
        throw new ElementDoesNotExistError(`No ${componentType} react-component elements exist.`);
    }

    // Remove duplicates from the reactComponents array
    reactComponents = reactComponents.filter((dom) => dom.type != componentType);

    // Create the passed React component at the root elements
    if (Array.isArray(props))
    {
        if (rootElements.length != props.length)
        {
            throw new ElementPropsCountMismatchError(`Number of extant ${componentType} elements does not match props.length`);
        }
        else
        {
            for (let i: number = 0; i < rootElements.length; i++)
            {
                AssignReactComponent(componentType, rootElements[i], component, props[i]);
            }
        }
    }
    else
    {
        for (let i: number = 0; i < rootElements.length; i++)
        {
            AssignReactComponent(componentType, rootElements[i], component, props);
        }
    }
}