!function(){var e,t=document.getElementById("startButton"),n=document.querySelector("[data-days] .top-line"),a=document.querySelector("[data-hours] .top-line"),o=document.querySelector("[data-minutes] .top-line"),r=document.querySelector("[data-seconds] .top-line"),d=document.getElementById("datetime-picker");function l(d){var l=d-(new Date).getTime(),i=Math.floor(l/864e5),u=Math.floor(l%864e5/36e5),m=Math.floor(l%36e5/6e4),s=Math.floor(l%6e4/1e3);n.textContent=c(i),a.textContent=c(u),o.textContent=c(m),r.textContent=c(s),l<=0&&(clearInterval(e),t.disabled=!1)}function c(e){return e<10?"0".concat(e):e}t.addEventListener("click",(function(){var n=new Date(d.value).getTime();isNaN(n)?alert("Please enter a valid date and time."):(e=setInterval(l,1e3,n),t.disabled=!0)}))}();
//# sourceMappingURL=02-timer.72091c95.js.map
