function e(e){return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}&key=live_D3CfwYnvW18Bdt42nu3ee8Kp0GRuTH7ynfeJRjFJRz5aYrICnwIq2Guftz0UPtMR`).then((e=>{if(!e.ok)throw new Error("Failed to fetch cat");return e.json()}))}function t(){const e=document.querySelector("select.breed-select"),t=document.querySelector("p.loader"),n=document.querySelector("p.error");e.style.display="none",t.style.display="block",n.style.display="none",fetch("https://api.thecatapi.com/v1/breeds?key=live_D3CfwYnvW18Bdt42nu3ee8Kp0GRuTH7ynfeJRjFJRz5aYrICnwIq2Guftz0UPtMR").then((e=>{if(!e.ok)throw new Error("Failed to fetch breeds");return e.json()})).then((e=>e.map((e=>({id:e.id,name:e.name}))))).then((n=>{n.forEach((t=>{const n=document.createElement("option");n.value=t.id,n.textContent=t.name,e.appendChild(n)})),e.style.display="block",t.style.display="none"})).catch((e=>{console.error(e),t.style.display="none",n.style.display="block"}))}function n(){const t=document.querySelector("select.breed-select"),n=document.querySelector("p.loader"),o=document.querySelector("p.error"),c=t.value;n.style.display="block",e(c).then((e=>{!function(e){const t=document.querySelector("div.cat-info"),n=document.querySelector("p.loader");t.innerHTML="";const o=document.createElement("img");o.src=e[0].url,o.style.width="400px",t.appendChild(o);const c=document.createElement("p");c.textContent=`Breed: ${e[0].breeds[0].name}`,t.appendChild(c);const r=document.createElement("p");r.textContent=`Description: ${e[0].breeds[0].description}`,t.appendChild(r);const l=document.createElement("p");l.textContent=`Temperament: ${e[0].breeds[0].temperament}`,t.appendChild(l),t.style.display="block",n.style.display="none"}(e)})).catch((e=>{console.error(e),n.style.display="none",o.style.display="block"}))}document.addEventListener("DOMContentLoaded",(()=>{t();document.querySelector("select.breed-select").addEventListener("change",n)}));
//# sourceMappingURL=index.192aabb4.js.map