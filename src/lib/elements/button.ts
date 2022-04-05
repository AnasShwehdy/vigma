import { main, state } from "../index"
import { recursiveSearch } from "./index"
import generateStyle from "../styles"

export default function buildButtonElement(component: GroupNode, i: number) {

    let name = component.name.search(RegExp("\w*:"));
    let elClass = `${component.name.slice(0, name).toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:;]', 'g'), '-')}`
    let background = component.children.find(e => e.name == "Background")
    if (background)
        generateStyle(background, "Button")


    let comp = `button class="${elClass}">`
    state.tempBlock.push(main.space(i) + "<" + comp)

    if (component.children && component.children.length > 0)
        recursiveSearch(component, i + 1)
    state.tempBlock.push(main.space(i) + "</button>")
    state.tempBlock.forEach(e => {
        state.tempLine += e + '\n'
    })
    state.tempBlock = []
    return state.tempLine
}