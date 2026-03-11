async function loadSection(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadSection("navbar", "sections/navbar.html");
  await loadSection("hero", "sections/hero.html");
  await loadSection("trust", "sections/trust-bar.html");
  await loadSection("how", "sections/how-it-works.html");
  await loadSection("plans", "sections/plans.html");
  await loadSection("why", "sections/why-us.html");
  await loadSection("testimonials", "sections/testimonials.html");
  await loadSection("cta", "sections/cta.html");
  await loadSection("footer", "sections/footer.html");

  document.dispatchEvent(new CustomEvent("sectionsLoaded"));
});