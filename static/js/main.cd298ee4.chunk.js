(this["webpackJsonpsvg-experiments"]=this["webpackJsonpsvg-experiments"]||[]).push([[0],{14:function(e,t,n){"use strict";function r(e){return function(t,n){return e(t)-e(n)}}function o(e){return function(t,n){return e(n)-e(t)}}function a(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e,n){for(var r=0;;){if(r===t.length)return 0;var o=t[r](e,n);if(0!==o)return o;r++}}}n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}))},190:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Editor}));var _home_runner_work_svg_experiments_svg_experiments_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(125),_indicesToReferences__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(88),_stringsToNodes__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(89),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),_parseGraph__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(191),_Diagram__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(90),_Editor_css__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(402),_Editor_css__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_Editor_css__WEBPACK_IMPORTED_MODULE_6__),graphAsString='var stack = stringsToNodes([\n    [\n        {name: "group 1", elements: [\n            "element 11", \n            {name: "element 2", size: 1.5, symbol: "component"}, \n            {name: "an element with long text", symbol: "component"}            \n        ]},\n        {name: "group 2", elements: ["element 4"]}\n    ],\n    [\n        {name: "group 3", elements: ["element 1", "element 2"]},\n        {name: "group 4", elements: [\n            {name: "group 6", elements: ["element 4"]}, \n            {name: "placeholder", size: 0.3, isPlaceholder: true}, \n            "element 3"\n        ]},\n        "node on top level", \n        {name: "an element with long text", symbol: "component"}     \n    ],\n    [\n        {name: "group 5", elements: [\n            "element 1", "element 2", "element 3", \n            {name: "element with changed name", size: 1.5}, \n            {name: "element 5", size: 0.7}]}\n    ]\n]);\n\nvar edgeIndices = [\n    {from: [0, 0, 0],    to: [1, 3]},\n    {from: [0, 0, 1],    to: [1, 0, 0]},\n    {from: [0, 0, 2],    to: [1, 1, 0, 0]},\n    {from: [0, 1, 0],    to: [1, 0, 1]},\n    {from: [1, 1, 0, 0], to: [2, 0, 2]},\n    {from: [1, 0, 1],    to: [2, 0, 4]},\n    {from: [1, 0, 1],    to: [2, 0, 3]},\n    {from: [1, 0, 1],    to: [2, 0, 2]},\n    {from: [1, 0, 1],    to: [2, 0, 1]},\n    {from: [1, 0, 1],    to: [2, 0, 0]},\n    {from: [2, 0, 0],    to: [1, 0, 0]},\n    {from: [2, 0, 1],    to: [1, 0, 0]},\n    {from: [2, 0, 0],    to: [2, 0, 3]},\n    {from: [2, 0, 1],    to: [2, 0, 3]},\n    {from: [2, 0, 4],    to: [2, 0, 3]},\n    {from: [0, 0, 0],    to: [0, 0, 2]},\n    {from: [0, 0, 0],    to: [0, 0, 1]},\n    {from: [0, 0, 0],    to: [1, 0, 0]},\n    {from: [0, 0, 0],    to: [1, 0, 0]},\n    {from: [0, 1, 0],    to: [1, 1, 1]},\n    {from: [1, 1, 1],    to: [2, 0, 2]},\n    {from: [0, 1, 0],    to: [1, 1, 2]},\n    {from: [1, 0, 1],    to: [1, 0, 0]},\n    {from: [0, 0, 0],    to: [2, 0, 0]},\n    {from: [0, 0, 0],    to: [2, 0, 1]},\n    {from: [1, 0, 1],    to: [1, 1, 0, 0]}\n];\nvar edges = indicesToReferences(stack, edgeIndices);\n\nvar graph = {\n    stack: stack,\n    edges: edges\n};\n\ngraph\n',indicesToReferences=_indicesToReferences__WEBPACK_IMPORTED_MODULE_1__.a,stringsToNodes=_stringsToNodes__WEBPACK_IMPORTED_MODULE_2__.a,initialGraph=eval(graphAsString),Editor=function(){var e=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(initialGraph),t=Object(_home_runner_work_svg_experiments_svg_experiments_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(e,2),n=t[0],r=t[1],o=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(""),a=Object(_home_runner_work_svg_experiments_svg_experiments_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(o,2),s=a[0],c=a[1];return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div",{id:"parent",className:"App"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div",{id:"graph"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Diagram__WEBPACK_IMPORTED_MODULE_5__.a,{stack:n.stack,edges:n.edges})),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("textarea",{cols:100,rows:45,onChange:function(e){var t=Object(_parseGraph__WEBPACK_IMPORTED_MODULE_4__.a)(e.target.value);"string"===typeof t?c(t):(r(t),c(""))},defaultValue:graphAsString}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p",{className:"error-message"},s)))}},191:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return parseGraph}));var _indicesToReferences__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(88),_stringsToNodes__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(89),indicesToReferences=_indicesToReferences__WEBPACK_IMPORTED_MODULE_0__.a,stringsToNodes=_stringsToNodes__WEBPACK_IMPORTED_MODULE_1__.a;function parseGraph(text){try{var graph=eval(text);return void 0===graph?"Script is not returning a graph object!":void 0===graph.stack?"Property layers is missing in graph object!":void 0===graph.edges?"Property edges is missing in graph object!":graph.edges.every((function(e){return void 0!==e.from}))?graph.edges.every((function(e){return void 0!==e.to}))?graph:"Property to must be defined on every edge!":"Property from must be defined on every edge!"}catch(e){return e.message}}},194:function(e,t,n){e.exports=n(407)},401:function(e,t,n){},402:function(e,t,n){},407:function(e,t,n){"use strict";n.r(t);n(195),n(204);var r=n(1),o=n.n(r),a=n(189),s=n.n(a),c=(n(401),n(71)),i=n(47),u=n(190),d=n(90);function l(e){return{kind:"node",name:e,symbol:"component",size:1.2}}var m=function(){var e=l("Product API"),t=l("Stock API"),n=l("Product Service DB"),r=l("Product Importer"),a=l("Stock Importer"),s=l("Category Importer"),c=l("Campaign Importer"),i={kind:"stack",elements:[{kind:"layer",elements:[e,t]},{kind:"layer",elements:[n]},{kind:"layer",elements:[r,a,s,c]}]},u=[{from:e,to:n},{from:t,to:n},{from:n,to:r},{from:n,to:a},{from:n,to:s},{from:n,to:c}];return o.a.createElement(d.a,{stack:i,edges:u})},f=function(e){return o.a.createElement("g",{key:e.offsetElementsY+"_"+e.offsetElementsX},o.a.createElement("rect",{x:160*e.offsetElementsX+e.borderIndexMaxX*(2*e.offsetElementsX+1)*10,y:60*e.offsetElementsY+30*(e.borderIndexMaxPreviousTop+e.borderIndexMaxTop-e.borderIndexTop)+10*e.borderIndexMaxPreviousBottom,width:150,height:40,fill:"lightgrey",strokeWidth:.5,stroke:"black"}))};function _(e){throw new Error("Unexpected object: "+e)}function p(e){return function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{offsetElementsY:0};switch(t.kind){case"node":return Object.assign(t,{offsetElementsY:n.offsetElementsY}),void n.offsetElementsY++;case"row":Object.assign(t,{offsetElementsY:n.offsetElementsY});var r=0,o=n.offsetElementsY;return t.elements.forEach((function(t){e(t,n),r=Math.max(r,n.offsetElementsY),n.offsetElementsY=o})),void(n.offsetElementsY=r);case"column":return Object.assign(t,{offsetElementsY:n.offsetElementsY}),void t.elements.forEach((function(t){return e(t,n)}));default:_(t)}}(e),e}function h(e){return function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{offsetElementsX:0};switch(t.kind){case"node":return Object.assign(t,{offsetElementsX:n.offsetElementsX}),void n.offsetElementsX++;case"row":return Object.assign(t,{offsetElementsX:n.offsetElementsX}),void t.elements.forEach((function(t){return e(t,n)}));case"column":Object.assign(t,{offsetElementsX:n.offsetElementsX});var r=0,o=n.offsetElementsX;return t.elements.forEach((function(t){e(t,n),r=Math.max(r,n.offsetElementsX),n.offsetElementsX=o})),void(n.offsetElementsX=r);default:_(t)}}(e),e}var E=n(6);function x(e){return g(e),e}function g(e){switch(e.kind){case"node":return Object.assign(e,{embeddedBordersX:0}),0;case"row":var t=e.elements.map(g).reduce((function(e,t){return e+t}),0)+(e.border?1:0);return Object.assign(e,{embeddedBordersX:t}),t;case"column":var n=Math.max.apply(Math,Object(E.a)(e.elements.map(g)).concat([0]))+(e.border?1:0);return Object.assign(e,{embeddedBordersX:n}),n;default:_(e)}}function b(e){return y(e),e}function y(e){switch(e.kind){case"node":return Object.assign(e,{embeddedElementsX:1}),1;case"row":var t=e.elements.map(y).reduce((function(e,t){return e+t}),0);return Object.assign(e,{embeddedElementsX:t}),t;case"column":var n=Math.max.apply(Math,Object(E.a)(e.elements.map(y)).concat([0]));return Object.assign(e,{embeddedElementsX:n}),n;default:_(e)}}var v=function(e){return o.a.createElement("g",{key:"G_"+e.offsetElementsY+"_"+e.offsetElementsX},o.a.createElement("rect",{x:160*e.offsetElementsX+10*(e.borderIndexMaxX*(2*e.offsetElementsX+1)-e.borderIndexLeft),y:60*e.offsetElementsY+30*(e.borderIndexMaxPreviousTop+e.borderIndexMaxTop-e.borderIndexTop)+10*e.borderIndexMaxPreviousBottom,width:150*e.embeddedElementsX+10*(e.embeddedElementsX-1)+10*((e.embeddedElementsX-1)*e.borderIndexMaxX*2+e.borderIndexLeft+e.borderIndexRight),height:40,fill:"none",strokeWidth:.5,stroke:"grey"}),o.a.createElement("text",{x:160*e.offsetElementsX+10*(e.borderIndexMaxX*(2*e.offsetElementsX+1)-e.borderIndexLeft),y:60*e.offsetElementsY+30*(e.borderIndexMaxPreviousTop+e.borderIndexMaxTop-e.borderIndexTop)+10*e.borderIndexMaxPreviousBottom+15,fill:"black"},e.borderIndexMaxPreviousTop+"/"+e.borderIndexTop+"/"+e.borderIndexMaxTop+"__"+e.borderIndexMaxPreviousBottom+"/"+e.borderIndexBottom+"/"+e.borderIndexMaxBottom))};function k(e){return function e(t,n){switch(t.kind){case"node":return void Object.assign(t,{borderIndexMaxX:n});case"row":case"column":return Object.assign(t,{borderIndexMaxX:n}),void t.elements.forEach((function(t){return e(t,n)}));default:_(t)}}(e,M(e)),e}function M(e){switch(e.kind){case"node":return 0;case"row":case"column":return Math.max.apply(Math,Object(E.a)(e.elements.map(M)).concat([e.borderIndexLeft,e.borderIndexRight]));default:_(e)}}function O(e){return I(e),e}function I(e){switch(e.kind){case"node":return Object.assign(e,{borderIndexLeft:0}),0;case"row":var t=(e.elements.length>0?e.elements.map(I):[0])[0]+(e.border?1:0);return Object.assign(e,{borderIndexLeft:t}),t;case"column":var n=Math.max.apply(Math,Object(E.a)(e.elements.map(I)).concat([0]))+(e.border?1:0);return Object.assign(e,{borderIndexLeft:n}),n;default:_(e)}}function w(e){return P(e),e}function P(e){switch(e.kind){case"node":return Object.assign(e,{borderIndexRight:0}),0;case"row":var t=e.elements.length>0?e.elements.map(P):[0],n=t[t.length-1]+(e.border?1:0);return Object.assign(e,{borderIndexRight:n}),n;case"column":var r=Math.max.apply(Math,Object(E.a)(e.elements.map(P)).concat([0]))+(e.border?1:0);return Object.assign(e,{borderIndexRight:r}),r;default:_(e)}}function j(e){return T(e),e}function T(e){switch(e.kind){case"node":return Object.assign(e,{borderIndexTop:0}),0;case"row":var t=Math.max.apply(Math,Object(E.a)(e.elements.map(T)).concat([0]))+(e.border?1:0);return Object.assign(e,{borderIndexTop:t}),t;case"column":var n=(e.elements.length>0?e.elements.map(T):[0])[0]+(e.border?1:0);return Object.assign(e,{borderIndexTop:n}),n;default:_(e)}}function D(e){return B(e),e}function B(e){switch(e.kind){case"node":return Object.assign(e,{borderIndexBottom:0}),0;case"row":var t=Math.max.apply(Math,Object(E.a)(e.elements.map(B)).concat([0]))+(e.border?1:0);return Object.assign(e,{borderIndexBottom:t}),t;case"column":var n=e.elements.length>0?e.elements.map(B):[0],r=n[n.length-1]+(e.border?1:0);return Object.assign(e,{borderIndexBottom:r}),r;default:_(e)}}var A=n(14);function L(e){var t=new Map,n=0;return Array.from(e.entries()).sort(Object(A.b)((function(e){return e[0]}))).forEach((function(e){t.set(e[0],n),n+=e[1]})),t}function Y(e){var t=W(e);return function e(t,n,r){switch(t.kind){case"node":return void Object.assign(t,{borderIndexMaxBottom:n.get(t.offsetElementsY),borderIndexMaxPreviousBottom:r.get(t.offsetElementsY)});case"row":case"column":return Object.assign(t,{borderIndexMaxBottom:n.get(R(t)),borderIndexMaxPreviousBottom:r.get(t.offsetElementsY)}),void t.elements.forEach((function(t){return e(t,n,r)}));default:_(t)}}(e,t,L(t)),e}function R(e){switch(e.kind){case"node":return e.offsetElementsY;case"row":case"column":return Math.max.apply(Math,Object(E.a)(e.elements.map(R)).concat([e.offsetElementsY]))}}function W(e){switch(e.kind){case"node":var t=new Map;return t.set(e.offsetElementsY,e.borderIndexBottom),t;case"row":case"column":var n=new Map;return n.set(R(e),e.borderIndexBottom),e.elements.map(W).reduce((function(e,t){return Array.from(t.entries()).forEach((function(t){var n=Math.max(e.get(t[0])||0,t[1]);e.set(t[0],n)})),e}),n);default:_(e)}}function C(e){var t=X(e);return function e(t,n,r){switch(t.kind){case"node":return void Object.assign(t,{borderIndexMaxTop:n.get(t.offsetElementsY),borderIndexMaxPreviousTop:r.get(t.offsetElementsY)});case"row":case"column":return Object.assign(t,{borderIndexMaxTop:n.get(t.offsetElementsY),borderIndexMaxPreviousTop:r.get(t.offsetElementsY)}),void t.elements.forEach((function(t){return e(t,n,r)}));default:_(t)}}(e,t,L(t)),e}function X(e){switch(e.kind){case"node":var t=new Map;return t.set(e.offsetElementsY,e.borderIndexTop),t;case"row":case"column":var n=new Map;return n.set(e.offsetElementsY,e.borderIndexTop),e.elements.map(X).reduce((function(e,t){return Array.from(t.entries()).forEach((function(t){var n=Math.max(e.get(t[0])||0,t[1]);e.set(t[0],n)})),e}),n);default:_(e)}}function U(e){switch(e.kind){case"node":return[e];case"row":case"column":return e.elements.flatMap(U);default:_(e)}}function K(e){switch(e.kind){case"node":return[];case"row":case"column":return e.elements.flatMap(K).concat(e);default:_(e)}}var N=function(e){return[e.element].map(h).map(p).map(O).map(w).map(j).map(D).map(k).map(C).map(Y).map(x).map(b).map((function(e){return o.a.createElement("svg",{viewBox:"0 0 1000 500"},U(e).map(f),K(e).filter((function(e){return e.border})).map(v))}))[0]},q=function(){return o.a.createElement(N,{element:{kind:"column",elements:[{kind:"row",elements:[{kind:"column",border:"solid",elements:[{kind:"node"},{kind:"node"}]},{kind:"column",border:"solid",elements:[{kind:"row",border:"solid",elements:[{kind:"node"},{kind:"node"}]},{kind:"node"},{kind:"node"}]}]},{kind:"row",elements:[{kind:"node"},{kind:"node"}]},{kind:"row",border:"solid",elements:[{kind:"row",border:"solid",elements:[{kind:"node"},{kind:"node"}]},{kind:"row",border:"solid",elements:[{kind:"node"},{kind:"node"}]}]}]}})},S=function(){return o.a.createElement(c.a,null,o.a.createElement("div",null,o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(c.b,{to:"/"},"Editor")),o.a.createElement("li",null,o.a.createElement(c.b,{to:"/architecture"},"Sample Architecture")),o.a.createElement("li",null,o.a.createElement(c.b,{to:"/new-layouting"},"New Layouting"))),o.a.createElement("hr",null),o.a.createElement(i.c,null,o.a.createElement(i.a,{exact:!0,path:"/"},o.a.createElement(u.a,null)),o.a.createElement(i.a,{path:"/architecture"},o.a.createElement(m,null)),o.a.createElement(i.a,{path:"/new-layouting"},o.a.createElement(q,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},88:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++)if(void 0===t[n])throw new Error("Empty array elements are not allowed.");var r=e;return t.forEach((function(e){if(void 0===r.elements[e])throw new Error("Indices must refer to a node that does exist. Index "+e+" Array length "+r.elements.length);r=r.elements[e]})),r}function o(e,t){return t.map((function(t){return function(e,t){return{from:r(e,t.from),to:r(e,t.to)}}(e,t)}))}n.d(t,"a",(function(){return o}))},89:function(e,t,n){"use strict";function r(e){if("string"===typeof e)return{kind:"node",name:e};if(!("elements"in e))return Object.assign(e,{kind:"node"});for(var t=0;t<e.elements.length;t++)if(void 0===e.elements[t])throw new Error("Empty array elements are not allowed.");if("name"in e)return{kind:"group",name:e.name,elements:e.elements.map(r)};switch(e.kind){default:case"stack":case"layer":return{kind:e.kind,elements:e.elements.map(r)}}}function o(e){return{kind:"stack",elements:e.map((function(e){return{kind:"layer",elements:e.map(r)}}))}}n.d(t,"a",(function(){return o}))},90:function(e,t,n){"use strict";var r=n(1),o=n.n(r),a=n(6),s=5,c=5,i=150,u=40,d=30,l=10,m=10,f=10,_=20,p=10;function h(e){switch(e.kind){case"stack":return Math.max.apply(Math,Object(a.a)(e.elements.map(h)));case"layer":return e.elements.map(h).map((function(e,t){return e+(t>0?f:0)})).reduce((function(e,t){return e+t}),0);case"group":return e.elements.map(h).map((function(e,t){return e+(t>0?f:0)})).reduce((function(e,t){return e+t}),0)+2*m;case"node":return i*(e.size||1)}}function E(e){return function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;switch(t.kind){case"stack":var o=h(t);return t.elements.forEach((function(t){e(t,n,o)})),void(n.x+=o+f);case"layer":var a=n.x;return n.x=a+(r-h(t))/2,t.elements.forEach((function(t){e(t,n,r)})),void(n.x=a);case"group":return Object.assign(t,{x:n.x}),n.x+=m,t.elements.forEach((function(t){e(t,n,r)})),void(n.x+=m);case"node":return Object.assign(t,{x:n.x}),void(n.x+=i*(t.size||1)+f)}}(e.stack,{x:c}),e}var x=n(14);function g(e){return e.from.layerIndex===e.to.layerIndex?e.from.x<=e.to.x:e.from.layerIndex<e.to.layerIndex}function b(e){return g(e)?e.from:e.to}function y(e){return g(e)?e.to:e.from}function v(e){return function(e){var t=new Map;e.map((function(e,t){return Object.assign(e,{edgeIndex:t})})).forEach((function(e){var n=b(e).layerIndex,r=t.get(n)||[];r.push(e),t.set(n,r)})),Array.from(t.values()).forEach(k)}(e.edges),e}function k(e){var t=new Map;e.forEach((function(e){var n=b(e).key,r=t.get(n)||[];r.push(e),t.set(n,r)}));var n=Array.from(t.keys());n.sort();var r=0;n.forEach((function(e){var n=t.get(e),o=n.filter((function(e){return y(e).layerIndex===b(e).layerIndex})),a=o.filter((function(e){return y(e).x<=b(e).x})),s=o.filter((function(e){return y(e).x>b(e).x})),c=n.filter((function(e){return y(e).layerIndex!==b(e).layerIndex})),i=c.filter((function(e){return y(e).x<=b(e).x})),u=c.filter((function(e){return y(e).x>b(e).x}));a.sort(Object(x.a)(Object(x.b)((function(e){return y(e).x})),Object(x.b)((function(e){return e.edgeIndex})))),i.sort(Object(x.a)(Object(x.b)((function(e){return y(e).x})),Object(x.b)((function(e){return e.edgeIndex})))),u.sort(Object(x.a)(Object(x.c)((function(e){return y(e).x})),Object(x.c)((function(e){return e.edgeIndex})))),s.sort(Object(x.a)(Object(x.b)((function(e){return y(e).x})),Object(x.b)((function(e){return e.edgeIndex}))));var d=a.concat(i),l=s.concat(u);function m(t,n,o){var a=b(t).layerIndex,s=r+n;Object.assign(t,{key:e+"_"+o+"_"+s,index:s,layerIndex:a})}d.forEach((function(e,t){return m(e,t,"B")})),l.forEach((function(e,t){return m(e,t,"A")})),r+=Math.max(d.length,l.length)}))}function M(e,t){var n=new Map;return e.forEach((function(e){var t=b(e).layerIndex,r=n.get(t)||[];r.push(e),n.set(t,r)})),Array.from(Array(t).keys()).map((function(e){var t,r=(null===(t=n.get(e))||void 0===t?void 0:t.map((function(e){return e.index})))||[0];return Math.max.apply(Math,Object(a.a)(r))*p}))}function O(e){switch(e.kind){case"stack":return e.elements.map(O).map((function(e,t){return e+(t>0?_:0)})).reduce((function(e,t){return e+t}),0);case"layer":return Math.max.apply(Math,Object(a.a)(e.elements.map(O)));case"group":return d+Math.max.apply(Math,Object(a.a)(e.elements.map(O)))+l;case"node":return e.isPlaceholder?0:u}}function I(e){switch(e.kind){case"stack":return 0===e.elements.length?0:I(e.elements[0]);case"layer":return Math.max.apply(Math,Object(a.a)(e.elements.map(I)));case"group":return d+Math.max.apply(Math,Object(a.a)(e.elements.map(I)))+l;case"node":return e.isPlaceholder?0:u}}function w(e){switch(e.kind){case"stack":return 0===e.elements.length?0:w(e.elements[0]);case"layer":return Math.max.apply(Math,Object(a.a)(e.elements.map(w)));case"group":return Math.max.apply(Math,Object(a.a)(e.elements.map(w)))+1;case"node":return 0}}function P(e){var t=M(e.edges,e.stack.elements.length);return function e(t,n,r){switch(t.kind){case"stack":var o={y:n.y,nodeY:n.nodeY,belowLayerY:n.belowLayerY};return t.elements.forEach((function(t,o){e(t,n,r)})),n.y=o.y,n.nodeY=o.nodeY,void(n.belowLayerY=o.belowLayerY);case"layer":return n.nodeY=n.y+w(t)*d,n.groupHeight=w(t)*(d+l)+u,n.belowLayerY=n.y+I(t)+_,t.elements.forEach((function(t){e(t,n,r)})),void(n.y+=O(t)+_);case"group":var a=r.slice(0,t.layerIndex).reduce((function(e,t){return e+t}),0);return Object.assign(t,{y:n.y+a,height:n.groupHeight}),n.y+=d,n.groupHeight-=d+l,t.elements.forEach((function(t){e(t,n,r)})),n.y-=d,void(n.groupHeight+=d+l);case"node":var s=r.slice(0,t.layerIndex).reduce((function(e,t){return e+t}),0);return void Object.assign(t,{y:n.nodeY+s,belowLayerY:n.belowLayerY+s})}}(e.stack,{y:s,nodeY:0,groupHeight:0,belowLayerY:0},t),e}function j(e){return function(e){var t=new Map;function n(e,n,r){var o=e.layerIndex<=n.layerIndex?"LOWER":"UPPER",a=e.key+o,s=t.get(a)||{node:e,side:o,edgeEnds:[]};s.edgeEnds.push({reverseNode:n,setIndex:r}),t.set(a,s)}e.forEach((function(e){n(e.from,e.to,(function(t){return Object.assign(e,{fromIndex:t})})),n(e.to,e.from,(function(t){return Object.assign(e,{toIndex:t})}))})),Array.from(t.values()).forEach((function(e){var t=e.edgeEnds,n=e.node,r=e.side,o=t.filter((function(e){return e.reverseNode.layerIndex===n.layerIndex})),a=o.filter((function(e){return e.reverseNode.x<=n.x})),s=o.filter((function(e){return e.reverseNode.x>=n.x})),c=t.filter((function(e){return e.reverseNode.layerIndex!==n.layerIndex}));a.sort(Object(x.c)((function(e){return e.reverseNode.x}))),c.sort(Object(x.b)((function(e){return e.reverseNode.x}))),s.sort(Object(x.c)((function(e){return e.reverseNode.x}))),a.concat(c).concat(s).forEach((function(e,t){e.setIndex(t)})),"UPPER"===r?Object.assign(n,{upperSideEdges:t.length}):Object.assign(n,{lowerSideEdges:t.length})}))}(e.edges),e}function T(e){switch(e.kind){case"stack":return e.elements.flatMap((function(e){return e.elements})).flatMap(T);case"group":return e.elements.flatMap(T);case"node":return[e]}}function D(e){switch(e.kind){case"stack":return e.elements.flatMap((function(e){return e.elements})).flatMap(D);case"group":return[e].concat(e.elements.flatMap(D));case"node":return[]}}var B=function(e){var t=.4*e.width,n=.15*e.width;return o.a.createElement("g",{key:e.symbolKey},o.a.createElement("rect",{x:e.x+t/2,y:e.y,width:.8*e.width,height:1.1*e.width,fill:"none",strokeWidth:.5,stroke:"black"}),o.a.createElement("rect",{x:e.x,y:e.y+n,width:t,height:n,fill:"lightgrey",strokeWidth:.5,stroke:"black"}),o.a.createElement("rect",{x:e.x,y:e.y+3*n,width:t,height:n,fill:"lightgrey",strokeWidth:.5,stroke:"black"}))},A=function(e){if(e.isPlaceholder)return null;var t="component"===e.symbol;return o.a.createElement("g",{key:e.key},o.a.createElement("rect",{"data-testid":"rect",x:e.x,y:e.y,width:h(e),height:u,fill:"lightgrey",strokeWidth:.5,stroke:"black"}),o.a.createElement("text",{x:e.x+5,y:e.y+u/2,fill:"black",clipPath:"url(#clip-element-text-"+e.key+")"},e.name),o.a.createElement("clipPath",{id:"clip-element-text-"+e.key},o.a.createElement("rect",{x:e.x+5,y:e.y,width:h(e)-10-(t?15:0),height:u})),t?o.a.createElement(B,{symbolKey:e.key+"CS",x:e.x+h(e)-12-3,y:e.y+3,width:12}):"")},L=function(e){return o.a.createElement("g",{key:e.key},o.a.createElement("rect",{x:e.x,y:e.y,width:h(e),height:e.height,fill:"none",strokeWidth:.5,stroke:"grey"}),o.a.createElement("text",{x:e.x+m,y:e.y+u/2,fill:"black",clipPath:"url(#clip-element-text-"+e.key+")"},e.name),o.a.createElement("clipPath",{id:"clip-element-text-"+e.key},o.a.createElement("rect",{x:e.x+m,y:e.y,width:h(e)-2*m,height:u})))};function Y(e,t,n){var r=e.layerIndex<=n.layerIndex,o=(h(e)-((r?e.lowerSideEdges:e.upperSideEdges)-1)*p)/2;return{x:e.x+o+t*p,y:e.y+(r?O(e):0)}}var R=function(e){var t=Y(e.from,e.fromIndex,e.to),n=b(e).belowLayerY-_/2+e.index*p,r=Y(e.to,e.toIndex,e.from);return o.a.createElement("path",{key:e.key,d:"M "+t.x+" "+t.y+" L "+t.x+" "+n+" L "+r.x+" "+n+" L "+r.x+" "+r.y,stroke:"black",strokeWidth:.5,fill:"none"})};function W(e){switch(e.kind){case"stack":return e.elements.map(W).reduce((function(e,t){return e+t}),0);case"layer":case"group":return Math.max.apply(Math,Object(a.a)(e.elements.map(W)));case"node":return 1}}function C(e){return function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;switch(t.kind){case"stack":return void t.elements.forEach((function(t){e(t,n),n+=W(t)}));case"layer":return void t.elements.forEach((function(t){e(t,n)}));case"group":return Object.assign(t,{layerIndex:n}),void t.elements.forEach((function(t){e(t,n)}));case"node":return void Object.assign(t,{layerIndex:n})}}(e.stack),e}function X(e){return{stack:e.stack,edges:e.edges.flatMap((function(t){if(Math.abs(t.from.layerIndex-t.to.layerIndex)<=1)return t;for(var n=Math.min(t.from.layerIndex,t.to.layerIndex),r=Math.max(t.from.layerIndex,t.to.layerIndex),o=[],a=t.from.layerIndex<t.to.layerIndex?t.from:t.to,s=t.from.layerIndex>=t.to.layerIndex?t.from:t.to,c=n+1;c<r;c++){var i={kind:"node",name:"",size:.01,isPlaceholder:!0,layerIndex:c};e.stack.elements[c].elements.splice(0,0,i),o.push({from:a,to:i}),a=i}return o.push({from:a,to:s}),o}))}}function U(e){return function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{globalCounter:0};switch(t.kind){case"stack":return void t.elements.forEach((function(t){return e(t,n)}));case"layer":return void t.elements.forEach((function(t){return e(t,n)}));case"group":return Object.assign(t,{key:""+n.globalCounter}),n.globalCounter++,void t.elements.forEach((function(t){return e(t,n)}));case"node":return Object.assign(t,{key:""+n.globalCounter}),void n.globalCounter++}}(e.stack),e}n.d(t,"a",(function(){return K}));var K=function(e){return[e].map(C).map(X).map(U).map(E).map(v).map(P).map(j).map((function(e){var t=M(e.edges,e.stack.elements.length),n=h(e.stack)+2*c,r=O(e.stack)+_+t.reduce((function(e,t){return e+t}))+2*s;return o.a.createElement("svg",{viewBox:"0 0 "+n+" "+r},T(e.stack).map(A),D(e.stack).map(L),e.edges.map(R))}))[0]}}},[[194,1,2]]]);
//# sourceMappingURL=main.cd298ee4.chunk.js.map