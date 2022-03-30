import { state, main } from "../index"
import { general } from "./index"


export default function generateButton(component: RectangleNode) {
    let elClass = `${component.parent.name.slice(8).toLowerCase().replace(" ", "") + '-' + component.parent.id.replace(RegExp('[:;]', 'g'), '-')}`
    state.pageStyle.push(`.${elClass} {`)

    let buttonStyle = []
    // *******
    // Border
    // *******
    let stroke: Paint = component.strokes[0]
    if (stroke && stroke.visible) {
        const strokeColor = generateBorderColor(stroke)
        buttonStyle.push(strokeColor)
        component.strokeWeight
        state.pageStyle.push(`${main.space(1)}border-width: ${String(component.strokeWeight)}px;`)
        state.pageStyle.push(`${main.space(1)}border-style: solid;`)

    }
    // *******
    // Background
    // *******
    let background: Paint = component.fills[0]
    if (background && background.visible) {
        const bgColor = generateBgColor(background)
        buttonStyle.push(bgColor)
    }
    // buttonStyle.push(`${main.space(1)}opacity: ${component.strokes[0].opacity.toFixed(2)};`)

    state.pageStyle.push(`${main.space(1)}border-radius: ${String(component.cornerRadius)}px;`)
    state.pageStyle.push(buttonStyle.toString())
    state.pageStyle.push(`${main.space(1)}width: ${String(component.width)}px;`)
    state.pageStyle.push(`${main.space(1)}height: ${String(component.height)}px;`)

    state.pageStyle.push("}")
}


function generateBorderColor(stroke: Paint) {
    return `${main.space(1)}border-color: ${getBorderSolidColor(stroke)};`
}
function generateBgColor(background: Paint) {
    return `${main.space(1)}background-color: ${getBgSolidColor(background)};`
}

function getBorderSolidColor(stroke: Paint) {
    if (stroke.type === "SOLID") {
        let color = general.getRGB(stroke.color)
        return color
    }
    return "null"
}
function getBgSolidColor(background: Paint) {
    if (background.type === "SOLID") {
        let color = general.getRGB(background.color)
        return color
    }
    return "null"
}

