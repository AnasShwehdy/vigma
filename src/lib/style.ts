import { state } from "./index"

export function generateStyle(component: SceneNode) {
    if (component.type === "TEXT") generators.generateText(component)
}

export const generators = {
    generateText: (component: TextNode) => {
        state.pageStyle.push(`.${component.name.toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:]', 'g'), '-')}{`)
        let textStyle = []
        if (component.fills[0]) {
            const color = generateColor(component)
            textStyle.push(color)
        }
        generateType(component)

        state.pageStyle.push(textStyle.toString())
        state.pageStyle.push("}")
    }
}

function generateType(component: TextNode) {
    generateFont(component)
    generateFontSize(component)
}
function generateFont(component: TextNode) {
    if (component.fontName !== figma.mixed) {
        let font = component.fontName;
        state.pageStyle.push(`font-family: '${String(font.family)}';`)
        state.pageStyle.push(`font-style: normal;`)
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
        state.pageStyle.push(`font-weight: ${weight};`)

        if (component.lineHeight !== figma.mixed) {
            let lineHeight: any = 0;
            if (component.lineHeight.unit == "PIXELS")
                lineHeight = `${component.lineHeight.value}px`
            else if (component.lineHeight.unit == "PERCENT")
                lineHeight = `${component.lineHeight.value.toFixed(0)}%`
            else if (component.lineHeight.unit == "AUTO")
                lineHeight = `auto`
            state.pageStyle.push(`line-height: ${String(lineHeight)};`)
        }
        if (component.letterSpacing !== figma.mixed) {
            let letterSpacing: any = 0;
            if (component.letterSpacing.unit == "PIXELS")
                letterSpacing = `${component.letterSpacing.value}px`
            else if (component.letterSpacing.unit == "PERCENT")
                letterSpacing = `${component.letterSpacing.value.toFixed(0)}%`
            state.pageStyle.push(`letter-spacing: ${String(letterSpacing)};`)
        }
        component.textAlignHorizontal
        state.pageStyle.push(`text-align: ${String(component.textAlignHorizontal.toLowerCase())};`)

    }

}
function generateFontSize(component: TextNode) {
    state.pageStyle.push(`font-size: ${String(component.fontSize)}px;`)
}
function generateColor(component: TextNode) {
    return `color: ${getSolidColor(component)}`
}
// This is any, because idk which NodeTypes have fills and and which doesn't
function getSolidColor(component: any) {
    let fillColor = component.fills[0]
    let color = getRGB(fillColor.color, fillColor.opacity)
    return color
}

function getRGB({ r, g, b }: any, a: number) {
    let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
    let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]} ${a.toFixed(2)})`
    return color
}