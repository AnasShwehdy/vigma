
import { main } from "../index"

export default function buildComponentElement(component: ComponentNode | InstanceNode, i: number) {
    let comp = `${component.name.toLowerCase().replace(" ", "")} />`
    return main.space(i) + "<" + comp
}