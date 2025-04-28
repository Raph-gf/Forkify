var A=Object.defineProperty;var H=(t,e,r)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var o=(t,e,r)=>H(t,typeof e!="symbol"?e+"":e,r);import{F as P}from"./vendor-WF3CzfjF.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();const k="https://forkify-api.jonas.io/api/v2/recipes/",O=10,T=15,v="ac16693b-026d-4caf-9a75-6774e0cfa60b",x=2.5,R=function(t){return new Promise(function(e,r){setTimeout(function(){r(new Error(`Request took too long! Timeout after ${t} second`))},t*1e3)})},b=async function(t,e=void 0){try{const r=e?fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}):fetch(t),n=await Promise.race([r,R(O)]),i=await n.json();if(!n.ok)throw new Error(`${i.message} (${n.status})`);return i}catch(r){throw r}},s={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:T},bookmarks:[]},E=function(t){const{recipe:e}=t.data;return{id:e.id,title:e.title,publisher:e.publisher,sourceUrl:e.source_url,image:e.image_url,servings:e.servings,cookingTime:e.cooking_time,ingredients:e.ingredients,...e.key&&{key:e.key}}},V=async function(t){try{const e=await b(`${k}${t}?key=${v}`);s.recipe=E(e),s.bookmarks.some(r=>r.id===t)?s.recipe.bookmarked=!0:s.recipe.bookmarked=!1,console.log(s.recipe)}catch(e){throw console.error(`${e} 💥💥💥💥`),e}},W=async function(t){try{s.search.query=t;const e=await b(`${k}?search=${t}&key=${v}`);console.log(e),s.search.results=e.data.recipes.map(r=>({id:r.id,title:r.title,publisher:r.publisher,image:r.image_url,...r.key&&{key:r.key}})),s.search.page=1}catch(e){throw console.error(`${e} 💥💥💥💥`),e}},y=function(t=s.search.page){s.search.page=t;const e=(t-1)*s.search.resultsPerPage,r=t*s.search.resultsPerPage;return s.search.results.slice(e,r)},j=function(t){s.recipe.ingredients.forEach(e=>{e.quantity=e.quantity*t/s.recipe.servings}),s.recipe.servings=t},S=function(){localStorage.setItem("bookmarks",JSON.stringify(s.bookmarks))},q=function(t){s.bookmarks.push(t),t.id===s.recipe.id&&(s.recipe.bookmarked=!0),S()},C=function(t){const e=s.bookmarks.findIndex(r=>r.id===t);s.bookmarks.splice(e,1),t===s.recipe.id&&(s.recipe.bookmarked=!1),S()},B=function(){const t=localStorage.getItem("bookmarks");t&&(s.bookmarks=JSON.parse(t))};B();const I=async function(t){try{const e=Object.entries(t).filter(i=>i[0].startsWith("ingredient")&&i[1]!=="").map(i=>{const a=i[1].split(",").map(m=>m.toLowerCase().trim());if(a.length!==3)throw new Error("Wrong ingredient fromat! Please use the correct format :)");const[d,f,u]=a;return{quantity:d?+d:null,unit:f,description:u}}),r={title:t.title,source_url:t.sourceUrl,image_url:t.image,publisher:t.publisher,cooking_time:+t.cookingTime,servings:+t.servings,ingredients:e},n=await b(`${k}?key=${v}`,r);s.recipe=E(n),q(s.recipe)}catch(e){throw e}},c="/assets/icons-LrhAoYAd.svg";class p{constructor(){o(this,"_data");o(this,"renderSpinner",()=>{const e=` <div class="spinner">
            <svg>
              <use href="${c}#icon-loader"></use>
            </svg>
          </div> `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)})}render(e,r=!0){if(!e||Array.isArray(e)&&e.length===0)return this.renderError();this._data=e;const n=this._generateMarkup();if(!r)return n;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",n)}update(e){this._data=e;const r=this._generateMarkup(),n=document.createRange().createContextualFragment(r),i=Array.from(n.querySelectorAll("*")),a=Array.from(this._parentElement.querySelectorAll("*"));i.forEach((d,f)=>{var m;const u=a[f];!d.isEqualNode(u)&&((m=d.firstChild)==null?void 0:m.nodeValue.trim())!==""&&(u.textContent=d.textContent),d.isEqualNode(u)||Array.from(d.attributes).forEach($=>u.setAttribute($.name,$.value))})}_clear(){this._parentElement.innerHTML=""}renderError(e=this._errorMessage){const r=`<div class="error">
            <div>
              <svg>
                <use href="${c}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderMessage(e=this._message){const r=`<div class="message">
            <div>
              <svg>
                <use href="${c}#icon-smile"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}}class U extends p{constructor(){super(...arguments);o(this,"_parentElement",document.querySelector(".recipe"));o(this,"_errorMessage","We could not find that recipe. Please try another one ! 😢");o(this,"_message","W")}addHandlerRender(r){["hashchange","load"].forEach(n=>window.addEventListener(n,r))}addHandlerUpdateServings(r){this._parentElement.addEventListener("click",function(n){const i=n.target.closest(".btn--update-servings");if(!i)return;const{updateTo:a}=i.dataset;+a>0&&r(+a)})}addHandlerAddBookmark(r){this._parentElement.addEventListener("click",function(n){n.target.closest(".btn--bookmark")&&r()})}_generateMarkup(){return`  <figure class="recipe__fig">
    <img src="${this._data.image}" alt=${this._data.title} class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

<div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${c}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${c}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
          <svg>
            <use href="${c}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings "data-update-to="${this._data.servings+1}">
          <svg>
            <use href="${c}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

  <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
            <svg>
              <use href="${c}#icon-user"></use>
            </svg>
          </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${c}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
  ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
 
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href=${this._data.sourceUrl}
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${c}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `}_generateMarkupIngredient(r){return`
    <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${c}#icon-check"></use>
        </svg>
       <div class="recipe__quantity">
  ${r.quantity?new P(r.quantity).toFraction(!0):""}
</div>
        <div class="recipe__description">
          <span class="recipe__unit">${r.unit}</span>
          ${r.description}
        </div>
      </li>
    `}}const l=new U;class N{constructor(){o(this,"_parentElement",document.querySelector(".search"))}getQuery(){const e=this._parentElement.querySelector(".search__field").value;return this._clearInput(),e}addHandlerSearch(e){this._parentElement.addEventListener("submit",function(r){r.preventDefault(),e()})}_clearInput(){this._parentElement.querySelector(".search__field").value=""}}const M=new N;class F extends p{constructor(){super(...arguments);o(this,"_parentElement","")}_generateMarkup(){const r=window.location.hash.slice(1);return`
    <li class="preview">
      <a class="preview__link ${this._data.id===r?"preview__link--active":""}" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="${this._data.image}" alt="${this._data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher}</p>
          <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
            <svg>
              <use href="${c}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  `}}const L=new F;class D extends p{constructor(){super(...arguments);o(this,"_parentElement",document.querySelector(".results"));o(this,"_errorMessage","We could not find the recipe for your query. Please try another one ! 😢");o(this,"_message","W")}_generateMarkup(){return this._data.map(r=>L.render(r,!1)).join("")}}const _=new D;class J extends p{constructor(){super(...arguments);o(this,"_parentElement",document.querySelector(".bookmarks__list"));o(this,"_errorMessage","No bookmarks yet. Find a nice recipe and bookmark it ! 😢");o(this,"_message","W")}addHandlerRender(r){window.addEventListener("load",r)}_generateMarkup(){return this._data.map(r=>L.render(r,!1)).join("")}}const g=new J;class K extends p{constructor(){super(...arguments);o(this,"_parentElement",document.querySelector(".pagination"))}addHandlerClick(r){this._parentElement.addEventListener("click",n=>{const i=n.target.closest(".btn--inline");i&&r(+i.dataset.goto)})}_generateMarkup(){const r=this._data.page,n=Math.ceil(this._data.results.length/this._data.resultsPerPage);return console.log(n),this.generateMarkupButton(n,r)}generateMarkupButton(r,n){return r===1?"":n===1?`
        <button data-goto="${n+1}" class="btn--inline pagination__btn--next">
          <span>Page ${n+1}</span>
          <svg class="search__icon">
            <use href="${c}#icon-arrow-right"></use>
          </svg>
        </button>
      `:n===r?`
        <button data-goto="${n-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${c}#icon-arrow-left"></use>
          </svg>
          <span>Page ${n-1}</span>
        </button>
      `:`
      <button data-goto="${n-1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${c}#icon-arrow-left"></use>
        </svg>
        <span>Page ${n-1}</span>
      </button>
      <button data-goto="${n+1}" class="btn--inline pagination__btn--next">
        <span>Page ${n+1}</span>
        <svg class="search__icon">
          <use href="${c}#icon-arrow-right"></use>
        </svg>
      </button>
    `}}const w=new K;class Q extends p{constructor(){super();o(this,"_parentElement",document.querySelector(".upload"));o(this,"_message","Recipe was successfully uploaded");o(this,"_window",document.querySelector(".add-recipe-window"));o(this,"_overlay",document.querySelector(".overlay"));o(this,"_btnOpen",document.querySelector(".nav__btn--add-recipe"));o(this,"_btnClose",document.querySelector(".btn--close-modal"));this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHanlerUpload(r){this._parentElement.addEventListener("submit",function(n){n.preventDefault();const i=[...new FormData(this)],a=Object.fromEntries(i);r(a)})}_generateMarkup(){}}const h=new Q,Y=async()=>{try{const t=window.location.hash.slice(1);if(!t)return;l.renderSpinner(),_.update(y()),await V(t),l.render(s.recipe),g.update(s.bookmarks)}catch(t){l.renderError(),console.error(t)}},G=async()=>{try{_.renderSpinner();const t=M.getQuery();if(!t)return;await W(t),_.render(y()),w.render(s.search)}catch{_.renderError()}},X=t=>{_.render(y(t)),w.render(s.search)},z=t=>{j(t),l.update(s.recipe)},Z=()=>{s.recipe.bookmarked?C(s.recipe.id):q(s.recipe),l.update(s.recipe),g.render(s.bookmarks)},ee=()=>{g.render(s.bookmarks)},te=async t=>{try{h.renderSpinner(),await I(t),console.log(s.recipe),l.render(s.recipe),h.renderMessage(),g.render(s.bookmarks),window.history.pushState(null,"",`#${s.recipe.id}`),setTimeout(function(){h.toggleWindow()},x*1e3)}catch(e){console.error("💥",e),h.renderError(e.message)}console.log(t)},re=()=>{g.addHandlerRender(ee),l.addHandlerRender(Y),l.addHandlerUpdateServings(z),l.addHandlerAddBookmark(Z),M.addHandlerSearch(G),w.addHandlerClick(X),h.addHanlerUpload(te)},se=()=>{localStorage.clear("bookmarks")};se();re();
