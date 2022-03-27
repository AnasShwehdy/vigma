import { state, main } from "./index"
import { generateComponent } from "./componentsHandler"
import { generateStyle } from "./style"



export function elementBuilder(component: SceneNode, i: number) {
    if (component.type === 'TEXT') {
        return builders.buildTextElement(component, i)
    }
    if (component.type === 'GROUP') {
        return builders.buildDivElement(component, i)
    }
    if (component.type === 'COMPONENT' || component.type === "INSTANCE") {
        if (!state.pageComponents.find(e => e.name == component.name))
            generateComponent(component)
        return builders.buildComponentElement(component, 2)
    }
    if (component.type === 'RECTANGLE') {
        return builders.buildDivElement(component, i)
    }

}
const builders = {
    buildTextElement: (component: TextNode, i: number) => {

        generateStyle(component)
        let comp = main.space(i) + `<p class="${component.name.toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:]', 'g'), '-')}">${component.characters}</p>`
        return comp
    },
    // This is made "any" here,
    // because i don't know what types of nodes have the children property yet.
    buildDivElement: (component: any, i: number) => {
        let comp = `div id="${component.name.toLowerCase().replace(" ", "")}">`
        state.tempBlock.push(main.space(i) + "<" + comp)

        if (component.children && component.children.length > 0)
            recursiveSearch(component, i + 1)

        state.tempBlock.push(main.space(i) + "</div>")
        state.tempBlock.forEach(e => {
            state.tempLine += e + '\n'
        })
        state.tempBlock = []
        return state.tempLine
    },
    buildComponentElement: (component: ComponentNode | InstanceNode, i: number) => {
        let comp = `${component.name.toLowerCase().replace(" ", "")} />`
        return main.space(i) + "<" + comp
    },

}

// This is used when we want to get the children of a parent element like "div"
function recursiveSearch(component: any, i: number) {

    for (let index = component.children.length - 1; index >= 0; index--) {
        let c = component.children[index]
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
            state.tempBlock.push(elementBuilder(c, i))
        }
    }
    // *****
    // ***Enable if you want to itrate the children in an ascending order
    // *****

    // component.children.forEach((c: any) => {
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
    //         state.tempBlock.push(elementBuilder(c, i + 1))
    //     }
    // })

}



