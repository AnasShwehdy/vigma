import buildTextElement from "./text"
import buildButtonElement from "./button"
import buildDivElement from "./div"
import buildRowElement from "./row"
import buildColumnElement from "./column"
import buildComponentElement from "./component"

import { generateComponent } from "../componentsHandler"
// import generateStyle from "../styles"
import { state } from "../index"

export function elementBuilder(component: SceneNode, i: number) {
    if (component.type === 'TEXT') {
        return buildTextElement(component, i)
    }
    else if (component.type === 'GROUP') {
        if (component.name.includes("button")) {
            return buildButtonElement(component, i)
        }
        if (component.name.includes("row")) {
            return buildRowElement(component, i)
        }
        return buildDivElement(component, i)
    }
    else if (component.type === 'COMPONENT' || component.type === "INSTANCE") {
        if (!state.pageComponents.find(e => e.name == component.name))
            generateComponent(component)
        return buildComponentElement(component, 2)
    }
    else return ""
    // if (component.type === 'RECTANGLE') {
    //     return generateStyle(component)
    //     // return buildDivElement(component, i)
    // }

}

// This is used when we want to get the children of a parent element like "div"
export function recursiveSearch(component: any, i: number) {
    // for (let index = component.children.length - 1; index >= 0; index--) {
    //     let c = component.children[index]
    //     console.log("rec", c.name)

    //     if (c.children) {
    //         if (c.children.length > 0) {

    //             // When it's a component, we wil not search inside it, instead we will build it using the elementBuilder(), and then generate it from there.

    //             if (c.type === "COMPONENT" || c.type === "INSTANCE") {
    //                 state.tempBlock.push(elementBuilder(c, i + 1))
    //                 return
    //             }


    //             return elementBuilder(c, i + 1)
    //         }
    //     }
    //     else {



    //         state.tempBlock.push(elementBuilder(c, i))
    //     }
    // }
    // *****
    // ***Enable if you want to itrate the children in an ascending order
    // *****

    component.children.forEach((c: any) => {

        if (c.children) {
            if (c.children.length > 0) {

                // When it's a component, we wil not search inside it, instead we will build it using the elementBuilder(), and then generate it from there.

                if (c.type === "COMPONENT" || c.type === "INSTANCE") {
                    state.tempBlock.push(elementBuilder(c, i + 1))
                    return
                }
                return elementBuilder(c, i + 1)
            }
        }
        else {
            console.log(c.name)
            state.tempBlock.push(elementBuilder(c, i))
        }
    })

}
