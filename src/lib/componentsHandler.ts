import { state } from "./index"
import { getComponentProps, NodeTypeEnum } from "figx"

export function generateComponent(component: ComponentNode | InstanceNode) {
    let comp = {
        name: component.name,
        component: component,
        template: []
    }
    if (component.type === 'COMPONENT') {


        console.log(getVariantMetaData(component))
    }

    // console.log(getComponentProps(component), component.id, component.type)
    // console.log(component.variantProperties, component.id, component.type)
    state.pageComponents.push(comp)
}


function getVariantMetaData(componetSet) {
    let variants = componetSet.children

    let metaData = {
        properties: []
    }

    variants.forEach((variant: ComponentNode) => {
        let name = variant.name
        let parts = name.split(', ')

        parts.forEach(partText => {
            let splitText = partText.split('=')
            let propertyName = splitText[0]
            let variantName = splitText[1]

            let findProperty = metaData.properties.indexOf(propertyName)
            if (findProperty === -1) {
                metaData.properties.push(propertyName)
                let propertyKey = `property${metaData.properties.length}`
                metaData[propertyKey] = {
                    name: propertyName,
                    variants: [variantName]
                }
            } else {
                // property already exists, check if variant for property exists
                let propertyKey = `property${findProperty + 1}`
                let variants = metaData[propertyKey].variants
                if (variants.indexOf(variantName) === -1) {
                    metaData[propertyKey].variants.push(variantName)
                }
            }
        })
    })

    return metaData
}