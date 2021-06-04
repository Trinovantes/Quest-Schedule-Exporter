(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};((e,t,r)=>{const n=JSON.parse('{"w_":20,"D6":5,"vB":"quest_schedule.ics","_O":[{"placeholder":"@code","description":"Course code","example":"CS 452"},{"placeholder":"@section","description":"Course section number","example":"001"},{"placeholder":"@name","description":"Name of the course","example":"Real-time Programming"},{"placeholder":"@type","description":"Type of course","example":"LEC"},{"placeholder":"@location","description":"Room for the course","example":"DWE 3522A"},{"placeholder":"@prof","description":"Instructor for the course","example":"William B Cowan"}]}'),s={m:1,t:2,w:3,h:4,f:5},o={m:"MO",t:"TU",w:"WE",h:"TH",f:"FR"};class a{constructor(e,t,r,n,a,c,l,h,p,f,D,m){this._meta={code:e,name:t,section:u(r),type:u(n),location:u(a),prof:u(c)};const w=h.replace(/Th/g,"H").toLowerCase();this._classDaysCal=Array.from(w).map((e=>o[e])).join(",");const g=function(){if(D===m)return null;const e=d(l,m);return e.setHours(23),e.setMinutes(59),e}();this._untilDateCal=i(g);const _=function(){const e=d(l,D),t=w.split("").map((e=>s[e]));let r=0;for(;!t.includes(e.getDay())&&r++<365;){if(365===r)throw new Error("Invalid first date of class");e.setDate(e.getDate()+1)}return e}(),y=function(e){const t=/(1?\d):([0-5]\d)/.exec(e);if(!t)return null;const r=parseInt(t[1]),n=parseInt(t[2]);let s=0;/PM/.exec(e)&&r<12&&(s=12);const o=new Date(_.getTime());return o.setHours(o.getHours()+r+s),o.setMinutes(o.getMinutes()+n),o};this._startTimeOnFirstDate=i(y(p)),this._endTimeOnFirstDate=i(y(f))}*printer(e,t){yield"BEGIN:VEVENT",yield"DTSTART;TZID=America/Toronto:"+this._startTimeOnFirstDate,yield"DTEND;TZID=America/Toronto:"+this._endTimeOnFirstDate,this._untilDateCal&&(yield"RRULE:FREQ=WEEKLY;UNTIL="+this._untilDateCal+";WKST=SU;BYDAY="+this._classDaysCal),yield"SUMMARY:"+c(this.fillPlaceholders(e)),yield"LOCATION:"+this._meta.location,yield"DESCRIPTION:"+c(this.fillPlaceholders(t)),yield"END:VEVENT"}fillPlaceholders(e){let t=e;for(const e of n._O){const r=e.placeholder.substring(1),n=new RegExp("("+e.placeholder+")","g");t=t.replace(n,this._meta[r])}return t}}function i(e){return e?""+e.getFullYear().toString()+l(e.getMonth()+1)+l(e.getDate())+"T"+l(e.getHours())+l(e.getMinutes())+l(e.getSeconds()):""}function c(e){return e.replace(/,/g,"\\,")}function l(e){return e.toString().padStart(2,"0")}function u(e){return e.replace(/\s+/g," ").trim()}function d(e,t){const r=t.split("/").map((e=>parseInt(e)));let n,s,o;switch(e){case"DD/MM/YYYY":n=r[2],s=r[1]-1,o=r[0];break;case"MM/DD/YYYY":n=r[2],s=r[0]-1,o=r[1];break;case"YYYY/MM/DD":n=r[0],s=r[1]-1,o=r[2];break;case"YYYY/DD/MM":n=r[0],s=r[2]-1,o=r[1];break;case"MM/YYYY/DD":n=r[1],s=r[0]-1,o=r[2];break;case"DD/YYYY/MM":n=r[1],s=r[2]-1,o=r[0];break;default:return new Date(t)}return new Date(n,s,o)}class h{constructor(e,t,r,n){this._dateFormatType=e,this._questData=t,this._summary=r,this._description=n,this._courses=[]}run(){this.parseData();const e=this.generateCal();this.downloadFile(e)}parseData(){const e=function(){const e="(\\w{2,5} \\d{3,4}) - (.*)",t=e+(e,"(?:(?!(\\w{2,5} \\d{3,4}) - (.*))[\\w|\\W])*");return new RegExp(t,"g")}(),t=function(e){const t=null===/([0-5]\d[A|P]M)/.exec(e)?"[0-2]\\d\\:[0-5]\\d":"1?\\d\\:[0-5]\\d[AP]M",r=function(e){return"("+e+"|TBA)\\s*"},n="(\\d{4})\\s*(\\d{3}\\s*)(\\w{3}\\s*)"+r("([MThWF]{0,6})\\s*("+t+")\\ -\\ ("+t+")\\s*")+r("[\\w\\ ]+\\s*[0-9]{1,5}[A-Z]?")+r("[A-Za-z_\\ \\-\\,\\s]+")+"(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})\\ -\\ (\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})";return console.log(n),new RegExp(n,"g")}(this._questData);let r=0,s=null;for(;;){if(r++>n.w_){console.warn("Exceeded loop count while searching for courses");break}if(s=e.exec(this._questData),!s)break;let o=0,i=null;for(;;){if(o++>n.D6){console.warn("Exceeded loop count while searching for sections");break}if(i=t.exec(s[0]),!i)break;if("TBA"===i[4])continue;const e=new a(s[1],s[2],i[2],i[3],i[8],i[9],this._dateFormatType,i[5],i[6],i[7],i[10],i[11]);this._courses.push(e)}}if(0===r||r>=n.w_)throw new Error("Failed Search")}generateCal(){let e="";const t=function(t){e+=t+"\n"};t("BEGIN:VCALENDAR"),t("VERSION:2.0"),t("PRODID:-//www.QuestScheduleExporter.xyz//EN");for(const e of this._courses){const r=e.printer(this._summary,this._description);let n;for(;!(n=r.next()).done;)t(n.value)}return t("END:VCALENDAR"),e}downloadFile(e){const t=document.createElement("a");t.setAttribute("href","data:text/calendar;charset=utf-8,"+encodeURIComponent(e)),t.setAttribute("download",n.vB),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}}const p=jQuery;var f=r.n(p);f().when(f().ready).then((()=>{f()("button#generateBtn").on("click",(e=>{e.preventDefault();const t=f()("select#dateFormatType").val(),r=f()("textarea#questData").val(),n=f()("input#summary").val(),s=f()("input#description").val();try{new h(t,r,n,s).run()}catch(e){console.error(e),alert("Unable to generate iCalendar file! Please submit an issue on GitHub.")}}))}))})(0,0,e)})();