const navToggle = document.querySelector('[aria-controls="primary-nav"]');
const primaryNav = document.getElementById("primary-nav");

navToggle.addEventListener("click", () => {
    const navOpened = navToggle.getAttribute("aria-expanded");

    if (navOpened === "false") {
        navToggle.setAttribute("aria-expanded", "true");
    } else {
        navToggle.setAttribute("aria-expanded", "false");
    }
});

const resizeObserver = new ResizeObserver(() => {
    document.body.classList.add("resizing");

    requestAnimationFrame(() => {
        document.body.classList.remove("resizing");
    });
});

resizeObserver.observe(document.body);

document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link || !document.startViewTransition) return;

    const url = new URL(link.href, location.href);
    const isSamePage =
        url.pathname === location.pathname && url.hash !== location.hash;

    if (!isSamePage) return;

    e.preventDefault();
    document.startViewTransition(() => {
        location.hash = url.hash;
    });
});
