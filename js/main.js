console.log("main.js loaded");
console.log(portfolioData);

function formatTitle(text) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function renderProjects(grid, projects) {

  if (!projects) return;

  projects.forEach(project => {

    const card = document.createElement("div");

    card.classList.add("project-card");

   card.innerHTML = `

<a
href="${project.images[0]}"
data-fancybox="${project.title}"
data-caption="${project.title}"
>

<img
src="${project.images[0]}"
alt="${project.title}"
>

<div class="project-overlay">

<h3>
${project.title}
</h3>

</div>

</a>

`;

    grid.appendChild(card);

  });

}

function renderPortfolio() {

  const container =
    document.getElementById(
      "portfolioContainer"
    );

  Object.keys(portfolioData)
    .forEach(category => {

      const section =
        document.createElement("section");

        section.classList.add(
        "portfolio-category"
        );

        section.id = category;
        section.setAttribute(
        "data-title",
        formatTitle(category)
        );

      section.innerHTML = `

        <div class="category-header">

          <h2>
         ${formatTitle(category)}
           </h2>

            <p class="category-count">
            ${portfolioData[category].length}
            Projects
            </p>

        </div>

        <div class="masonry-grid">

        </div>

      `;

      container.appendChild(section);

      renderProjects(
        section.querySelector(
          ".masonry-grid"
        ),
        portfolioData[category]
      );

    });

}

renderPortfolio();
setupPortfolioNav();
setupFeaturedCards();

const heroWall =
document.getElementById(
"heroWall"
);

const heroImages = [

"assets/Apparel_/Built To Last.webp",
"assets/Apparel_/Comfort This Ramzan.webp",
"assets/Apparel_/Tracksuit 06.webp",
"assets/Apparel_/Winwear 04.webp",
"assets/Apparel_/Winwear 05.webp",
"assets/Apparel_/Winwear 07.webp"

];

heroImages.forEach(src=>{

const img =
document.createElement("img");

img.src = src;

heroWall.appendChild(img);

});

const cursor =
document.querySelector(
".cursor"
);

document.addEventListener(
"mousemove",
e=>{

cursor.style.left =
e.clientX+"px";

cursor.style.top =
e.clientY+"px";

}
);

document
.querySelectorAll(
".project-card,.featured-card"
)

.forEach(item=>{

item.addEventListener(
"mouseenter",
()=>{

cursor.classList.add(
"active"
);

}
);

item.addEventListener(
"mouseleave",
()=>{

cursor.classList.remove(
"active"
);

}
);

});

const counters =
document.querySelectorAll(
".counter"
);

const observer =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter =
entry.target;

const target =
+counter.dataset.target;

let current = 0;

const update=()=>{

current +=
Math.ceil(
target/50
);

if(current>=target){

counter.innerText =
target+"+";

return;

}

counter.innerText =
current;

requestAnimationFrame(
update
);

};

update();

observer.unobserve(
counter
);

}

});

}

);

counters.forEach(counter=>{

observer.observe(counter);

});

document
.querySelectorAll(
"section"
)

.forEach(section=>{

section.classList.add(
"reveal"
);

});

const revealObserver =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

}

});

},
{
threshold:.15
}

);

document
.querySelectorAll(
".reveal"
)

.forEach(section=>{

revealObserver.observe(
section
);

});

Fancybox.bind(
"[data-fancybox]",
{}
);

function setupPortfolioNav(){

document
.querySelectorAll(
".portfolio-nav button"
)

.forEach(button=>{

button.addEventListener(
"click",
()=>{

const target =
button.dataset.target;

const section =
document.getElementById(
target
);

if(section){

window.scrollTo({

top:
section.offsetTop - 180,

behavior:"smooth"

});

}

});

});

}

function setupFeaturedCards(){

document
.querySelectorAll(".featured-card")
.forEach(card=>{

card.addEventListener("click",()=>{

const target =
card.dataset.target;

const section =
document.getElementById(target);

if(section){

window.scrollTo({

top:
section.offsetTop - 180,

behavior:"smooth"

});

}

});

});

}

let lastScroll = 0;

window.addEventListener(
"scroll",
() => {

const current =
window.pageYOffset;

const header =
document.querySelector("header");

if(current > lastScroll){

header.style.transform =
"translateY(-100%)";

}else{

header.style.transform =
"translateY(0)";

}

lastScroll = current;

}
);

const portfolioNav =
document.querySelector(".portfolio-nav");

const portfolioSection =
document.getElementById("portfolio");

let lastPortfolioScroll =
window.scrollY;

window.addEventListener("scroll",()=>{

const current =
window.scrollY;

const portfolioTop =
portfolioSection.offsetTop;

const portfolioBottom =
portfolioTop +
portfolioSection.offsetHeight;

const insidePortfolio =
current > portfolioTop - 150;

if(insidePortfolio){

if(current < lastPortfolioScroll){

portfolioNav.classList.add("show");

}else{

portfolioNav.classList.remove("show");

}

}else{

portfolioNav.classList.remove("show");

}

lastPortfolioScroll = current;

});

document.addEventListener(
"contextmenu",
e => e.preventDefault()
);

document.addEventListener(
"dragstart",
e => e.preventDefault()
);

document.querySelectorAll("img")
.forEach(img=>{

img.setAttribute(
"draggable",
"false"
);

});

