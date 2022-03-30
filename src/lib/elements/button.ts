import { main, state } from "../index"
import { recursiveSearch } from "./index"

export default function buildButtonElement(component: GroupNode, i: number) {
    let elClass = `${component.name.slice(8).toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:]', 'g'), '-')}`

    let comp = `button class="${elClass}">`
    state.tempBlock.push(main.space(i) + "<" + comp)

    if (component.children && component.children.length > 0)
        recursiveSearch(component, i + 1)
    console.log("a button", state.tempBlock)
    state.tempBlock.pop()
    state.tempBlock.push(main.space(i) + "</button>")
    state.tempBlock.forEach(e => {
        state.tempLine += e + '\n'
    })
    state.tempBlock = []
    return state.tempLine
}