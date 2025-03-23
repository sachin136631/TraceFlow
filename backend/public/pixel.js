(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pixelId = urlParams.get("id");

    if (!pixelId) return;

    function trackEvent(eventType) {
        fetch("https://yourserver.com/track-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pixelId,
                eventType,
                timestamp: new Date().toISOString()
            })
        }).catch(error => console.error("Tracking error:", error));
    }

    trackEvent("page_view");

    document.addEventListener("click", (event) => {
        const target = event.target;


        if (target.matches(".add-to-cart")) {
            trackEvent("add_to_cart");
        }

        if (target.tagName === "BUTTON" || target.tagName === "A") {
            const buttonText = target.innerText.trim().toLowerCase();
            if (buttonText.includes("add to cart") || buttonText.includes("buy now")) {
                trackEvent("add_to_cart");
            }
        }
    });

})();
