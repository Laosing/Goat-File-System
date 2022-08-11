const z=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerpolicy&&(n.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?n.credentials="include":i.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}};z();const k=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
</svg>
`,j=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-image" viewBox="0 0 16 16">
  <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z"/>
</svg>
`,B=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-text" viewBox="0 0 16 16">
  <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
</svg>
`,E=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
</svg>
`;function d(e){var t;return((t=(e||window.location.hash).split("#/").at(1))==null?void 0:t.split("?").at(0))||""}function a(e="div",t="",o={},r=[],i=[]){const n=document.createElement(e);return n.innerText=t,Object.entries(o).forEach(([s,l])=>n.setAttribute(s,l)),r.filter(Boolean).forEach(s=>n.appendChild(s)),i.filter(Boolean).forEach(s=>n.prepend(s)),n}function p(e="",t={}){const o=document.createRange().createContextualFragment(e);return Object.entries(t).forEach(([r,i])=>o.setAttribute(r,i)),o}function F(e){return c(e)?"folder":e.name.split(".").at(1)}function A(e){let t;switch(e){case"png":case"jpg":case"jpeg":t=j;break;case"txt":case"json":t=B;break;case"folder":t=k;break;default:t=E;break}return p(t)}function M(e,t){switch(t){case"modified":return H(e[t]);case"size":return D(e[t]);default:return e[t]}}function g(...e){return[...e].filter(Boolean).join(" ")}function c(e){return e.type==="folder"}function L(e){return e.getAttribute("aria-expanded")==="true"}function u(e){e.setAttribute("aria-expanded",!0)}function w(e){e.setAttribute("aria-expanded",!1)}function C(e){L(e)?w(e):u(e)}function H(e){return new Date(e).toLocaleDateString("en-US")}function D(e,t=2){if(e===0)return"0 Bytes";const o=1024,r=t<0?0:t,i=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],n=Math.floor(Math.log(e)/Math.log(o));return parseFloat((e/Math.pow(o,n)).toFixed(r))+" "+i[n]}function S(e,t){const o=v(t,a("ul","",{role:"tree"}));e.appendChild(o)}function v(e,t,o=[]){return e.filter(c).map(r=>{const i=r.children.length>0&&r.children.some(c),n=[...o,r.name].join("/"),s=i&&a("span","\u25BC",{class:"icon"}),l=p(k),m=i&&{"aria-owns":n,"aria-expanded":d().split("/").includes(r.name)||d()===n},b=a("a",r.name,{href:`${window.location.origin}/#/${n}`,class:g("menu__link",d()===n&&"active"),role:"treeitem",...m},[],[l,s]),x=i&&v(r.children,a("ul","",{id:n,role:"group"}),[n]);return a("li","",{role:"none"},[b,x])}).forEach(r=>{t.appendChild(r)}),t}function V(e){e.target.closest(".icon")&&(C(e.target.parentNode),e.preventDefault(),e.stopPropagation())}function T(e){switch(e.key){case"ArrowLeft":w(e.target);break;case"ArrowRight":u(e.target);break}}function I(e){e.querySelectorAll(".menu__link").forEach(o=>o.classList.remove("active"));const t=e.querySelector(`[href='${window.location.origin}/#/${d()}'`);t&&(t.classList.add("active"),u(t.closest(".menu__link")))}const _=`<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 98.959908 91.039795" enable-background="new 0 0 100 100" xml:space="preserve" id="svg2" inkscape:version="0.91 r13725" sodipodi:docname="noun_853142_cc.svg" width="98.959908" height="91.039795"><metadata id="metadata42"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><defs id="defs40"/><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1293" inkscape:window-height="817" id="namedview38" showgrid="false" fit-margin-top="10" fit-margin-left="10" fit-margin-right="10" fit-margin-bottom="10" inkscape:zoom="1.888" inkscape:cx="-21.359957" inkscape:cy="34.2501" inkscape:window-x="0" inkscape:window-y="0" inkscape:window-maximized="0" inkscape:current-layer="svg2"/><path stroke-miterlimit="10" d="m 27.167958,58.106694 c 0,0 -0.5,2.377 4.333,5.113 4.833,2.736 6.833,2.736 6.833,2.736 0,0 -2.75,-3 -2.417,-4.417 0.333,-1.417 5.417,4.083 10.333,2.417 0,0 -1.655,-1.591 -2.953,-5.004 -1.089,-2.725 -2.157,-3.589 -3.006,-4.288 0,0 6.708,-7.125 4.958,-17.125 0,0 -0.75,-4.75 -3.5,-7.75 0,0 6.167,8.167 16.5,3.417 0,0 -1.167,-3.75 -5.833,-6.917 -4.666,-3.167 -8.25,-1.333 -12.583,-1.417 -4.333,-0.083 -5.25,-3.667 -5.25,-3.667 0,0 -3,2.75 -6.333,1.667 -3.333,-1.083 -3.25,-3.25 -8.167,-1.667 -4.917,1.583 -9.083,7.5 -9.083,7.5 0,0 8.333,5.333 12.833,-2.583 0,0 -4,10.5 -5.667,14 -1.667,3.5 -7.5,20.5 14,17.667" id="path4" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 24.350958,20.869694 c 0,0 6.901,-7.705 11.401,-8.893 4.5,-1.188 6.334,-1.185 8.438,-0.625 l -2.691,2.683 -7.956,7.932 c 0,0 8.96,-10.616 18.147,-7.991 l -8.535,10.687" id="path6" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><circle stroke-miterlimit="10" cx="23.251957" cy="36.289692" r="0.75" id="circle8" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><circle stroke-miterlimit="10" cx="38.417957" cy="37.789692" r="0.75" id="circle10" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 21.167958,49.539694 c 0,0 3.292,0.75 3.625,3.208" id="path12" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 28.202958,53.596694 c 0,0 1.625,-2.417 4.917,-1.875" id="path14" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 45.483958,39.374694 c 0,0 2.851,6.582 12.101,6.415 9.25,-0.167 22.167,4 23.417,11.167 1.25,7.167 -1.062,22.25 -4.146,23.083 l -6.167,0 -0.438,-11.5 c 0,0 -2.083,1.583 -7.583,1.583 -5.5,0 -8.5,-3.667 -8.5,-3.667" id="path16" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 42.625958,64.085694 c 0,0 6.209,15.537 9.875,15.954 l 6.584,0 0,-10.47" id="path18" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 38.334958,65.956694 c 0,0 4.583,14.083 8.667,14.083 4.084,0 5.5,0 5.5,0" id="path20" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><polyline stroke-miterlimit="10" points="  65.749,75.742 67.749,85.75 72.167,85.75 " id="polyline22" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10" transform="translate(-0.91504193,-5.7103064)"/><path stroke-miterlimit="10" d="m 79.388958,53.521694 c 0,0 4.946,3.81 8.571,0.268 0,0 -1.308,7.958 -6.613,8.083" id="path24" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 27.972958,16.587694 c 0,0 3.216,2.827 7.466,2.452" id="path26" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 32.902958,12.960694 c 0,0 1.211,3.19 6.842,2.822" id="path28" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 38.019958,18.164694 c 0,0 2.262,4.237 8.059,2.837" id="path30" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/><path stroke-miterlimit="10" d="m 43.109958,14.792694 c 0,0 0.857,2.958 5.749,2.728" id="path32" inkscape:connector-curvature="0" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/></svg>
`;function f(e,t){e.replaceChildren();const o=y(t).get(d())||[];o.length?o.reduce($,[O()]).forEach(r=>e.appendChild(r)):e.appendChild(R())}function O(){const e=["Name","Date Modified","File Size"].map(r=>a("th",r)),t=a("tr","",{},[...e]);return a("table","",{class:"table"},[t])}function $([e],t){const o=A(F(t)),i=["name","modified","size"].map((s,l)=>{const m=a("a",M(t,s),{href:`${window.location.origin}/#/${t.path}`,...(c(t)&&l!==0||c(t)===!1)&&{tabindex:-1},class:g(c(t)===!1&&"disabled")},[],[l===0&&o]);return a("td","",{},[m])}),n=a("tr","",{},[...i]);return e.appendChild(n),[e]}function h(e,t=""){return e.map(o=>({...o,path:t?[t,o.name].join("/"):o.name}))}function y(e,t=[],o){const r=o||new Map([["",h(e)]]);return e.filter(c).forEach(i=>{const n=[...t,i.name].join("/"),s=h(i.children,n);r.set(n,s),i.children.length&&y(i.children,[n],r)}),r}function R(){const e=a("h1","You found a goat!"),t=a("p","If it wasn't what you were looking for try another folder!"),o=p(_),r=a("button","Go back",{class:"button go-back"});return r.addEventListener("click",()=>window.history.back()),a("div","",{class:"folder-empty"},[o,e,t,r])}const N=[{type:"folder",name:"Files",modified:1660018217506,size:5e7,children:[{type:"folder",name:"Documents",modified:1660018217506,size:25e6,children:[{type:"folder",name:"Books",modified:1660018217506,size:0,children:[]},{type:"folder",name:"Secrets",modified:1660018217506,size:0,children:[{type:"file",name:"Goats.png",modified:1660018217506,size:0},{type:"file",name:"Rams.jpg",modified:1660018217506,size:0}]},{type:"file",name:"text.txt",modified:1660018217506,size:0}]},{type:"folder",name:"Images",modified:1660018217506,size:0,children:[]},{type:"folder",name:"System",modified:1660018217506,size:0,children:[]},{type:"file",name:"Description.rtf",modified:1660018217506,size:1024},{type:"file",name:"Description.txt",modified:1660018217506,size:2048}]},{type:"folder",name:"Test",modified:1660018217506,size:0,children:[{type:"folder",name:"Test2",modified:1660018217506,size:0,children:[{type:"folder",name:"Test3",modified:1660018217506,size:0,children:[]}]}]}];fetch("/api/v1/goat").then(e=>e.json()).catch(()=>N).then(P);function P(e){const t=document.getElementById("sidebar"),o=document.getElementById("main");t.addEventListener("click",V),t.addEventListener("keydown",T),f(o,e),S(t,e),window.addEventListener("hashchange",()=>{I(t),f(o,e)})}
