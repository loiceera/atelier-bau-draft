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
