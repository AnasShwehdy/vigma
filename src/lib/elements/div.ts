// import { generateStyle } from "../style"
import { main, state } from "../index"
import { recursiveSearch } from "./index"

// This is made "any" here,
// because i don't know what types of nodes have the children property yet.

export default function buildDivElement(component: any, i: number) {

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
}