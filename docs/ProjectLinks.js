class ProjectLinkHandler {
    constructor() {
        this.fitnessAppUrl = "https://github.com/kerthnorth/Final_fitnessapp/tree/main/fit_quest";
        this.bankingSystemUrl = "https://github.com/kerthnorth/ModifiedATM?tab=readme-ov-file";
        this.ClockProjectUrl = "https://github.com/kerthnorth/clockproject/tree/master"
    }

    setLinks() {
        const projectBoxes = document.querySelectorAll(".project-box");

        if (projectBoxes.length > 0) {
            projectBoxes.forEach(box => {

                const projectTitle = box.querySelector("h3").textContent;


                const anchor = document.createElement("a");

                // This is the section I will use to check and connect to a desired url when i want to connect to my projects
                if (projectTitle.includes("Fitness App")) {
                    anchor.setAttribute("href", this.fitnessAppUrl);
                }
                if (projectTitle.includes("Banking System Project")) {
                    anchor.setAttribute("href", this.bankingSystemUrl);
                } else if (projectTitle.includes("Clock Project")) {
                    anchor.setAttribute("href", this.ClockProjectUrl);
                }


                anchor.setAttribute("target", "_blank");
                anchor.style.textDecoration = "none";
                anchor.style.color = "inherit";

                const parent = box.parentNode;
                parent.insertBefore(anchor, box);
                anchor.appendChild(box);

                // Here I add the hover effect so that when can hover over my project and url is displayed.
                box.style.cursor = "pointer";
                box.classList.add("clickable-project");
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const handler = new ProjectLinkHandler();
    handler.setLinks();
});