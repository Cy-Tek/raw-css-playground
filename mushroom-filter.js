const cards = document.querySelectorAll(".mushroom-guide .card");
cards.forEach((card, index) => {
    card.style.viewTransitionName = `mushroom-card-${index + 1}`;
});

const seasonalFilter = document.getElementById("season");
const edibleFilter = document.getElementById("edible");
const noResultsMessage = document.querySelector(".no-matches");

const currentFilters = {
    season: "all",
    edible: "all",
};

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
    const filterType = e.target.name;
    currentFilters[filterType] = e.target.value;

    if (!document.startViewTransition) {
        filterCards();
        return;
    }

    document.startViewTransition(() => filterCards());
}

function filterCards() {
    let hasVisibleCards = false;

    cards.forEach((card) => {
        const season = card.querySelector("[data-season").dataset.season;
        const edible = card.querySelector("[data-edible]").dataset.edible;

        const matchesSeason =
            currentFilters.season === "all" || season === currentFilters.season;
        const matchesEdible =
            currentFilters.edible === "all" || edible === currentFilters.edible;

        if (matchesEdible && matchesSeason) {
            card.hidden = false;
            hasVisibleCards = true;
        } else {
            card.hidden = true;
        }
    });

    if (hasVisibleCards) {
        noResultsMessage.hidden = true;
    } else {
        noResultsMessage.hidden = false;
    }
}

function enableFiltering() {
    seasonalFilter.hidden = false;
    edibleFilter.hidden = false;
}

enableFiltering();
