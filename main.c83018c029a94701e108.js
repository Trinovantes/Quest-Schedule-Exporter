(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var s in r)e.o(r,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:r[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};((e,t,r)=>{const s=JSON.parse('{"w_":20,"D6":5,"vB":"quest_schedule.ics","_O":[{"placeholder":"@code","description":"Course code","example":"CS 452"},{"placeholder":"@section","description":"Course section number","example":"001"},{"placeholder":"@name","description":"Name of the course","example":"Real-time Programming"},{"placeholder":"@type","description":"Type of course","example":"LEC"},{"placeholder":"@location","description":"Room for the course","example":"DWE 3522A"},{"placeholder":"@prof","description":"Instructor for the course","example":"William B Cowan"}]}'),n={m:1,t:2,w:3,h:4,f:5},a={m:"MO",t:"TU",w:"WE",h:"TH",f:"FR"};class o{_meta;_classDaysCal;_untilDateCal;_startTimeOnFirstDate;_endTimeOnFirstDate;constructor(e,t,r,s,o,c,l,p,h,D,m,f){this._meta={code:e,name:t,section:u(r),type:u(s),location:u(o),prof:u(c)};const _=p.replace(/Th/g,"H").toLowerCase();this._classDaysCal=Array.from(_).map((e=>a[e])).join(",");const w=function(){if(m===f)return null;const e=d(l,f);return e.setHours(23),e.setMinutes(59),e}();this._untilDateCal=i(w);const y=function(){const e=d(l,m),t=_.split("").map((e=>n[e]));let r=0;for(;!t.includes(e.getDay())&&r++<365;){if(365===r)throw new Error("Invalid first date of class");e.setDate(e.getDate()+1)}return e}(),g=function(e){const t=/(1?\d):([0-5]\d)/.exec(e);if(!t)return null;const r=parseInt(t[1]),s=parseInt(t[2]);let n=0;/PM/.exec(e)&&r<12&&(n=12);const a=new Date(y.getTime());return a.setHours(a.getHours()+r+n),a.setMinutes(a.getMinutes()+s),a};this._startTimeOnFirstDate=i(g(h)),this._endTimeOnFirstDate=i(g(D))}*printer(e,t){yield"BEGIN:VEVENT",yield"DTSTART;TZID=America/Toronto:"+this._startTimeOnFirstDate,yield"DTEND;TZID=America/Toronto:"+this._endTimeOnFirstDate,this._untilDateCal&&(yield"RRULE:FREQ=WEEKLY;UNTIL="+this._untilDateCal+";WKST=SU;BYDAY="+this._classDaysCal),yield"SUMMARY:"+c(this.fillPlaceholders(e)),yield"LOCATION:"+this._meta.location,yield"DESCRIPTION:"+c(this.fillPlaceholders(t)),yield"END:VEVENT"}fillPlaceholders(e){let t=e;for(const e of s._O){const r=e.placeholder.substring(1),s=new RegExp("("+e.placeholder+")","g");t=t.replace(s,this._meta[r])}return t}}function i(e){return e?""+e.getFullYear().toString()+l(e.getMonth()+1)+l(e.getDate())+"T"+l(e.getHours())+l(e.getMinutes())+l(e.getSeconds()):""}function c(e){return e.replace(/,/g,"\\,")}function l(e){return e.toString().padStart(2,"0")}function u(e){return e.replace(/\s+/g," ").trim()}function d(e,t){const r=t.split("/").map((e=>parseInt(e)));let s,n,a;switch(e){case"DD/MM/YYYY":s=r[2],n=r[1]-1,a=r[0];break;case"MM/DD/YYYY":s=r[2],n=r[0]-1,a=r[1];break;case"YYYY/MM/DD":s=r[0],n=r[1]-1,a=r[2];break;case"YYYY/DD/MM":s=r[0],n=r[2]-1,a=r[1];break;case"MM/YYYY/DD":s=r[1],n=r[0]-1,a=r[2];break;case"DD/YYYY/MM":s=r[1],n=r[2]-1,a=r[0];break;default:return new Date(t)}return new Date(s,n,a)}class p{_dateFormatType;_questData;_summary;_description;_courses;constructor(e,t,r,s){this._dateFormatType=e,this._questData=t,this._summary=r,this._description=s,this._courses=[]}run(){this.parseData();const e=this.generateCal();this.downloadFile(e)}parseData(){const e=function(){const e="(\\w{2,5} \\d{3,4}) - (.*)",t=e+(e,"(?:(?!(\\w{2,5} \\d{3,4}) - (.*))[\\w|\\W])*");return new RegExp(t,"g")}(),t=function(e){const t=null===/([0-5]\d[A|P]M)/.exec(e)?"[0-2]\\d\\:[0-5]\\d":"1?\\d\\:[0-5]\\d[AP]M",r=function(e){return"("+e+"|TBA)\\s*"},s="(\\d{4})\\s*(\\d{3}\\s*)(\\w{3}\\s*)"+r("([MThWF]{0,6})\\s*("+t+")\\ -\\ ("+t+")\\s*")+r("[\\w\\ ]+\\s*[0-9]{1,5}[A-Z]?")+r("[A-Za-z_\\ \\-\\,\\s]+")+"(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})\\ -\\ (\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})";return console.log(s),new RegExp(s,"g")}(this._questData);let r=0,n=null;for(;;){if(r++>s.w_){console.warn("Exceeded loop count while searching for courses");break}if(n=e.exec(this._questData),!n)break;let a=0,i=null;for(;;){if(a++>s.D6){console.warn("Exceeded loop count while searching for sections");break}if(i=t.exec(n[0]),!i)break;if("TBA"===i[4])continue;const e=new o(n[1],n[2],i[2],i[3],i[8],i[9],this._dateFormatType,i[5],i[6],i[7],i[10],i[11]);this._courses.push(e)}}if(0===r||r>=s.w_)throw new Error("Failed Search")}generateCal(){let e="";const t=function(t){e+=t+"\n"};t("BEGIN:VCALENDAR"),t("VERSION:2.0"),t("PRODID:-//www.QuestScheduleExporter.xyz//EN");for(const e of this._courses){const r=e.printer(this._summary,this._description);let s;for(;!(s=r.next()).done;)t(s.value)}return t("END:VCALENDAR"),e}downloadFile(e){const t=document.createElement("a");t.setAttribute("href","data:text/calendar;charset=utf-8,"+encodeURIComponent(e)),t.setAttribute("download",s.vB),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}}const h=jQuery;var D=r.n(h);D().when(D().ready).then((()=>{D()("button#generateBtn").on("click",(e=>{e.preventDefault();const t=D()("select#dateFormatType").val(),r=D()("textarea#questData").val(),s=D()("input#summary").val(),n=D()("input#description").val();try{new p(t,r,s,n).run()}catch(e){console.error(e),alert("Unable to generate iCalendar file! Please submit an issue on GitHub.")}}))}))})(0,0,e)})();