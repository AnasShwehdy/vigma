import { state, main } from "../index"
import { general } from "./index"


export default function generateText(component: TextNode) {
    state.pageStyle.push(`.${component.name.toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:;]', 'g'), '-')} {`)
    let textStyle = []
    if (component.fills[0]) {
        const color = generateTextColor(component)
        textStyle.push(color)
        textStyle.push(`${main.space(1)}opacity: ${component.fills[0].opacity.toFixed(2)};`)
    }
    generateType(component)

    state.pageStyle.push(textStyle.toString())

    if (component.name.includes("Button")) {
        state.pageStyle.push(`${main.space(1)}display: flex;`)
        state.pageStyle.push(`${main.space(1)}align-items: center;`)
        state.pageStyle.push(`${main.space(1)}justify-content: center;`)
        state.pageStyle.push(`${main.space(1)}height: 100%;`)
    }
    state.pageStyle.push("}")
}


function generateType(component: TextNode) {
    generateFont(component)
    generateFontSize(component)
}
function generateFont(component: TextNode) {
    if (component.fontName !== figma.mixed) {
        let font = component.fontName;
        state.pageStyle.push(`${main.space(1)}font-family: '${String(font.family)}';`)
        state.pageStyle.push(`${main.space(1)}font-style: normal;`)
        let weight = 0;
        switch (font.style) {
            case "Thin":
                weight = 100;
                break;
            case "ExtraLight":
                weight = 200;
                break;
            case "Light":
                weight = 300;
                break;
            case "Regular":
                weight = 400;
                break;
            case "Medium":
                weight = 500;
                break;
            case "SemiBold":
                weight = 600;
                break;
            case "Bold":
                weight = 700;
                break;
            case "ExtraBold":
                weight = 800;
                break;
            case "Black":
                weight = 900;
                break;

            default: 400
                break;
        }
        state.pageStyle.push(`${main.space(1)}font-weight: ${weight};`)

        if (component.lineHeight !== figma.mixed) {
            let lineHeight: any = 0;
            if (component.lineHeight.unit == "PIXELS")
                lineHeight = `${component.lineHeight.value}px`
            else if (component.lineHeight.unit == "PERCENT")
                lineHeight = `${component.lineHeight.value.toFixed(0)}%`
            else if (component.lineHeight.unit == "AUTO")
                lineHeight = `auto`
            state.pageStyle.push(`${main.space(1)}line-height: ${String(lineHeight)};`)
        }
        if (component.letterSpacing !== figma.mixed) {
            let letterSpacing: any = 0;
            if (component.letterSpacing.unit == "PIXELS")
                letterSpacing = `${component.letterSpacing.value}px`
            else if (component.letterSpacing.unit == "PERCENT")
                letterSpacing = `${(component.letterSpacing.value / 100)}em`
            state.pageStyle.push(`${main.space(1)}letter-spacing: ${String(letterSpacing)};`)
        }
        component.textAlignHorizontal
        state.pageStyle.push(`${main.space(1)}text-align: ${String(component.textAlignHorizontal.toLowerCase())};`)

    }

}
function generateFontSize(component: TextNode) {
    state.pageStyle.push(`${main.space(1)}font-size: ${String(component.fontSize)}px;`)
}
function generateTextColor(component: TextNode) {
    return `${main.space(1)}color: ${getTextSolidColor(component)};`
}
function getTextSolidColor(component: TextNode) {
    let fillColor = component.fills[0]
    let color = general.getRGB(fillColor.color)
    return color
}