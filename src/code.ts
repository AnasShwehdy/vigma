import { main } from "./utils"

figma.showUI(__html__, { width: 400, height: 500 });


figma.ui.onmessage = msg => {

  if (msg.type === 'create') {

    const app = main.createNuxtApp(figma);
    console.log(app)
  }



  // figma.closePlugin();
};

