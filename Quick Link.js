function showAddSiteForm() {
      document.getElementById('popup').style.display = 'block';
    }

    function closePopup() {
      document.getElementById('popup').style.display = 'none';
    }

    function addSiteFromPopup() {
      var name = document.getElementById('popupName').value;
      var url = document.getElementById('popupUrl').value;
      var iconUrl = document.getElementById('popupIconUrl').value;

      addSite(name, url, iconUrl);

      // Close the popup after adding the site
      closePopup();
    }

    function addSite(name, url, iconUrl) {
      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.textContent = name;

      var siteIcon = document.createElement('img');
      siteIcon.src = iconUrl;
      siteIcon.classList.add('siteIcon');
      siteIcon.onclick = function() {
        redirectToSite(url);
      };

      var deleteButton = document.createElement('button');
        var deleteImage = document.createElement('img');
        deleteImage.src = 'https://cdn-icons-png.flaticon.com/512/3405/3405244.png'; 
        deleteImage.alt = '';
        deleteImage.style.width = '20px';
        deleteButton.appendChild(deleteImage);
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = function() {
          deleteSite(link);
        };

        var editButton = document.createElement('button');
        var editImage = document.createElement('img');
        editImage.src = 'https://cdn-icons-png.flaticon.com/512/7398/7398464.png';
        editImage.alt = '';
        editImage.style.width = '20px';
        editButton.appendChild(editImage);
        editButton.classList.add('deleteButton', 'edit');
        editButton.onclick = function() {
          editSite(link, siteIcon, site.name, site.url, site.iconUrl);
        };

      var addedSiteContainer = document.createElement('div');
      addedSiteContainer.classList.add('addedSite');
      addedSiteContainer.appendChild(siteIcon);
      addedSiteContainer.appendChild(link);
      addedSiteContainer.appendChild(deleteButton);
      addedSiteContainer.appendChild(editButton);

      document.getElementById('addedSitesContainer').appendChild(addedSiteContainer);

      var addedSites = JSON.parse(localStorage.getItem('addedSites')) || [];
      addedSites.push({ name: name, url: url, iconUrl: iconUrl });
      localStorage.setItem('addedSites', JSON.stringify(addedSites));

      document.getElementById('popupName').value = '';
      document.getElementById('popupUrl').value = '';
      document.getElementById('popupIconUrl').value = '';
    }

    function editSite(link, siteIcon, name, url, iconUrl) {
      var newName = prompt('Enter new name:', name);
      var newUrl = prompt('Enter new URL:', url);
      var newIconUrl = prompt('Enter new icon URL:', iconUrl);

      if (newName !== null && newUrl !== null && newIconUrl !== null) {
        // Update the link, siteIcon, and storage with the new information
        link.textContent = newName;
        link.href = newUrl;
        siteIcon.src = newIconUrl;

        var addedSites = JSON.parse(localStorage.getItem('addedSites')) || [];
        var siteIndex = addedSites.findIndex(function(site) {
          return site.name === name;
        });

        if (siteIndex !== -1) {
          addedSites[siteIndex] = { name: newName, url: newUrl, iconUrl: newIconUrl };
          localStorage.setItem('addedSites', JSON.stringify(addedSites));
        }
      }
    }

    function deleteSite(link) {
      var addedSitesContainer = document.getElementById('addedSitesContainer');
      var addedSiteContainer = link.parentElement;
      addedSitesContainer.removeChild(addedSiteContainer);

      var addedSites = JSON.parse(localStorage.getItem('addedSites')) || [];
      var siteIndex = addedSites.findIndex(function(site) {
        return site.name === link.textContent;
      });

      if (siteIndex !== -1) {
        addedSites.splice(siteIndex, 1);
        localStorage.setItem('addedSites', JSON.stringify(addedSites));
      }
    }

    function loadAddedSites() {
      var addedSites = JSON.parse(localStorage.getItem('addedSites')) || [];
      var addedSitesContainer = document.getElementById('addedSitesContainer');

      addedSites.forEach(function(site) {
        var link = document.createElement('a');
        link.href = site.url;
        link.target = '_blank';
        link.textContent = site.name;

        var siteIcon = document.createElement('img');
        siteIcon.src = site.iconUrl;
        siteIcon.classList.add('siteIcon');
        siteIcon.onclick = function() {
          redirectToSite(site.url);
        };

       var deleteButton = document.createElement('button');
        var deleteImage = document.createElement('img');
        deleteImage.src = 'https://cdn-icons-png.flaticon.com/512/3405/3405244.png'; 
        deleteImage.alt = '';
        deleteImage.style.width = '20px';
        deleteButton.appendChild(deleteImage);
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = function() {
          deleteSite(link);
        };

        var editButton = document.createElement('button');
        var editImage = document.createElement('img');
        editImage.src = 'https://cdn-icons-png.flaticon.com/512/7398/7398464.png';
        editImage.alt = '';
        editImage.style.width = '20px';
        editButton.appendChild(editImage);
        editButton.classList.add('deleteButton', 'edit');
        editButton.onclick = function() {
          editSite(link, siteIcon, site.name, site.url, site.iconUrl);
        };


        var addedSiteContainer = document.createElement('div');
        addedSiteContainer.classList.add('addedSite');
        addedSiteContainer.appendChild(siteIcon);
        addedSiteContainer.appendChild(link);
        addedSiteContainer.appendChild(deleteButton);
        addedSiteContainer.appendChild(editButton);

        addedSitesContainer.appendChild(addedSiteContainer);

        link.addEventListener('click', function() {
          toggleMenu(deleteButton);
        });
      });
    }

    function toggleMenu(deleteButton) {
      deleteButton.style.display = (deleteButton.style.display === 'none' || deleteButton.style.display === '') ? 'inline' : 'none';
    }

    function redirectToSite(url) {
      window.open(url, '_blank');
    }

    window.onload = function() {
      loadAddedSites();
    };
     function removePlaceholder(element) {
            element.placeholder = '';
        }
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
    function showArticle(articleNumber) {
    // Hide all articles
    var articles = document.getElementsByClassName("article");
    for (var i = 0; i < articles.length; i++) {
        articles[i].style.display = "none";
    }

    // Hide the slider, open button, and plusIcon by default
    document.getElementById("slider").style.left = "-300px";
    document.getElementById("openBtn").style.visibility = "hidden";
    document.getElementById("plusIcon").style.display = "none";

    // Show or hide the plusIcon based on the articleNumber
    if (articleNumber === 1) {
        document.getElementById("plusIcon").style.display = "block";
        document.getElementById("addedSitesContainer").style.display = "block";
        document.getElementById("addedSitesContainer").style.width = "300px"; // Set the width here
        document.getElementById("openBtn").style.visibility = "visible";
    } else {
        document.getElementById("addedSitesContainer").style.display = "none";
    }

    // Show the selected article
    var selectedArticle = document.getElementById("article" + articleNumber);
    if (selectedArticle) {
        selectedArticle.style.display = "block";
    }
}