import generateText from "./text"
import generateButton from "./button"
import generateRow from "./row"

export default function generateStyle(component: SceneNode, type: String = "") {
    if (component.type === "TEXT") return generateText(component)
    if (component.type === "RECTANGLE") {
        if (type == "Row")
            return generateRow(component)
        if (type == "Button")
            return generateButton(component)
    }
}


export const general = {
    getRGB: ({ r, g, b }: any) => {
        let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
        let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]})`
        return color
    }

}