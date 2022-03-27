import { state } from "./index"

export function generateComponent(component: ComponentNode | InstanceNode) {
    let comp = {
        name: component.name,
        component: component,
        template: []
    }
    state.pageComponents.push(comp);
}