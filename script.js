function renderPortfolio() {
  const { profile, projects } = PORTFOLIO;
  const track = document.getElementById("slides");
  const template = document.getElementById("slide-template");
  const total = projects.length;

  projects.forEach((project, index) => {
    const node = template.content.cloneNode(true);
    const slide = node.querySelector(".slide");

    slide.querySelector("[data-field='counter']").textContent =
      `Project ${index + 1} of ${total}`;

    slide.querySelector("[data-field='title']").textContent = project.title;
    slide.querySelector("[data-field='year']").textContent = project.year;
    slide.querySelector("[data-field='role']").textContent = project.role;

    const linkEl = slide.querySelector("[data-field='publicationLink']");
    if (project.publicationLink) {
      linkEl.textContent = project.publicationLink;
      linkEl.href = project.publicationLink;
    } else {
      linkEl.textContent = "—";
      linkEl.removeAttribute("href");
    }

    slide.querySelector("[data-field='description']").textContent =
      project.description;

    const mediaBox = slide.querySelector("[data-field='mediaBox']");
    if (project.image) {
      mediaBox.classList.remove("media-box--empty");
      mediaBox.innerHTML = `<img src="${project.image}" alt="${project.title}" class="media-box__image">`;
    } else {
      const captionEl = mediaBox.querySelector("[data-field='imageCaption']");
      if (captionEl) {
        captionEl.textContent =
          project.imageCaption ||
          "Screenshots of scenes & link to your online publication are required if your portfolio is a video.";
      }
    }

    slide.querySelector("[data-field='name']").textContent = profile.name;
    slide.querySelector("[data-field='school']").textContent = profile.school;
    slide.querySelector("[data-field='schoolStatus']").textContent =
      profile.schoolStatus;
    slide.querySelector("[data-field='contact']").textContent =
      profile.contact;
    slide.querySelector("[data-field='submissionFor']").textContent =
      profile.submissionFor;

    track.appendChild(node);
  });

  document.title = `${profile.name} — Portfolio`;
  const navContainer = document.getElementById("nav-dots");
  projects.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "nav-dot";
    dot.setAttribute("aria-label", `Go to project ${index + 1}`);
    dot.addEventListener("click", () => {
      document
        .getElementById(`slide-${index}`)
        .scrollIntoView({ behavior: "smooth" });
    });
    navContainer.appendChild(dot);
  });
  const slideEls = Array.from(document.querySelectorAll(".slide"));
  slideEls.forEach((el, i) => (el.id = `slide-${i}`));

  const dots = Array.from(navContainer.children);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const i = slideEls.indexOf(entry.target);
          dots.forEach((d) => d.classList.remove("nav-dot--active"));
          if (dots[i]) dots[i].classList.add("nav-dot--active");
        }
      });
    },
    { threshold: 0.5 }
  );
  slideEls.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", renderPortfolio);
