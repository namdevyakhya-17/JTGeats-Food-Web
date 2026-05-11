export function initModal() {
    const dishRequestBtn = document.querySelector(".dish-request");
    const modal = document.getElementById("dishModal");
    const cancelBtn = modal.querySelector("#cancelDish");
    const submitBtn = modal.querySelector("#submitDish");
    const body = document.body;

    if (!dishRequestBtn || !modal) {
        console.log("Modal elements not found");
        return;
    }
    dishRequestBtn.addEventListener("click", () => {
        modal.classList.remove("hidden", "closing");
        requestAnimationFrame(() => {
            modal.classList.add("show");
        });
        body.classList.add("no-scroll");
    });
    
    function closeModal() {
        modal.classList.add("closing");
        setTimeout(() => {
            modal.classList.remove("show", "closing");
            modal.classList.add("hidden");
            body.classList.remove("no-scroll");
        }, 300);
    }

    cancelBtn?.addEventListener("click", closeModal);
    submitBtn?.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}