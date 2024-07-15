document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menu-button');
    const drawerBackground = document.getElementById('drawer-background');
    const appBarTitle = document.getElementById('app-bar-title');
    const tutorialList = document.getElementById('tutorial-list');
    const contentPlaceholder = document.getElementById('content-placeholder');
    const searchInput = document.getElementById('search-input');

    menuButton.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        drawerBackground.classList.toggle('active');
    });

    drawerBackground.addEventListener('click', function() {
        sidebar.classList.remove('active');
        drawerBackground.classList.remove('active');
    });

    fetch('tutorials.json')
        .then(response => response.json())
        .then(data => {
            const tutorials = data.tutorials;
            renderTutorialList(tutorials);

            searchInput.addEventListener('input', function() {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredTutorials = tutorials.filter(tutorial =>
                    tutorial.title.toLowerCase().includes(searchTerm)
                );
                renderTutorialList(filteredTutorials);
            });
        })
        .catch(error => {
            console.error('Error fetching tutorials:', error);
            contentPlaceholder.innerHTML = `
                <h2>Error</h2>
                <p>Could not fetch tutorials. Please try again later.</p>
            `;
        });

    function renderTutorialList(tutorials) {
        tutorialList.innerHTML = '';
        tutorials.forEach(tutorial => {
            const li = document.createElement('li');
            li.textContent = tutorial.title;
            li.addEventListener('click', function() {
                sidebar.classList.remove('active');
                drawerBackground.classList.remove('active');
                appBarTitle.textContent = tutorial.title;
                contentPlaceholder.innerHTML = `
                    <h2>${tutorial.title}</h2>
                    <img src="${tutorial.image}" alt="${tutorial.title}">
                    <p>${tutorial.description}</p>
                `;
            });
            tutorialList.appendChild(li);
        });
    }
});
