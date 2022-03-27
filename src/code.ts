import utils from "./utils"

figma.showUI(__html__, { width: 400, height: 500 });

// State variabls
var pageComponents = [];
var tempBlock = [];
var tempLine = "";



figma.ui.onmessage = msg => {

  if (msg.type === 'create') {

    let newApp = { pages: [] };
    figma.root?.children[0]?.children?.forEach((page) => {
      if (page.type === 'FRAME') {
        let pageProps = {
          name: page.name,
          components: pageComponents,
          template: generateTemplate(page.children),
          figmaComponents: page.children
        }
        pageComponents.forEach(e => {
          e.template = generateTemplate(e.component.children);
          delete e.component;
        })
        newApp.pages.push(pageProps);
      }
      pageComponents = [];
    });
    console.log(newApp)
  }



  // figma.closePlugin();
};




function generateTemplate(components: readonly SceneNode[]) {
  let template = [];
  components.forEach((component: SceneNode) => {

    tempLine = "";
    tempBlock = [];

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

function elementBuilder(component: SceneNode, i: number) {
  if (component.type === 'TEXT') {
    return buildTextElement(component, i);
  }
  if (component.type === 'GROUP') {
    return buildDivElement(component, i);
  }
  if (component.type === 'COMPONENT' || component.type === "INSTANCE") {
    if (!pageComponents.find(e => e.name == component.name))
      generateComponent(component);
    return buildComponentElement(component, 2)
  }
  if (component.type === 'RECTANGLE') {
    return buildDivElement(component, i);
  }
}
// Element Builders
function buildTextElement(component: TextNode, i: number) {

  console.log(utils.getSolidColor(component))
  let comp = space(i) + `<p id="${component.name.toLowerCase().replace(" ", "")}">${component.characters}</p>`;
  return comp;
}



// This is made "any" here,
// because i don't know what types of nodes have the children property yet.
function buildDivElement(component: any, i: number) {
  let comp = `div id="${component.name.toLowerCase().replace(" ", "")}">`;
  tempBlock.push(space(i) + "<" + comp);

  if (component.children && component.children.length > 0)
    recursiveSearch(component, i + 1);

  tempBlock.push(space(i) + "</" + comp);
  tempBlock.forEach(e => {
    tempLine += e + '\n';
  })
  tempBlock = [];
  return tempLine;
}

function buildComponentElement(component: ComponentNode | InstanceNode, i: number) {
  let comp = `${component.name.toLowerCase().replace(" ", "")} />`;
  return space(i) + "<" + comp;
}


// This is used when we want to get the children of a parent element like "div"
function recursiveSearch(component: any, i: number) {
  component.children.forEach((c: any) => {
    if (c.children) {
      if (c.children.length > 0) {

        // When it's a component, we wil not search inside it, instead we will build it using the elementBuilder(), and then generate it from there.

        if (c.type === "COMPONENT" || c.type === "INSTANCE") {
          tempBlock.push(elementBuilder(c, i + 1))
          return
        }
        return elementBuilder(c, i + 1);
      }
    }
    else {
      tempBlock.push(elementBuilder(c, i + 1))
    }
  })
}
function generateComponent(component: ComponentNode | InstanceNode) {
  let comp = {
    name: component.name,
    component: component,
    template: []
  }
  pageComponents.push(comp);

}
// Adding spaces for styling purposes
function space(i: number) {
  let space = "";
  for (let index = 0; index < i * 2; index++) {
    space += " ";
  }
  return space;
}



// First i check the children of the page i will find nodes.
// i will check if the node has sub nodes
// if yes, then i will loop through each node and so on
// page // forEach //
// // 0 node // has children  //
// // // 0 sub node // has children  //
// // // // 0 sub node // has children  //
// // // // // 0 sub node // has children  //
// // // // // //  0 sub node
// // // // // //  1 sub node
// // // // // //  2 sub node
// // // // // // // //  0 sub node
// // // // // // // //  1 sub node
// // 1 node // has children  //
// // // 0 sub node
// // // 1 sub node
// // 2 node // has children  //
// // // 0 sub node
// // 3 node