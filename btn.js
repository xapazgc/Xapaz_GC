function showArticle(articleNumber) {
            // Hide all articles
            var articles = document.getElementsByClassName("article");
            for (var i = 0; i < articles.length; i++) {
                articles[i].style.display = "none";
            }

            // Show the selected article
            var selectedArticle = document.getElementById("article" + articleNumber);
            if (selectedArticle) {
                selectedArticle.style.display = "block";
            }
        }