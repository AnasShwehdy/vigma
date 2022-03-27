import { main } from "./lib"

figma.showUI(__html__, { width: 1000, height: 1000 })


figma.ui.onmessage = msg => {

  if (msg.type === 'create') {

    const app = main.createNuxtApp(figma)
    figma.ui.postMessage({ type: "created-app", data: app })
    console.log(app)

  }



  // figma.closePlugin();
}

