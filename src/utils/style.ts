import { state } from "./index"

export function generateStyle(component: SceneNode) {
    if (component.type === "TEXT") generators.generateText(component)
}

export const generators = {
    generateText: (component: TextNode) => {
        state.pageStyle.push(`.${component.name.toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:;]', 'g'), '-')}{`)
        let textStyle = [];
        if (component.fills[0]) {
            const color = generateColor(component)
            textStyle.push(color);
        }

        state.pageStyle.push(textStyle.toString())
        state.pageStyle.push("}")
    }
}
function generateColor(component: TextNode) {
    return `color: ${getSolidColor(component)};`
}
// This is any, because idk which NodeTypes have fills and and which doesn't
function getSolidColor(component: any) {
    let fillColor = component.fills[0];
    let color = getRGB(fillColor.color, fillColor.opacity)
    return color
}

function getRGB({ r, g, b }: any, a: number) {
    let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
    let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]} / ${(a * 100).toFixed(0)}%)`
    return color
}