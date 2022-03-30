import { generateStyle } from "../style"
import {  main } from "../index"

export default function buildTextElement(component: TextNode, i: number) {

    generateStyle(component)
    let elClass = `${component.name.toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:]', 'g'), '-')}`
    let comp = main.space(i) + `<p class="${elClass}">${component.characters}</p>`
    return comp
}