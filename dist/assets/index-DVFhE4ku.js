var w=Object.defineProperty;var T=(t,e,r)=>e in t?w(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var m=(t,e,r)=>(T(t,typeof e!="symbol"?e+"":e,r),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}})();const h=[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]],A=[[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],[[0,0],[1,1],[2,2]],[[0,2],[1,1],[2,0]]],d=["#d5a021","#9627a7","#a72e30","#304CA0","#0C7500"];class G{constructor(){m(this,"board");m(this,"isPlaying");this.board=[[null,null,null],[null,null,null],[null,null,null]],this.isPlaying=!1}getIsPlaying(){return this.isPlaying}getBoardCopy(){return this.board.map(e=>[...e])}getPlayer(e){const r=e.flat(3),n=r.filter(l=>l==="X").length,o=r.filter(l=>l==="O").length;return n<=o?"X":"O"}getActions(e){return h.filter(n=>!e[n[0]][n[1]])}getValidity(e,r){return!e[r[0]][r[1]]}getResult(e,r){if(!this.getValidity(e,r))return console.error("Invalid action");let n=this.getBoardCopy(),o=this.getPlayer(e);return n[r[0]][r[1]]=o,n}getWinner(e){for(let r of A){let n=0,o=0;if(r.forEach(l=>{e[l[0]][l[1]]=="X"&&n++,e[l[0]][l[1]]=="O"&&o++}),n==3)return"X";if(o==3)return"O"}return null}getIfTerminal(e){if(this.getWinner(e))return!0;let r=0;return e.forEach(n=>{n.forEach(o=>{o&&r++})}),r==9}makeMove(e,r){let n=this.getResult(e,r);n&&this.setBoard(n)}setBoard(e){this.board=e}start(){this.isPlaying=!0}stop(){this.isPlaying=!1}initializeBoard(){this.board=[[null,null,null],[null,null,null],[null,null,null]]}}function V(t){let e=t.getBoardCopy();if(e.flat(3).filter(l=>l==null).length==9)return h[Math.floor(Math.random()*h.length)];if(t.getIfTerminal(e))return null;const n=5;let o=0;if(t.getPlayer(e)==="X"){let[l,u]=b(t,e,n,o);return u}else if(t.getPlayer(e)==="O"){let[l,u]=I(t,e,n,o);return u}else return null}function b(t,e,r,n){if(t.getIfTerminal(e))return O(t,e);if(r==n)return[0,null];let o=-1/0,l=null,u=t.getActions(e);n+=1;for(let c of u){if(!t.getValidity(e,c))continue;let[g,E]=I(t,t.getResult(e,c),r,n);if(g>o&&(o=g,l=c),o===1)break}return[o,l]}function I(t,e,r,n){if(t.getIfTerminal(e))return O(t,e);if(r==n)return[0,null];let o=1/0,l=null,u=t.getActions(e);n+=1;for(let c of u){if(!t.getValidity(e,c))continue;let[g,E]=b(t,t.getResult(e,c),r,n);if(g<o&&(o=g,l=c),o===-1)break}return[o,l]}function O(t,e){let r=t.getWinner(e);return r==="X"?[1,null]:r==="O"?[-1,null]:[0,null]}const P=document.querySelector("#scoreO"),B=document.querySelector("#scoreX"),i=document.querySelector("#startX"),s=document.querySelector("#startO"),C=document.querySelector("#message"),x=document.querySelector(":root");let p=0,v=0;function M(t){let e=t.getBoardCopy();if(h.forEach((r,n)=>{let o=document.querySelector(`#elem${n}`);if(!o)return console.error("Unable to locate elem");let l=e[r[0]][r[1]];o.textContent=l||" "}),t.getIfTerminal(e)){let r=t.getWinner(e);t.stop(),k(),r=="X"?(v++,y("X wins!")):r=="O"?(p++,y("O wins!")):y("Tie!"),console.log(p,v)}P&&B&&(P.innerHTML=p.toString(),B.innerHTML=v.toString())}function X(t,e){if(!e.getIsPlaying())return console.error("Game not in progress");let r=h[t],n=e.getBoardCopy();e.getValidity(n,r)&&(e.makeMove(n,r),n=e.getBoardCopy(),M(e),setTimeout(()=>{q(e)},200))}function q(t){if(!t.getIsPlaying())return console.error("Game not in progress");let e=V(t);if(!e)return console.error("terminal board");let r=t.getBoardCopy();console.log("aiMove: ",e),t.makeMove(r,e),M(t)}function S(t,e){t.getIsPlaying()||(s==null||s.classList.add("opacity-0","cursor-default"),i==null||i.classList.add("opacity-0","cursor-default"),s==null||s.classList.remove("cursor-pointer"),i==null||i.classList.remove("cursor-pointer"),d&&x.style.setProperty("--main-color",d[Math.ceil(Math.random()*d.length-1)]),y("Game started"),t.initializeBoard(),M(t),t.start(),e=="O"&&q(t))}function k(){s==null||s.classList.remove("opacity-0","cursor-default"),i==null||i.classList.remove("opacity-0","cursor-default"),s==null||s.classList.add("cursor-pointer"),i==null||i.classList.add("cursor-pointer")}function R(t,e){if(!t)return y("Unable to locate gameboard");for(let r=0;r<9;r++){let n=document.createElement("div");n.id="elem"+r.toString(),n.classList.add("GBelem"),n.addEventListener("click",()=>{X(r,e)}),t.appendChild(n)}}function y(t){C&&(C.textContent=t)}const W=document.querySelector(":root"),_=document.querySelector("#gameboard"),a=document.querySelector("#startX"),f=document.querySelector("#startO");let L=new G;document.addEventListener("DOMContentLoaded",()=>{d&&W.style.setProperty("--main-color",d[Math.ceil(Math.random()*d.length-1)]),R(_,L),a==null||a.addEventListener("click",()=>S(L,"X")),f==null||f.addEventListener("click",()=>S(L,"O")),f==null||f.classList.add("cursor-pointer"),a==null||a.classList.add("cursor-pointer"),y("Choose wether to play as X or as O")});
