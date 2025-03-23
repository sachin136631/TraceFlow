(function() {
    console.log("Pixel script loaded");
    const urlParams = new URLSearchParams(window.location.search);
    const pixelId = urlParams.get("id");

    //if (!pixelId) return;

    function trackEvent(eventType) {
        console.log("hiii");
        console.log(`Attempting to track event: ${eventType} for pixelId: ${pixelId}`);
        fetch("http://localhost:5000/trackevent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pixelId,
                eventType,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.text())
        .then(data => console.log("Event tracked successfully:", data))
        .catch(error => console.error("Tracking error:", error));
    }

    trackEvent("page_view");

    document.addEventListener("click", (event) => {
        console.log("Click event detected");
        const target = event.target;
        console.log("Clicked element:", target);
        console.log("Class list:", target.classList);
        console.log("Tag name:", target.tagName);
        console.log("Inner text:", target.innerText);

        if (target.matches(".add-to-cart")) {
            console.log("✅ Add to Cart button clicked!");
            trackEvent("add_to_cart");
        }

        if (target.tagName === "BUTTON" || target.tagName === "A") {
            console.log("✅ A button or link was clicked:", event.target.innerText);
            const buttonText = target.innerText.trim().toLowerCase();
            if (buttonText.includes("add to cart") || buttonText.includes("buy now")) {
                trackEvent("add_to_cart");
            }
        }
    });
})();