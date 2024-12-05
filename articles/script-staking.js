document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section");
    const explorer = document.getElementById("section-explorer");
    const toggleButton = document.getElementById("toggle-theme");

    // Create Section Explorer dynamically
    const tocList = document.createElement("ul");
    sections.forEach((section, index) => {
        const listItem = document.createElement("li");
        const dot = document.createElement("div");
        const label = document.createElement("span");

        dot.classList.add("dot");
        label.textContent = section.querySelector("h2, h3").textContent;

        listItem.appendChild(dot);
        listItem.appendChild(label);

        listItem.addEventListener("click", () => {
            section.scrollIntoView({ behavior: "smooth" });
        });

        tocList.appendChild(listItem);
    });
    explorer.appendChild(tocList);

    // Intersection observer to track visible sections
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const idx = Array.from(sections).indexOf(entry.target);
                const dots = explorer.querySelectorAll(".dot");

                if (entry.isIntersecting) {
                    dots[idx].classList.add("active");
                } else {
                    dots[idx].classList.remove("active");
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Show Section Explorer after first section
    const firstSection = sections[0];
    const tocObserver = new IntersectionObserver(
        ([entry]) => {
            explorer.style.display = entry.isIntersecting ? "none" : "block";
        },
        { threshold: 0.1 }
    );

    tocObserver.observe(firstSection);

    // Theme toggle functionality
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});