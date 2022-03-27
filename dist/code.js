/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getRGB": () => (/* binding */ getRGB)
/* harmony export */ });
const getRGB = ({ r, g, b }, a) => {
    let rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255));
    let color = `rgb(${rgbColorArray[0]} ${rgbColorArray[1]} ${rgbColorArray[2]} / ${(a * 100).toFixed(0)}%)`;
    return color;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    //functions
    getSolidColor(component) {
        let fillColor = component.fills[0];
        let color = getRGB(fillColor.color, fillColor.opacity);
        return color;
    },
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");

figma.showUI(__html__, { width: 400, height: 500 });
// State variabls
var pageComponents = [];
var tempBlock = [];
var tempLine = "";
figma.ui.onmessage = msg => {
    var _a, _b, _c;
    if (msg.type === 'create') {
        let newApp = { pages: [] };
        (_c = (_b = (_a = figma.root) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.children) === null || _c === void 0 ? void 0 : _c.forEach((page) => {
            if (page.type === 'FRAME') {
                let pageProps = {
                    name: page.name,
                    components: pageComponents,
                    template: generateTemplate(page.children),
                    figmaComponents: page.children
                };
                pageComponents.forEach(e => {
                    e.template = generateTemplate(e.component.children);
                    delete e.component;
                });
                newApp.pages.push(pageProps);
            }
            pageComponents = [];
        });
        console.log(newApp);
    }
    // figma.closePlugin();
};
function generateTemplate(components) {
    let template = [];
    components.forEach((component) => {
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
function elementBuilder(component, i) {
    if (component.type === 'TEXT') {
        return buildTextElement(component, i);
    }
    if (component.type === 'GROUP') {
        return buildDivElement(component, i);
    }
    if (component.type === 'COMPONENT' || component.type === "INSTANCE") {
        if (!pageComponents.find(e => e.name == component.name))
            generateComponent(component);
        return buildComponentElement(component, 2);
    }
    if (component.type === 'RECTANGLE') {
        return buildDivElement(component, i);
    }
}
// Element Builders
function buildTextElement(component, i) {
    console.log(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].getSolidColor(component));
    let comp = space(i) + `<p id="${component.name.toLowerCase().replace(" ", "")}">${component.characters}</p>`;
    return comp;
}
// This is made "any" here,
// because i don't know what types of nodes have the children property yet.
function buildDivElement(component, i) {
    let comp = `div id="${component.name.toLowerCase().replace(" ", "")}">`;
    tempBlock.push(space(i) + "<" + comp);
    if (component.children && component.children.length > 0)
        recursiveSearch(component, i + 1);
    tempBlock.push(space(i) + "</" + comp);
    tempBlock.forEach(e => {
        tempLine += e + '\n';
    });
    tempBlock = [];
    return tempLine;
}
function buildComponentElement(component, i) {
    let comp = `${component.name.toLowerCase().replace(" ", "")} />`;
    return space(i) + "<" + comp;
}
// This is used when we want to get the children of a parent element like "div"
function recursiveSearch(component, i) {
    component.children.forEach((c) => {
        if (c.children) {
            if (c.children.length > 0) {
                // When it's a component, we wil not search inside it, instead we will build it using the elementBuilder(), and then generate it from there.
                if (c.type === "COMPONENT" || c.type === "INSTANCE") {
                    tempBlock.push(elementBuilder(c, i + 1));
                    return;
                }
                return elementBuilder(c, i + 1);
            }
        }
        else {
            tempBlock.push(elementBuilder(c, i + 1));
        }
    });
}
function generateComponent(component) {
    let comp = {
        name: component.name,
        component: component,
        template: []
    };
    pageComponents.push(comp);
}
// Adding spaces for styling purposes
function space(i) {
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTyxrQkFBa0IsU0FBUztBQUNsQztBQUNBLHVCQUF1QixrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsSUFBSSxxQkFBcUI7QUFDMUc7QUFDQTtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLEVBQUM7Ozs7Ozs7VUNaRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQzVCLHlCQUF5Qix5QkFBeUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0REFBbUI7QUFDbkMsb0NBQW9DLDhDQUE4QyxJQUFJLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDhDQUE4QztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsK0NBQStDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnV4dC1maWdtYS8uL3NyYy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly9udXh0LWZpZ21hL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL251eHQtZmlnbWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL251eHQtZmlnbWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9udXh0LWZpZ21hL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbnV4dC1maWdtYS8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnZXRSR0IgPSAoeyByLCBnLCBiIH0sIGEpID0+IHtcclxuICAgIGxldCByZ2JDb2xvckFycmF5ID0gW3IsIGcsIGJdLm1hcChjaGFubmVsID0+IE1hdGgucm91bmQoY2hhbm5lbCAqIDI1NSkpO1xyXG4gICAgbGV0IGNvbG9yID0gYHJnYigke3JnYkNvbG9yQXJyYXlbMF19ICR7cmdiQ29sb3JBcnJheVsxXX0gJHtyZ2JDb2xvckFycmF5WzJdfSAvICR7KGEgKiAxMDApLnRvRml4ZWQoMCl9JSlgO1xyXG4gICAgcmV0dXJuIGNvbG9yO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvL2Z1bmN0aW9uc1xyXG4gICAgZ2V0U29saWRDb2xvcihjb21wb25lbnQpIHtcclxuICAgICAgICBsZXQgZmlsbENvbG9yID0gY29tcG9uZW50LmZpbGxzWzBdO1xyXG4gICAgICAgIGxldCBjb2xvciA9IGdldFJHQihmaWxsQ29sb3IuY29sb3IsIGZpbGxDb2xvci5vcGFjaXR5KTtcclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9LFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDQwMCwgaGVpZ2h0OiA1MDAgfSk7XHJcbi8vIFN0YXRlIHZhcmlhYmxzXHJcbnZhciBwYWdlQ29tcG9uZW50cyA9IFtdO1xyXG52YXIgdGVtcEJsb2NrID0gW107XHJcbnZhciB0ZW1wTGluZSA9IFwiXCI7XHJcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2NyZWF0ZScpIHtcclxuICAgICAgICBsZXQgbmV3QXBwID0geyBwYWdlczogW10gfTtcclxuICAgICAgICAoX2MgPSAoX2IgPSAoX2EgPSBmaWdtYS5yb290KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2hpbGRyZW5bMF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jaGlsZHJlbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmZvckVhY2goKHBhZ2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhZ2UudHlwZSA9PT0gJ0ZSQU1FJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VQcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYWdlLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50czogcGFnZUNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGdlbmVyYXRlVGVtcGxhdGUocGFnZS5jaGlsZHJlbiksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlnbWFDb21wb25lbnRzOiBwYWdlLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGFnZUNvbXBvbmVudHMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnRlbXBsYXRlID0gZ2VuZXJhdGVUZW1wbGF0ZShlLmNvbXBvbmVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGUuY29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBuZXdBcHAucGFnZXMucHVzaChwYWdlUHJvcHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhZ2VDb21wb25lbnRzID0gW107XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV3QXBwKTtcclxuICAgIH1cclxuICAgIC8vIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbn07XHJcbmZ1bmN0aW9uIGdlbmVyYXRlVGVtcGxhdGUoY29tcG9uZW50cykge1xyXG4gICAgbGV0IHRlbXBsYXRlID0gW107XHJcbiAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIHRlbXBMaW5lID0gXCJcIjtcclxuICAgICAgICB0ZW1wQmxvY2sgPSBbXTtcclxuICAgICAgICBsZXQgaSA9IDI7XHJcbiAgICAgICAgdGVtcGxhdGUucHVzaChlbGVtZW50QnVpbGRlcihjb21wb25lbnQsIGkpKTtcclxuICAgIH0pO1xyXG4gICAgdGVtcGxhdGUucmV2ZXJzZSgpO1xyXG4gICAgdGVtcGxhdGUudW5zaGlmdChcIiAgPGRpdj5cIik7XHJcbiAgICB0ZW1wbGF0ZS51bnNoaWZ0KFwiPHRlbXBsYXRlPlwiKTtcclxuICAgIHRlbXBsYXRlLnB1c2goXCIgIDwvZGl2PlwiKTtcclxuICAgIHRlbXBsYXRlLnB1c2goXCI8L3RlbXBsYXRlPlwiKTtcclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxufVxyXG5mdW5jdGlvbiBlbGVtZW50QnVpbGRlcihjb21wb25lbnQsIGkpIHtcclxuICAgIGlmIChjb21wb25lbnQudHlwZSA9PT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGJ1aWxkVGV4dEVsZW1lbnQoY29tcG9uZW50LCBpKTtcclxuICAgIH1cclxuICAgIGlmIChjb21wb25lbnQudHlwZSA9PT0gJ0dST1VQJykge1xyXG4gICAgICAgIHJldHVybiBidWlsZERpdkVsZW1lbnQoY29tcG9uZW50LCBpKTtcclxuICAgIH1cclxuICAgIGlmIChjb21wb25lbnQudHlwZSA9PT0gJ0NPTVBPTkVOVCcgfHwgY29tcG9uZW50LnR5cGUgPT09IFwiSU5TVEFOQ0VcIikge1xyXG4gICAgICAgIGlmICghcGFnZUNvbXBvbmVudHMuZmluZChlID0+IGUubmFtZSA9PSBjb21wb25lbnQubmFtZSkpXHJcbiAgICAgICAgICAgIGdlbmVyYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1aWxkQ29tcG9uZW50RWxlbWVudChjb21wb25lbnQsIDIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbXBvbmVudC50eXBlID09PSAnUkVDVEFOR0xFJykge1xyXG4gICAgICAgIHJldHVybiBidWlsZERpdkVsZW1lbnQoY29tcG9uZW50LCBpKTtcclxuICAgIH1cclxufVxyXG4vLyBFbGVtZW50IEJ1aWxkZXJzXHJcbmZ1bmN0aW9uIGJ1aWxkVGV4dEVsZW1lbnQoY29tcG9uZW50LCBpKSB7XHJcbiAgICBjb25zb2xlLmxvZyh1dGlscy5nZXRTb2xpZENvbG9yKGNvbXBvbmVudCkpO1xyXG4gICAgbGV0IGNvbXAgPSBzcGFjZShpKSArIGA8cCBpZD1cIiR7Y29tcG9uZW50Lm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiIFwiLCBcIlwiKX1cIj4ke2NvbXBvbmVudC5jaGFyYWN0ZXJzfTwvcD5gO1xyXG4gICAgcmV0dXJuIGNvbXA7XHJcbn1cclxuLy8gVGhpcyBpcyBtYWRlIFwiYW55XCIgaGVyZSxcclxuLy8gYmVjYXVzZSBpIGRvbid0IGtub3cgd2hhdCB0eXBlcyBvZiBub2RlcyBoYXZlIHRoZSBjaGlsZHJlbiBwcm9wZXJ0eSB5ZXQuXHJcbmZ1bmN0aW9uIGJ1aWxkRGl2RWxlbWVudChjb21wb25lbnQsIGkpIHtcclxuICAgIGxldCBjb21wID0gYGRpdiBpZD1cIiR7Y29tcG9uZW50Lm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiIFwiLCBcIlwiKX1cIj5gO1xyXG4gICAgdGVtcEJsb2NrLnB1c2goc3BhY2UoaSkgKyBcIjxcIiArIGNvbXApO1xyXG4gICAgaWYgKGNvbXBvbmVudC5jaGlsZHJlbiAmJiBjb21wb25lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMClcclxuICAgICAgICByZWN1cnNpdmVTZWFyY2goY29tcG9uZW50LCBpICsgMSk7XHJcbiAgICB0ZW1wQmxvY2sucHVzaChzcGFjZShpKSArIFwiPC9cIiArIGNvbXApO1xyXG4gICAgdGVtcEJsb2NrLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgdGVtcExpbmUgKz0gZSArICdcXG4nO1xyXG4gICAgfSk7XHJcbiAgICB0ZW1wQmxvY2sgPSBbXTtcclxuICAgIHJldHVybiB0ZW1wTGluZTtcclxufVxyXG5mdW5jdGlvbiBidWlsZENvbXBvbmVudEVsZW1lbnQoY29tcG9uZW50LCBpKSB7XHJcbiAgICBsZXQgY29tcCA9IGAke2NvbXBvbmVudC5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIiBcIiwgXCJcIil9IC8+YDtcclxuICAgIHJldHVybiBzcGFjZShpKSArIFwiPFwiICsgY29tcDtcclxufVxyXG4vLyBUaGlzIGlzIHVzZWQgd2hlbiB3ZSB3YW50IHRvIGdldCB0aGUgY2hpbGRyZW4gb2YgYSBwYXJlbnQgZWxlbWVudCBsaWtlIFwiZGl2XCJcclxuZnVuY3Rpb24gcmVjdXJzaXZlU2VhcmNoKGNvbXBvbmVudCwgaSkge1xyXG4gICAgY29tcG9uZW50LmNoaWxkcmVuLmZvckVhY2goKGMpID0+IHtcclxuICAgICAgICBpZiAoYy5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoYy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXaGVuIGl0J3MgYSBjb21wb25lbnQsIHdlIHdpbCBub3Qgc2VhcmNoIGluc2lkZSBpdCwgaW5zdGVhZCB3ZSB3aWxsIGJ1aWxkIGl0IHVzaW5nIHRoZSBlbGVtZW50QnVpbGRlcigpLCBhbmQgdGhlbiBnZW5lcmF0ZSBpdCBmcm9tIHRoZXJlLlxyXG4gICAgICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gXCJDT01QT05FTlRcIiB8fCBjLnR5cGUgPT09IFwiSU5TVEFOQ0VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBCbG9jay5wdXNoKGVsZW1lbnRCdWlsZGVyKGMsIGkgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRCdWlsZGVyKGMsIGkgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcEJsb2NrLnB1c2goZWxlbWVudEJ1aWxkZXIoYywgaSArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbXBvbmVudChjb21wb25lbnQpIHtcclxuICAgIGxldCBjb21wID0ge1xyXG4gICAgICAgIG5hbWU6IGNvbXBvbmVudC5uYW1lLFxyXG4gICAgICAgIGNvbXBvbmVudDogY29tcG9uZW50LFxyXG4gICAgICAgIHRlbXBsYXRlOiBbXVxyXG4gICAgfTtcclxuICAgIHBhZ2VDb21wb25lbnRzLnB1c2goY29tcCk7XHJcbn1cclxuLy8gQWRkaW5nIHNwYWNlcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG5mdW5jdGlvbiBzcGFjZShpKSB7XHJcbiAgICBsZXQgc3BhY2UgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGkgKiAyOyBpbmRleCsrKSB7XHJcbiAgICAgICAgc3BhY2UgKz0gXCIgXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3BhY2U7XHJcbn1cclxuLy8gRmlyc3QgaSBjaGVjayB0aGUgY2hpbGRyZW4gb2YgdGhlIHBhZ2UgaSB3aWxsIGZpbmQgbm9kZXMuXHJcbi8vIGkgd2lsbCBjaGVjayBpZiB0aGUgbm9kZSBoYXMgc3ViIG5vZGVzXHJcbi8vIGlmIHllcywgdGhlbiBpIHdpbGwgbG9vcCB0aHJvdWdoIGVhY2ggbm9kZSBhbmQgc28gb25cclxuLy8gcGFnZSAvLyBmb3JFYWNoIC8vXHJcbi8vIC8vIDAgbm9kZSAvLyBoYXMgY2hpbGRyZW4gIC8vXHJcbi8vIC8vIC8vIDAgc3ViIG5vZGUgLy8gaGFzIGNoaWxkcmVuICAvL1xyXG4vLyAvLyAvLyAvLyAwIHN1YiBub2RlIC8vIGhhcyBjaGlsZHJlbiAgLy9cclxuLy8gLy8gLy8gLy8gLy8gMCBzdWIgbm9kZSAvLyBoYXMgY2hpbGRyZW4gIC8vXHJcbi8vIC8vIC8vIC8vIC8vIC8vICAwIHN1YiBub2RlXHJcbi8vIC8vIC8vIC8vIC8vIC8vICAxIHN1YiBub2RlXHJcbi8vIC8vIC8vIC8vIC8vIC8vICAyIHN1YiBub2RlXHJcbi8vIC8vIC8vIC8vIC8vIC8vIC8vIC8vICAwIHN1YiBub2RlXHJcbi8vIC8vIC8vIC8vIC8vIC8vIC8vIC8vICAxIHN1YiBub2RlXHJcbi8vIC8vIDEgbm9kZSAvLyBoYXMgY2hpbGRyZW4gIC8vXHJcbi8vIC8vIC8vIDAgc3ViIG5vZGVcclxuLy8gLy8gLy8gMSBzdWIgbm9kZVxyXG4vLyAvLyAyIG5vZGUgLy8gaGFzIGNoaWxkcmVuICAvL1xyXG4vLyAvLyAvLyAwIHN1YiBub2RlXHJcbi8vIC8vIDMgbm9kZVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=