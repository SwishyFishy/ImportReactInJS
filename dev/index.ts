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
function AssignReactComponent(rootElement: Element, component: any, props: Object = {})
{
    createRoot(rootElement).render(
        createElement(component, props, 
            createElement("div", {dangerouslySetInnerHTML: {
                __html: rootElement.innerHTML
            }})
        )
    );
}

// Callable Functions //
////////////////////////

// Maps a React component to a single HTML with passed id
export function ImportReactComponentById(rootId: string, component: any, props: Object = {})
{
    // Get element with passed id
    const rootElement: Element | null = document.getElementById(rootId);
    if (!rootElement)
    {
        throw new ElementDoesNotExistError(`No element exists with id ${rootId}`);
    }
    
    // Create the passed React component at the root element
    AssignReactComponent(rootElement, component, props);
}

// Maps a React component to each HTML element with passed class
// props: Object        -> props are passed to each component
// props: Object[]      -> props.length must equal number of elements with passed class. Bijective mapping
export function ImportReactComponentByClass(rootClass: string, component: any, props: Object | Object[] = {})
{
    // Get elements with passed class
    const rootElements: HTMLCollectionOf<Element> = document.getElementsByClassName(rootClass);
    if (rootElements.length == 0)
    {
        throw new ElementDoesNotExistError(`No elements exist with class ${rootClass}`);
    }
    
    // Create the passed React component at the root elements
    if (Array.isArray(props))
    {
        if (rootElements.length != props.length)
        {
            throw new ElementPropsCountMismatchError(`Number of extant elements with class ${rootClass} does not match props.length`);
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

// Maps a React component to each HTML element that is passed tag
// props: Object        -> props are passed to each component
// props: Object[]      -> props.length must equal number of elements that are passed tag. Bijective mapping
export function ImportReactComponentByTag(rootTag: string, component: any, props: Object | Object[] = {})
{
// Get elements with passed class
    const rootElements: HTMLCollectionOf<Element> = document.getElementsByTagName(rootTag);
    if (rootElements.length == 0)
    {
        throw new ElementDoesNotExistError(`No elements exist named ${rootTag}`);
    }
    
    // Create the passed React component at the root elements
    if (Array.isArray(props))
    {
        if (rootElements.length != props.length)
        {
            throw new ElementPropsCountMismatchError(`Number of extant ${rootTag} elements does not match props.length`);
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