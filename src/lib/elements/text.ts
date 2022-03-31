import  generateStyle  from "../styles"
import {  main } from "../index"

export default function buildTextElement(component: TextNode, i: number) {
    console.log("build", component.name)

    generateStyle(component)
    let elClass = `${component.name.toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:;]', 'g'), '-')}`
    let comp = main.space(i) + `<p class="${elClass}">${component.characters}</p>`
    return comp
}