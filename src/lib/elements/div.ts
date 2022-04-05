// import { generateStyle } from "../style"
import { main, state } from "../index"
import generateStyle from "../styles"
import { recursiveSearch } from "./index"

// This is made "any" here,
// because i don't know what types of nodes have the children property yet.

export default function buildDivElement(component: GroupNode, i: number) {


    let elClass = `${component.name.toLowerCase()}`


    if (elClass.includes("col")) generateStyle(component, "Col")
    // Create users: col-6
    let name = component.name.search(RegExp(":", "g"));
    console.log("name", name)
    elClass = `${component.name.slice(name + 1).toLowerCase()}`

    let comp = `div class="${elClass}">`
    state.tempBlock.push(main.space(i) + "<" + comp)

    if (component.children && component.children.length > 0)
        recursiveSearch(component, i + 1)

    state.tempBlock.push(main.space(i) + "</div>")
    state.tempBlock.forEach(e => {
        state.tempLine += e + '\n'
    })
    state.tempBlock = []
    return state.tempLine
}