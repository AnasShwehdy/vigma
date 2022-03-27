import { elementBuilder } from "./elementBuilders"


// State variabls
export var state = {
    pageComponents: [],
    tempBlock: [],
    tempLine: "",
}
export const main = {
    createNuxtApp: (figma: PluginAPI) => {
        let newApp = { pages: [] };
        figma.root?.children[0]?.children?.forEach((page) => {
            if (page.type === 'FRAME') {
                let pageProps = {
                    name: page.name,
                    components: state.pageComponents,
                    template: generateTemplate(page.children),
                    figmaComponents: page.children
                }
                state.pageComponents.forEach(e => {
                    e.template = generateTemplate(e.component.children);
                    delete e.component;
                })
                newApp.pages.push(pageProps);
            }
            state.pageComponents = [];
        });

        return newApp;
    },

    //functions
    getSolidColor: (component) => {
        let fillColor = component.fills[0];
        let color = getRGB(fillColor.color, fillColor.opacity);
        return color;
    },


}

function generateTemplate(components: readonly SceneNode[]) {
    let template = [];
    components.forEach((component: SceneNode) => {

        state.tempLine = "";
        state.tempBlock = [];

        let i = 2;
        template.push(elementBuilder(component, i));
    });
    template.reverse();
    template.unshift("  <div>");
    template.unshift("<template>");
    template.push("  </div>");
    template.push("</template>");

    return template;
}

function getRGB({ r, g, b }, a) {
    let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
    let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]} / ${(a * 100).toFixed(0)}%)`
    return color
}