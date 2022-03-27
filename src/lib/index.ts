import { elementBuilder } from "./elementBuilders"


// State variabls
export var state = {
    pageComponents: [],
    pageStyle: [],
    tempBlock: [],
    tempLine: "",
}
export const main = {
    createNuxtApp: (figma: PluginAPI) => {
        let newApp = { pages: [] }

        figma.root?.children[0]?.children?.forEach((page) => {


            if (page.type === 'FRAME') {
                let pageProps = {
                    name: page.name,
                    components: state.pageComponents,
                    template: generateTemplate(page.children),
                    style: state.pageStyle,
                    figmaComponents: page.children
                }
                state.pageComponents.forEach(e => {
                    e.template = generateTemplate(e.component.children)
                    delete e.component
                })
                newApp.pages.push(pageProps)
            }
            state.pageComponents = []
            // if there are no styles in the page
            if (state.pageStyle.length > 0) {
                state.pageStyle.unshift("<style>")
                state.pageStyle.push("</style>")
            }
            state.pageStyle = []

        })
        return newApp
    },
    // Adding spaces for styling purposes
    space: (i: number) => {
        let space = ""
        for (let j = 0; j < i * 2; j++) {
            space += " "
        }
        return space
    }

}

function generateTemplate(components: readonly SceneNode[]) {
    let template = []
    for (let index = components.length - 1; index >= 0; index--) {
        state.tempLine = ""
        state.tempBlock = []

        let i = 2
        let component: SceneNode = components[index]
        template.push(elementBuilder(component, i))
    }
    // *****
    // ***Enable if you want to itrate the children in an ascending order
    // *****
    
    // components.forEach((component: SceneNode) => {

    //     state.tempLine = ""
    //     state.tempBlock = []

    //     let i = 2
    //     template.push(elementBuilder(component, i))
    // })
    template.unshift("  <div>")
    template.unshift("<template>")
    template.push("  </div>")
    template.push("</template>")


    return template
}

