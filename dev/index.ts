import { createRoot } from 'react-dom/client';
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

// Assign a passed React component with passed props to passed HTMLElement
// Assign the children of passed HTMLElement as children of created React component
function AssignReactComponent(rootElement: Node, component: any, props: Object = {})
{
    let castRootElement = rootElement as Element;

    createRoot(castRootElement).render(
        createElement(component, props, 
            createElement("div", {dangerouslySetInnerHTML: {
                __html: castRootElement.innerHTML
            }})
        )
    );
}

// Callable Function //
///////////////////////

// Maps a React component to each HTML element that is passed tag
// props: Object        -> props are passed to each component
// props: Object[]      -> props.length must equal number of elements that are passed tag. Bijective mapping
export function ImportReactComponents(componentType: string, component: any, props: Object | Object[] = {})
{
// Get elements with passed class
    const rootElements: NodeList = document.querySelectorAll(`react-component[data-component=${componentType}]`);
    if (rootElements.length == 0)
    {
        throw new ElementDoesNotExistError(`No ${componentType} react-component elements exist.`);
    }

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
                AssignReactComponent(rootElements[i], component, props[i]);
            }
        }
    }
    else
    {
        for (let i: number = 0; i < rootElements.length; i++)
        {
            AssignReactComponent(rootElements[i], component, props);
        }
    }
}