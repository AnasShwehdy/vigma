import { state, main } from "./index"

export function generateStyle(component: SceneNode) {
    if (component.type === "TEXT") generators.generateText(component)
    if (component.type === "RECTANGLE") generators.generateButton(component)
}

export const generators = {
    generateText: (component: TextNode) => {
        state.pageStyle.push(`.${component.name.toLowerCase().replace(" ", "") + '-' + component.id.replace(RegExp('[:;]', 'g'), '-')} {`)
        let textStyle = []
        if (component.fills[0]) {
            const color = generateTextColor(component)
            textStyle.push(color)
            textStyle.push(`${main.space(1)}opacity: ${component.fills[0].opacity.toFixed(2)};`)
        }
        generateType(component)

        state.pageStyle.push(textStyle.toString())
        state.pageStyle.push("}")
    },
    generateButton: (component: RectangleNode) => {
        let elClass = `${component.parent.name.slice(8).toLowerCase().replace(" ", "") + '-' + component.parent.id.replace(RegExp('[:]', 'g'), '-')}`
        state.pageStyle.push(`.${elClass} {`)

        let buttonStyle = []
        let stroke: Paint = component.strokes[0]
        if (stroke && stroke.visible) {
            const strokeColor = generateBorderColor(stroke)
            buttonStyle.push(strokeColor)
            component.strokeWeight
            state.pageStyle.push(`${main.space(1)}border-width: ${String(component.strokeWeight)}px;`)
            state.pageStyle.push(`${main.space(1)}border-style: solid;`)

        }

        let background: Paint = component.fills[0]
        if (background.visible) {
            const bgColor = generateBgColor(background)
            buttonStyle.push(bgColor)
        }
        // buttonStyle.push(`${main.space(1)}opacity: ${component.strokes[0].opacity.toFixed(2)};`)

        state.pageStyle.push(`${main.space(1)}border-radius: ${String(component.cornerRadius)}px;`)
        state.pageStyle.push(buttonStyle.toString())

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
function generateBorderColor(stroke: Paint) {
    return `${main.space(1)}border-color: ${getBorderSolidColor(stroke)};`
}
function generateBgColor(background: Paint) {
    return `${main.space(1)}background-color: ${getBgSolidColor(background)};`
}
function getTextSolidColor(component: TextNode) {
    let fillColor = component.fills[0]
    let color = getRGB(fillColor.color)
    return color
}
function getBorderSolidColor(stroke: Paint) {
    if (stroke.type === "SOLID") {
        let color = getRGB(stroke.color)
        return color
    }
    return "null"
}
function getBgSolidColor(background: Paint) {
    if (background.type === "SOLID") {
        let color = getRGB(background.color)
        return color
    }
    return "null"
}

function getRGB({ r, g, b }: any) {
    let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
    let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]})`
    return color
}
