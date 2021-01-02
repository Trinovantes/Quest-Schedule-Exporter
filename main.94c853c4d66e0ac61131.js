!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=5)}([function(n,e){n.exports=jQuery},function(n){n.exports=JSON.parse('{"pageTitle":"Quest Schedule Exporter","pageDesc":"This unofficial tool allows University of Waterloo students to export their schedule from Quest. This generates an iCalendar file that you can import anywhere. Everything is done on the client-side using JavaScript so you can rest assured that your personal information won\'t be leaked.","MAX_COURSES":20,"MAX_SECTIONS":5,"filename":"quest_schedule.ics","placeholders":[{"placeholder":"@code","description":"Course code","example":"CS 452"},{"placeholder":"@section","description":"Course section number","example":"001"},{"placeholder":"@name","description":"Name of the course","example":"Real-time Programming"},{"placeholder":"@type","description":"Type of course","example":"LEC"},{"placeholder":"@location","description":"Room for the course","example":"DWE 3522A"},{"placeholder":"@prof","description":"Instructor for the course","example":"William B Cowan"}],"summary":"@code @type in @location","description":"@code-@section: @name (@type) in @location with @prof"}')},function(n,e,t){"use strict";var r=t(4),o=t.n(r)()((function(n){return n[1]}));o.push([n.i,'/*! normalize.css v1.0.1 | MIT License | git.io/normalize */\n/* ==========================================================================\n   HTML5 display definitions\n   ========================================================================== */\n/*\n * Corrects `block` display not defined in IE 6/7/8/9 and Firefox 3.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nnav,\nsection,\nsummary {\n  display: block;\n}\n/*\n * Corrects `inline-block` display not defined in IE 6/7/8/9 and Firefox 3.\n */\naudio,\ncanvas,\nvideo {\n  display: inline-block;\n  *display: inline;\n  *zoom: 1;\n}\n/*\n * Prevents modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/*\n * Addresses styling for `hidden` attribute not present in IE 7/8/9, Firefox 3,\n * and Safari 4.\n * Known issue: no IE 6 support.\n */\n[hidden] {\n  display: none;\n}\n/* ==========================================================================\n   Base\n   ========================================================================== */\n/*\n * 1. Corrects text resizing oddly in IE 6/7 when body `font-size` is set using\n *    `em` units.\n * 2. Prevents iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\nhtml {\n  font-size: 100%;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n}\n/*\n * Addresses `font-family` inconsistency between `textarea` and other form\n * elements.\n */\nhtml,\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: sans-serif;\n}\n/*\n * Addresses margins handled incorrectly in IE 6/7.\n */\nbody {\n  margin: 0;\n}\n/* ==========================================================================\n   Links\n   ========================================================================== */\n/*\n * Addresses `outline` inconsistency between Chrome and other browsers.\n */\na:focus {\n  outline: thin dotted;\n}\n/*\n * Improves readability when focused and also mouse hovered in all browsers.\n */\na:active,\na:hover {\n  outline: 0;\n}\n/* ==========================================================================\n   Typography\n   ========================================================================== */\n/*\n * Addresses font sizes and margins set differently in IE 6/7.\n * Addresses font sizes within `section` and `article` in Firefox 4+, Safari 5,\n * and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nh2 {\n  font-size: 1.5em;\n  margin: 0.83em 0;\n}\nh3 {\n  font-size: 1.17em;\n  margin: 1em 0;\n}\nh4 {\n  font-size: 1em;\n  margin: 1.33em 0;\n}\nh5 {\n  font-size: 0.83em;\n  margin: 1.67em 0;\n}\nh6 {\n  font-size: 0.75em;\n  margin: 2.33em 0;\n}\n/*\n * Addresses styling not present in IE 7/8/9, Safari 5, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n/*\n * Addresses style set to `bolder` in Firefox 3+, Safari 4/5, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold;\n}\nblockquote {\n  margin: 1em 40px;\n}\n/*\n * Addresses styling not present in Safari 5 and Chrome.\n */\ndfn {\n  font-style: italic;\n}\n/*\n * Addresses styling not present in IE 6/7/8/9.\n */\nmark {\n  background: #ff0;\n  color: #000;\n}\n/*\n * Addresses margins set differently in IE 6/7.\n */\np,\npre {\n  margin: 1em 0;\n}\n/*\n * Corrects font family set oddly in IE 6, Safari 4/5, and Chrome.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, serif;\n  _font-family: \'courier new\', monospace;\n  font-size: 1em;\n}\n/*\n * Improves readability of pre-formatted text in all browsers.\n */\npre {\n  white-space: pre;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n/*\n * Addresses CSS quotes not supported in IE 6/7.\n */\nq {\n  quotes: none;\n}\n/*\n * Addresses `quotes` property not supported in Safari 4.\n */\nq:before,\nq:after {\n  content: \'\';\n  content: none;\n}\n/*\n * Addresses inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/*\n * Prevents `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\n/* ==========================================================================\n   Lists\n   ========================================================================== */\n/*\n * Addresses margins set differently in IE 6/7.\n */\ndl,\nmenu,\nol,\nul {\n  margin: 1em 0;\n}\ndd {\n  margin: 0 0 0 40px;\n}\n/*\n * Addresses paddings set differently in IE 6/7.\n */\nmenu,\nol,\nul {\n  padding: 0 0 0 40px;\n}\n/*\n * Corrects list images handled incorrectly in IE 7.\n */\nnav ul,\nnav ol {\n  list-style: none;\n  list-style-image: none;\n}\n/* ==========================================================================\n   Embedded content\n   ========================================================================== */\n/*\n * 1. Removes border when inside `a` element in IE 6/7/8/9 and Firefox 3.\n * 2. Improves image quality when scaled in IE 7.\n */\nimg {\n  border: 0;\n  /* 1 */\n  -ms-interpolation-mode: bicubic;\n  /* 2 */\n}\n/*\n * Corrects overflow displayed oddly in IE 9.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* ==========================================================================\n   Figures\n   ========================================================================== */\n/*\n * Addresses margin not present in IE 6/7/8/9, Safari 5, and Opera 11.\n */\nfigure {\n  margin: 0;\n}\n/* ==========================================================================\n   Forms\n   ========================================================================== */\n/*\n * Corrects margin displayed oddly in IE 6/7.\n */\nform {\n  margin: 0;\n}\n/*\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/*\n * 1. Corrects color not being inherited in IE 6/7/8/9.\n * 2. Corrects text not wrapping in Firefox 3.\n * 3. Corrects alignment displayed oddly in IE 6/7.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  white-space: normal;\n  /* 2 */\n  *margin-left: -7px;\n  /* 3 */\n}\n/*\n * 1. Corrects font size not being inherited in all browsers.\n * 2. Addresses margins set differently in IE 6/7, Firefox 3+, Safari 5,\n *    and Chrome.\n * 3. Improves appearance and consistency in all browsers.\n */\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n  vertical-align: baseline;\n  /* 3 */\n  *vertical-align: middle;\n  /* 3 */\n}\n/*\n * Addresses Firefox 3+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\nbutton,\ninput {\n  line-height: normal;\n}\n/*\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Corrects inability to style clickable `input` types in iOS.\n * 3. Improves usability and consistency of cursor style between image-type\n *    `input` and others.\n * 4. Removes inner spacing in IE 7 without affecting normal text inputs.\n *    Known issue: inner spacing remains in IE 6.\n */\nbutton,\nhtml input[type="button"],\ninput[type="reset"],\ninput[type="submit"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n  *overflow: visible;\n  /* 4 */\n}\n/*\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\ninput[disabled] {\n  cursor: default;\n}\n/*\n * 1. Addresses box sizing set to content-box in IE 8/9.\n * 2. Removes excess padding in IE 8/9.\n * 3. Removes excess padding in IE 7.\n *    Known issue: excess padding remains in IE 6.\n */\ninput[type="checkbox"],\ninput[type="radio"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n  *height: 13px;\n  /* 3 */\n  *width: 13px;\n  /* 3 */\n}\n/*\n * 1. Addresses `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Addresses `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\ninput[type="search"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  /* 2 */\n  box-sizing: content-box;\n}\n/*\n * Removes inner padding and search cancel button in Safari 5 and Chrome\n * on OS X.\n */\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/*\n * Removes inner padding and border in Firefox 3+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n/*\n * 1. Removes default vertical scrollbar in IE 6/7/8/9.\n * 2. Improves readability and alignment in all browsers.\n */\ntextarea {\n  overflow: auto;\n  /* 1 */\n  vertical-align: top;\n  /* 2 */\n}\n/* ==========================================================================\n   Tables\n   ========================================================================== */\n/*\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\nbody {\n  color: #333;\n  font-family: sans-serif;\n  font-size: 15px;\n  line-height: 24px;\n}\ndiv.container {\n  margin: 0 auto;\n  padding: 40px 20px;\n  width: 800px;\n}\nnoscript aside {\n  color: #A94442;\n  background: #F2DEDE;\n  font-weight: bold;\n  padding: 0 20px;\n}\nheader code {\n  background: #eee;\n  font-size: 11px;\n  padding: 3px;\n}\nheader h1,\nheader h2,\nheader p,\nheader ol {\n  margin: 20px 0;\n}\nform#mainForm {\n  background: #eee;\n  border: 1px solid #999;\n  border-radius: 3px;\n  margin: 20px 0;\n  padding: 20px;\n}\nform#mainForm div.formGroup {\n  margin-bottom: 20px;\n}\nform#mainForm div.formGroup label {\n  font-weight: bold;\n  display: block;\n  margin-bottom: 5px;\n}\nform#mainForm div.formGroup label span {\n  font-weight: normal;\n  cursor: help;\n}\nform#mainForm div.formGroup textarea,\nform#mainForm div.formGroup input,\nform#mainForm div.formGroup select {\n  box-sizing: border-box;\n  background: #fff;\n  border: 1px solid #999;\n  display: block;\n  margin: 0;\n  padding: 10px;\n  width: 100%;\n}\nform#mainForm div.formGroup textarea:focus,\nform#mainForm div.formGroup input:focus,\nform#mainForm div.formGroup select:focus {\n  background: #ffffcc;\n}\nform#mainForm table#placeholders {\n  background: #efefef;\n  border-left: 1px solid #999;\n  border-right: 1px solid #999;\n  margin-bottom: 20px;\n  width: 100%;\n}\nform#mainForm table#placeholders tr th,\nform#mainForm table#placeholders tr td {\n  padding: 5px 10px;\n}\nform#mainForm table#placeholders thead tr {\n  border-top: 1px solid #999;\n  border-bottom: 1px solid #999;\n}\nform#mainForm table#placeholders thead tr th {\n  text-align: left;\n}\nform#mainForm table#placeholders tbody tr {\n  border-bottom: 1px solid #999;\n}\nform#mainForm button#generateBtn {\n  cursor: pointer;\n  padding: 10px 20px;\n}\n',""]),e.a=o},function(n,e,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),a=[];function s(n){for(var e=-1,t=0;t<a.length;t++)if(a[t].identifier===n){e=t;break}return e}function d(n,e){for(var t={},r=[],o=0;o<n.length;o++){var i=n[o],d=e.base?i[0]+e.base:i[0],l=t[d]||0,c="".concat(d," ").concat(l);t[d]=l+1;var u=s(c),p={css:i[1],media:i[2],sourceMap:i[3]};-1!==u?(a[u].references++,a[u].updater(p)):a.push({identifier:c,updater:b(p,e),references:1}),r.push(c)}return r}function l(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var a=i(n.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var c,u=(c=[],function(n,e){return c[n]=e,c.filter(Boolean).join("\n")});function p(n,e,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=u(e,o);else{var i=document.createTextNode(o),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}function f(n,e,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var m=null,h=0;function b(n,e){var t,r,o;if(e.singleton){var i=h++;t=m||(m=l(e)),r=p.bind(null,t,i,!1),o=p.bind(null,t,i,!0)}else t=l(e),r=f.bind(null,t,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var t=d(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var o=s(t[r]);a[o].references--}for(var i=d(n,e),l=0;l<t.length;l++){var c=s(t[l]);0===a[c].references&&(a[c].updater(),a.splice(c,1))}t=i}}}},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<n.length;s++){var d=[].concat(n[s]);r&&o[d[0]]||(t&&(d[2]?d[2]="".concat(t," and ").concat(d[2]):d[2]=t),e.push(d))}},e}},function(n,e,t){"use strict";t.r(e);var r=t(3),o=t.n(r),i=t(2),a={insert:"head",singleton:!1},s=(o()(i.a,a),i.a.locals,t(1));const d={m:1,t:2,w:3,h:4,f:5},l={m:"MO",t:"TU",w:"WE",h:"TH",f:"FR"};class c{constructor(n,e,t,r,o,i,a,s,c,p,f,b){this.meta={code:n,name:e,section:m(t),type:m(r),location:m(o),prof:m(i)};const g=s.replace(/Th/g,"H").toLowerCase();this.classDaysICal=Array.from(g).map(n=>l[n]).join(",");const y=function(){if(f===b)return null;const n=h(a,b);return n.setHours(23),n.setMinutes(59),n}();this.untilDateICal=u(y);const x=function(){const n=h(a,f),e=g.split("").map(n=>d[n]);let t=0;for(;!e.includes(n.getDay())&&t++<365;){if(365===t)throw new Error("Invalid first date of class");n.setDate(n.getDate()+1)}return n}(),v=function(n){const e=/(1?\d):([0-5]\d)/.exec(n);if(!e)return null;const t=parseInt(e[1]),r=parseInt(e[2]);let o=0;/PM/.exec(n)&&t<12&&(o=12);const i=new Date(x.getTime());return i.setHours(i.getHours()+t+o),i.setMinutes(i.getMinutes()+r),i};this.startTimeOnFirstDate=u(v(c)),this.endTimeOnFirstDate=u(v(p))}*printer(n,e){yield"BEGIN:VEVENT",yield"DTSTART;TZID=America/Toronto:"+this.startTimeOnFirstDate,yield"DTEND;TZID=America/Toronto:"+this.endTimeOnFirstDate,this.untilDateICal&&(yield"RRULE:FREQ=WEEKLY;UNTIL="+this.untilDateICal+";WKST=SU;BYDAY="+this.classDaysICal),yield"SUMMARY:"+p(this.fillPlaceholders(n)),yield"LOCATION:"+this.meta.location,yield"DESCRIPTION:"+p(this.fillPlaceholders(e)),yield"END:VEVENT"}fillPlaceholders(n){let e=n;for(const n of s.placeholders){const t=n.placeholder.substring(1),r=new RegExp("("+n.placeholder+")","g");e=e.replace(r,this.meta[t])}return e}}function u(n){return n?""+n.getFullYear().toString()+f(n.getMonth()+1)+f(n.getDate())+"T"+f(n.getHours())+f(n.getMinutes())+f(n.getSeconds()):""}function p(n){return n.replace(/,/g,"\\,")}function f(n){return n.toString().padStart(2,"0")}function m(n){return n.replace(/\s+/g," ").trim()}function h(n,e){const t=e.split("/").map(n=>parseInt(n));let r,o,i;switch(n){case"DD/MM/YYYY":r=t[2],o=t[1]-1,i=t[0];break;case"MM/DD/YYYY":r=t[2],o=t[0]-1,i=t[1];break;case"YYYY/MM/DD":r=t[0],o=t[1]-1,i=t[2];break;case"YYYY/DD/MM":r=t[0],o=t[2]-1,i=t[1];break;case"MM/YYYY/DD":r=t[1],o=t[0]-1,i=t[2];break;case"DD/YYYY/MM":r=t[1],o=t[2]-1,i=t[0];break;default:return new Date(e)}return new Date(r,o,i)}class b{constructor(n,e,t,r){this._dateFormatType=n,this._questData=e,this._summary=t,this._description=r,this._courses=[]}run(){this.parseData();const n=this.generateICal();this.downloadFile(n)}parseData(){const n=function(){const n="(\\w{2,5} \\d{3,4}) - (.*)"+(e="(\\w{2,5} \\d{3,4}) - (.*)","(?:(?!"+e+")[\\w|\\W])*");var e;return new RegExp(n,"g")}(),e=function(n){const e=null===/([0-5]\d[A|P]M)/.exec(n)?"[0-2]\\d\\:[0-5]\\d":"1?\\d\\:[0-5]\\d[AP]M",t=function(n){return"("+n+"|TBA)\\s*"},r="(\\d{4})\\s*(\\d{3}\\s*)(\\w{3}\\s*)"+t("([MThWF]{0,6})\\s*("+e+")\\ -\\ ("+e+")\\s*")+t("[\\w\\ ]+\\s*[0-9]{1,5}[A-Z]?")+t("[A-Za-z_\\ \\-\\,\\s]+")+"(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})\\ -\\ (\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})";return new RegExp(r,"g")}(this._questData);let t=0,r=null;for(;;){if(t++>s.MAX_COURSES){console.warn("Exceeded loop count while searching for courses");break}if(r=n.exec(this._questData),!r)break;let o=0,i=null;for(;;){if(o++>s.MAX_SECTIONS){console.warn("Exceeded loop count while searching for sections");break}if(i=e.exec(r[0]),!i)break;if("TBA"===i[4])continue;const n=new c(r[1],r[2],i[2],i[3],i[8],i[9],this._dateFormatType,i[5],i[6],i[7],i[10],i[11]);this._courses.push(n)}}if(0===t||t>=s.MAX_COURSES)throw new Error("Failed Search")}generateICal(){let n="";const e=function(e){n+=e+"\n"};e("BEGIN:VCALENDAR"),e("VERSION:2.0"),e("PRODID:-//www.QuestScheduleExporter.xyz//EN");for(const n of this._courses){const t=n.printer(this._summary,this._description);let r;for(;!(r=t.next()).done;)e(r.value)}return e("END:VCALENDAR"),n}downloadFile(n){const e=document.createElement("a");e.setAttribute("href","data:text/calendar;charset=utf-8,"+encodeURIComponent(n)),e.setAttribute("download",s.filename),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}}var g=t(0),y=t.n(g);y.a.when(y.a.ready).then(()=>{y()("button#generateBtn").on("click",n=>{n.preventDefault();const e=y()("select#dateFormatType").val(),t=y()("textarea#questData").val(),r=y()("input#summary").val(),o=y()("input#description").val();try{new b(e,t,r,o).run()}catch(n){console.error(n),alert("Unable to generate iCalendar file! Please submit an issue on GitHub.")}})})}]);