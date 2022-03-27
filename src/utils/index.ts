export const getRGB = ({ r, g, b }, a) => {
    let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
    let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]} / ${(a * 100).toFixed(0)}%)`
    return color
}

export default {
    //functions
    getSolidColor(component) {
        let fillColor = component.fills[0];
        let color = getRGB(fillColor.color, fillColor.opacity);
        return color;
    },


}