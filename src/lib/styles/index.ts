import generateText from "./text"
import generateButton from "./button"

export default function generateStyle(component: SceneNode) {
    if (component.type === "TEXT") generateText(component)
    if (component.type === "RECTANGLE") generateButton(component)
}


export const general = {
    getRGB: ({ r, g, b }: any) => {
        let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
        let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]})`
        return color
    }

}