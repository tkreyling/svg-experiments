(this["webpackJsonpsvg-experiments"]=this["webpackJsonpsvg-experiments"]||[]).push([[0],{176:function(module,__webpack_exports__,__webpack_require__){"use strict";var _home_runner_work_svg_experiments_svg_experiments_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(111),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),_App_css__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(387),_App_css__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_2__),_indicesToReferences__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(79),_stringsToNodes__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(80),_Diagram__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(178),_parseGraph__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(177),graphAsString='var stack = stringsToNodes([\n    [\n        {name: "group 1", elements: [\n            "element 11", \n            {name: "element 2", size: 1.5, symbol: "component"}, \n            {name: "an element with long text", symbol: "component"}            \n        ]},\n        {name: "group 2", elements: ["element 4"]}\n    ],\n    [\n        {name: "group 3", elements: ["element 1", "element 2"]},\n        {name: "group 4", elements: [\n            {name: "group 6", elements: ["element 4"]}, \n            {name: "placeholder", size: 0.3, isPlaceholder: true}, \n            "element 3"\n        ]},\n        "node on top level", \n        {name: "an element with long text", symbol: "component"}     \n    ],\n    [\n        {name: "group 5", elements: [\n            "element 1", "element 2", "element 3", \n            {name: "element with changed name", size: 1.5}, \n            {name: "element 5", size: 0.7}]}\n    ]\n]);\n\nvar edgeIndices = [\n    {from: [0, 0, 0],    to: [1, 3]},\n    {from: [0, 0, 1],    to: [1, 0, 0]},\n    {from: [0, 0, 2],    to: [1, 1, 0, 0]},\n    {from: [0, 1, 0],    to: [1, 0, 1]},\n    {from: [1, 1, 0, 0], to: [2, 0, 2]},\n    {from: [1, 0, 1],    to: [2, 0, 4]},\n    {from: [1, 0, 1],    to: [2, 0, 3]},\n    {from: [1, 0, 1],    to: [2, 0, 2]},\n    {from: [1, 0, 1],    to: [2, 0, 1]},\n    {from: [1, 0, 1],    to: [2, 0, 0]},\n    {from: [2, 0, 0],    to: [1, 0, 0]},\n    {from: [2, 0, 1],    to: [1, 0, 0]},\n    {from: [2, 0, 0],    to: [2, 0, 3]},\n    {from: [2, 0, 1],    to: [2, 0, 3]},\n    {from: [2, 0, 4],    to: [2, 0, 3]},\n    {from: [0, 0, 0],    to: [0, 0, 2]},\n    {from: [0, 0, 0],    to: [0, 0, 1]},\n    {from: [0, 0, 0],    to: [1, 0, 0]},\n    {from: [0, 0, 0],    to: [1, 0, 0]},\n    {from: [0, 1, 0],    to: [1, 1, 1]},\n    {from: [1, 1, 1],    to: [2, 0, 2]},\n    {from: [0, 1, 0],    to: [1, 1, 2]},\n    {from: [1, 0, 1],    to: [1, 0, 0]},\n    {from: [0, 0, 0],    to: [2, 0, 0]},\n    {from: [0, 0, 0],    to: [2, 0, 1]},\n    {from: [1, 0, 1],    to: [1, 1, 0, 0]}\n];\nvar edges = indicesToReferences(stack, edgeIndices);\n\nvar graph = {\n    stack: stack,\n    edges: edges\n};\n\ngraph\n',indicesToReferences=_indicesToReferences__WEBPACK_IMPORTED_MODULE_3__.a,stringsToNodes=_stringsToNodes__WEBPACK_IMPORTED_MODULE_4__.a,initialGraph=eval(graphAsString),App=function(){var e=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialGraph),n=Object(_home_runner_work_svg_experiments_svg_experiments_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(e,2),t=n[0],r=n[1],a=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(""),o=Object(_home_runner_work_svg_experiments_svg_experiments_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(a,2),i=o[0],c=o[1];return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{id:"parent",className:"App"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{id:"graph"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Diagram__WEBPACK_IMPORTED_MODULE_5__.a,{stack:t.stack,edges:t.edges})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("textarea",{cols:100,rows:45,onChange:function(e){var n=Object(_parseGraph__WEBPACK_IMPORTED_MODULE_6__.a)(e.target.value);"string"===typeof n?c(n):(r(n),c(""))},defaultValue:graphAsString}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p",{className:"error-message"},i)))};__webpack_exports__.a=App},177:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return parseGraph}));var _indicesToReferences__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(79),_stringsToNodes__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(80),indicesToReferences=_indicesToReferences__WEBPACK_IMPORTED_MODULE_0__.a,stringsToNodes=_stringsToNodes__WEBPACK_IMPORTED_MODULE_1__.a;function parseGraph(text){try{var graph=eval(text);return void 0===graph?"Script is not returning a graph object!":void 0===graph.stack?"Property layers is missing in graph object!":void 0===graph.edges?"Property edges is missing in graph object!":graph.edges.every((function(e){return void 0!==e.from}))?graph.edges.every((function(e){return void 0!==e.to}))?graph:"Property to must be defined on every edge!":"Property from must be defined on every edge!"}catch(e){return e.message}}},178:function(e,n,t){"use strict";var r=t(3),a=t.n(r);function o(e){return function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{index:0,groupIndex:0};switch(n.kind){case"stack":return void n.elements.forEach((function(n,t){e(n,t)}));case"layer":var a={index:0,groupIndex:0};return void n.elements.forEach((function(n){e(n,t,a)}));case"group":return Object.assign(n,{key:"G_"+t+"_"+r.groupIndex,index:r.groupIndex}),r.groupIndex++,void n.elements.forEach((function(n){e(n,t,r)}));case"node":return Object.assign(n,{key:t+"_"+r.index,index:r.index}),void r.index++}}(e.stack),e}var i=t(34),c=5,s=5,_=150,u=40,l=30,d=10,f=10,m=10,p=20,g=10;function h(e){switch(e.kind){case"stack":return Math.max.apply(Math,Object(i.a)(e.elements.map(h)));case"layer":return e.elements.map(h).map((function(e,n){return e+(n>0?m:0)})).reduce((function(e,n){return e+n}),0);case"group":return e.elements.map(h).map((function(e,n){return e+(n>0?m:0)})).reduce((function(e,n){return e+n}),0)+2*f;case"node":return _*(e.size||1)}}function x(e){return function e(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;switch(n.kind){case"stack":var a=h(n);return void n.elements.forEach((function(n){e(n,t,a)}));case"layer":return t.x=s+(r-h(n))/2,void n.elements.forEach((function(n){e(n,t,r)}));case"group":return Object.assign(n,{x:t.x}),t.x+=f,n.elements.forEach((function(n){e(n,t,r)})),void(t.x+=f);case"node":return Object.assign(n,{x:t.x}),void(t.x+=_*(n.size||1)+m)}}(e.stack,{x:0}),e}function E(e){return function(n,t){return e(n)-e(t)}}function y(e){return function(n,t){return e(t)-e(n)}}function v(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e,t){for(var r=0;;){if(r===n.length)return 0;var a=n[r](e,t);if(0!==a)return a;r++}}}function k(e){return e.from.layerIndex===e.to.layerIndex?e.from.index<=e.to.index:e.from.layerIndex<e.to.layerIndex}function M(e){return k(e)?e.from:e.to}function O(e){return k(e)?e.to:e.from}function I(e){return function(e){var n=new Map;e.map((function(e,n){return Object.assign(e,{edgeIndex:n})})).forEach((function(e){var t=M(e).layerIndex,r=n.get(t)||[];r.push(e),n.set(t,r)})),Array.from(n.values()).forEach(b)}(e.edges),e}function b(e){var n=new Map;e.forEach((function(e){var t=M(e).key,r=n.get(t)||[];r.push(e),n.set(t,r)}));var t=Array.from(n.keys());t.sort();var r=0;t.forEach((function(e){var t=n.get(e),a=t.filter((function(e){return O(e).layerIndex===M(e).layerIndex})),o=a.filter((function(e){return O(e).index<=M(e).index})),i=a.filter((function(e){return O(e).index>M(e).index})),c=t.filter((function(e){return O(e).layerIndex!==M(e).layerIndex})),s=c.filter((function(e){return O(e).x<=M(e).x})),_=c.filter((function(e){return O(e).x>M(e).x}));o.sort(v(E((function(e){return O(e).index})),E((function(e){return e.edgeIndex})))),s.sort(v(E((function(e){return O(e).index})),E((function(e){return e.edgeIndex})))),_.sort(v(y((function(e){return O(e).index})),y((function(e){return e.edgeIndex})))),i.sort(v(E((function(e){return O(e).index})),E((function(e){return e.edgeIndex}))));var u=o.concat(s),l=i.concat(_);function d(n,t,a){var o=M(n).layerIndex,i=r+t;Object.assign(n,{key:e+"_"+a+"_"+i,index:i,layerIndex:o})}u.forEach((function(e,n){return d(e,n,"B")})),l.forEach((function(e,n){return d(e,n,"A")})),r+=Math.max(u.length,l.length)}))}function w(e,n){var t=new Map;return e.forEach((function(e){var n=M(e).layerIndex,r=t.get(n)||[];r.push(e),t.set(n,r)})),Array.from(Array(n).keys()).map((function(e){var n,r=(null===(n=t.get(e))||void 0===n?void 0:n.map((function(e){return e.index})))||[0];return Math.max.apply(Math,Object(i.a)(r))*g}))}function P(e){switch(e.kind){case"stack":return e.elements.map(P).reduce((function(e,n){return e+n}),0);case"layer":return Math.max.apply(Math,Object(i.a)(e.elements.map(P)))+p;case"group":return l+Math.max.apply(Math,Object(i.a)(e.elements.map(P)))+d;case"node":return e.isPlaceholder?0:u}}function D(e){switch(e.kind){case"layer":return Math.max.apply(Math,Object(i.a)(e.elements.map(D)));case"group":return Math.max.apply(Math,Object(i.a)(e.elements.map(D)))+1;case"node":return 0}}function A(e){var n=w(e.edges,e.stack.elements.length);return function e(n,t,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;switch(n.kind){case"stack":return t.y+=c,void n.elements.forEach((function(n,a){var o=r.slice(0,a).reduce((function(e,n){return e+n}),0);e(n,t,r,o)}));case"layer":return t.nodeY=t.y+D(n)*l,t.groupHeight=D(n)*(l+d)+u,t.belowLayerY=t.y+P(n)+a,n.elements.forEach((function(n){e(n,t,r,a)})),void(t.y+=P(n));case"group":return Object.assign(n,{y:t.y+a,height:t.groupHeight}),t.y+=l,t.groupHeight-=l+d,n.elements.forEach((function(n){e(n,t,r,a)})),t.y-=l,void(t.groupHeight+=l+d);case"node":return void Object.assign(n,{y:t.nodeY+a,belowLayerY:t.belowLayerY})}}(e.stack,{y:0,nodeY:0,groupHeight:0,belowLayerY:0},n),e}function T(e){return function(e){var n=new Map;function t(e,t,r){var a=e.layerIndex<=t.layerIndex?"LOWER":"UPPER",o=e.key+a,i=n.get(o)||{node:e,side:a,edgeEnds:[]};i.edgeEnds.push({reverseNode:t,setIndex:r}),n.set(o,i)}e.forEach((function(e){t(e.from,e.to,(function(n){return Object.assign(e,{fromIndex:n})})),t(e.to,e.from,(function(n){return Object.assign(e,{toIndex:n})}))})),Array.from(n.values()).forEach((function(e){var n=e.edgeEnds,t=e.node,r=e.side,a=n.filter((function(e){return e.reverseNode.layerIndex===t.layerIndex})),o=a.filter((function(e){return e.reverseNode.index<=t.index})),i=a.filter((function(e){return e.reverseNode.index>=t.index})),c=n.filter((function(e){return e.reverseNode.layerIndex!==t.layerIndex}));o.sort(y((function(e){return e.reverseNode.index}))),c.sort(E((function(e){return e.reverseNode.index}))),i.sort(y((function(e){return e.reverseNode.index}))),o.concat(c).concat(i).forEach((function(e,n){e.setIndex(n)})),"UPPER"===r?Object.assign(t,{upperSideEdges:n.length}):Object.assign(t,{lowerSideEdges:n.length})}))}(e.edges),e}function R(e){switch(e.kind){case"stack":return e.elements.flatMap((function(e){return e.elements})).flatMap(R);case"group":return e.elements.flatMap(R);case"node":return[e]}}function L(e){switch(e.kind){case"stack":return e.elements.flatMap((function(e){return e.elements})).flatMap(L);case"group":return[e].concat(e.elements.flatMap(L));case"node":return[]}}var W=function(e){var n=.4*e.width,t=.15*e.width;return a.a.createElement("g",{key:e.symbolKey},a.a.createElement("rect",{x:e.x+n/2,y:e.y,width:.8*e.width,height:1.1*e.width,fill:"none",strokeWidth:.5,stroke:"black"}),a.a.createElement("rect",{x:e.x,y:e.y+t,width:n,height:t,fill:"lightgrey",strokeWidth:.5,stroke:"black"}),a.a.createElement("rect",{x:e.x,y:e.y+3*t,width:n,height:t,fill:"lightgrey",strokeWidth:.5,stroke:"black"}))},B=function(e){if(e.isPlaceholder)return null;var n="component"===e.symbol;return a.a.createElement("g",{key:e.key},a.a.createElement("rect",{"data-testid":"rect",x:e.x,y:e.y,width:h(e),height:u,fill:"lightgrey",strokeWidth:.5,stroke:"black"}),a.a.createElement("text",{x:e.x+5,y:e.y+u/2,fill:"black",clipPath:"url(#clip-element-text-"+e.key+")"},e.name),a.a.createElement("clipPath",{id:"clip-element-text-"+e.key},a.a.createElement("rect",{x:e.x+5,y:e.y,width:h(e)-10-(n?15:0),height:u})),n?a.a.createElement(W,{symbolKey:e.key+"CS",x:e.x+h(e)-12-3,y:e.y+3,width:12}):"")},C=function(e){return a.a.createElement("g",{key:e.key},a.a.createElement("rect",{x:e.x,y:e.y,width:h(e),height:e.height,fill:"none",strokeWidth:.5,stroke:"grey"}),a.a.createElement("text",{x:e.x+f,y:e.y+u/2,fill:"black",clipPath:"url(#clip-element-text-"+e.key+")"},e.name),a.a.createElement("clipPath",{id:"clip-element-text-"+e.key},a.a.createElement("rect",{x:e.x+f,y:e.y,width:h(e)-2*f,height:u})))};function K(e,n,t){var r=e.layerIndex<=t.layerIndex,a=(h(e)-((r?e.lowerSideEdges:e.upperSideEdges)-1)*g)/2;return{x:e.x+a+n*g,y:e.y+(r?P(e):0)}}var U=function(e){var n=K(e.from,e.fromIndex,e.to),t=M(e).belowLayerY-p/2+e.index*g,r=K(e.to,e.toIndex,e.from);return a.a.createElement("path",{key:e.key,d:"M "+n.x+" "+n.y+" L "+n.x+" "+t+" L "+r.x+" "+t+" L "+r.x+" "+r.y,stroke:"black",strokeWidth:.5,fill:"none"})};function j(e){return function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;switch(n.kind){case"stack":return void n.elements.forEach((function(n,t){e(n,t)}));case"layer":return void n.elements.forEach((function(n){e(n,t)}));case"group":return Object.assign(n,{layerIndex:t}),void n.elements.forEach((function(n){e(n,t)}));case"node":return void Object.assign(n,{layerIndex:t})}}(e.stack),e}function N(e){return{stack:e.stack,edges:e.edges.flatMap((function(n){if(Math.abs(n.from.layerIndex-n.to.layerIndex)<=1)return n;for(var t=Math.min(n.from.layerIndex,n.to.layerIndex),r=Math.max(n.from.layerIndex,n.to.layerIndex),a=[],o=n.from.layerIndex<n.to.layerIndex?n.from:n.to,i=n.from.layerIndex>=n.to.layerIndex?n.from:n.to,c=t+1;c<r;c++){var s={kind:"node",name:"",size:.01,isPlaceholder:!0,layerIndex:c};e.stack.elements[c].elements.splice(0,0,s),a.push({from:o,to:s}),o=s}return a.push({from:o,to:i}),a}))}}t.d(n,"a",(function(){return q}));var q=function(e){return[e].map(j).map(N).map(o).map(x).map(I).map(A).map(T).map((function(e){var n=w(e.edges,e.stack.elements.length),t=h(e.stack)+2*s,r=P(e.stack)+n.reduce((function(e,n){return e+n}))+2*c;return a.a.createElement("svg",{viewBox:"0 0 "+t+" "+r},R(e.stack).map(B),L(e.stack).map(C),e.edges.map(U))}))[0]}},179:function(e,n,t){e.exports=t(388)},386:function(e,n,t){},387:function(e,n,t){},388:function(e,n,t){"use strict";t.r(n);t(180),t(189);var r=t(3),a=t.n(r),o=t(175),i=t.n(o),c=(t(386),t(176));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(c.a,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},79:function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++)if(void 0===n[t])throw new Error("Empty array elements are not allowed.");var r=e;return n.forEach((function(e){if(void 0===r.elements[e])throw new Error("Indices must refer to a node that does exist. Index "+e+" Array length "+r.elements.length);r=r.elements[e]})),r}function a(e,n){return n.map((function(n){return function(e,n){return{from:r(e,n.from),to:r(e,n.to)}}(e,n)}))}t.d(n,"a",(function(){return a}))},80:function(e,n,t){"use strict";function r(e){if("string"===typeof e)return{kind:"node",name:e};if("elements"in e){for(var n=0;n<e.elements.length;n++)if(void 0===e.elements[n])throw new Error("Empty array elements are not allowed.");return{kind:"group",name:e.name,elements:e.elements.map(r)}}return Object.assign(e,{kind:"node"})}function a(e){return{kind:"stack",elements:e.map((function(e){return{kind:"layer",elements:e.map(r)}}))}}t.d(n,"a",(function(){return a}))}},[[179,1,2]]]);
//# sourceMappingURL=main.c5cff2a3.chunk.js.map