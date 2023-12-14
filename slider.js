function openSlider() {
            document.getElementById("slider").style.left = "0";
            document.getElementById("openBtn").style.visibility = "hidden";

            // Hide addedSitesContainer when the slider is open
            document.getElementById("addedSitesContainer").style.display = "none";
        }

        function closeSlider() {
            document.getElementById("slider").style.left = "-300px";
            document.getElementById("openBtn").style.visibility = "visible";

            // Show addedSitesContainer when the slider is closed
            document.getElementById("addedSitesContainer").style.display = "flex";
        }