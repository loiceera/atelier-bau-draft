window.addEventListener("load", () =>
  setTimeout(
    () => document.querySelector(".loader").classList.add("done"),
    850,
  ),
);
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document.querySelectorAll(".project").forEach((p) => {
  p.addEventListener("mouseenter", () => cursor.classList.add("on"));
  p.addEventListener("mouseleave", () => cursor.classList.remove("on"));
});
const projects = [...document.querySelectorAll(".project")];
const viewer = document.querySelector(".project-viewer");
const viewerImage = viewer.querySelector("img");
const viewerTitle = viewer.querySelector("h2");
const viewerMeta = viewer.querySelector(".viewer-info p");
const viewerCount = viewer.querySelector(".viewer-count");
let currentProject = 0;

function showProject(index) {
  currentProject = (index + projects.length) % projects.length;
  const project = projects[currentProject];
  const image = project.querySelector("img");
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  viewerTitle.textContent = project.querySelector("h3").textContent;
  viewerMeta.textContent = project.querySelector("p").textContent;
  viewerCount.textContent = `${String(currentProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
}

projects.forEach((project, index) => {
  project.addEventListener("click", () => {
    showProject(index);
    viewer.showModal();
  });
  project.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      project.click();
    }
  });
});
viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
viewer.querySelector(".viewer-prev").addEventListener("click", () => showProject(currentProject - 1));
viewer.querySelector(".viewer-next").addEventListener("click", () => showProject(currentProject + 1));
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) viewer.close();
});
document.addEventListener("keydown", (event) => {
  if (!viewer.open) return;
  if (event.key === "ArrowLeft") showProject(currentProject - 1);
  if (event.key === "ArrowRight") showProject(currentProject + 1);
});
const reveals = document.querySelectorAll(
  ".project,.statement h2,.intro,.manifesto h2,.manifesto-lines p,.practice-copy",
);
reveals.forEach((x) => x.classList.add("reveal"));
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.08 },
);
reveals.forEach((x) => io.observe(x));
const toggle = document.querySelector("#viewToggle"),
  grid = document.querySelector(".project-grid");
toggle.addEventListener("click", () => {
  grid.classList.toggle("index");
  toggle.textContent = grid.classList.contains("index")
    ? "Image view"
    : "Index view";
});
