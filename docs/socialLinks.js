class SocialLinkHandler {
    constructor() {
        this.githubUrl = "https://github.com/kerthnorth";
        this.linkedinUrl = "https://www.linkedin.com/in/paul-kabeya-9a53b12b8";
    }

    setLinks() {
        const githubIcon = document.querySelector(".bxl-github") ? .parentElement;
        const linkedinIcon = document.querySelector(".bxl-linkedin-square") ? .parentElement;

        if (githubIcon) {
            githubIcon.setAttribute("href", this.githubUrl);
            githubIcon.setAttribute("target", "_blank");
        }

        if (linkedinIcon) {
            linkedinIcon.setAttribute("href", this.linkedinUrl);
            linkedinIcon.setAttribute("target", "_blank");
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const handler = new SocialLinkHandler();
    handler.setLinks();
});