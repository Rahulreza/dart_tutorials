document.addEventListener('DOMContentLoaded', () => {
    fetch('tutorials.json')
        .then(response => response.json())
        .then(data => {
            const tutorialList = document.getElementById('tutorial-list');
            const contentPlaceholder = document.getElementById('content-placeholder');

            data.tutorials.forEach(tutorial => {
                const li = document.createElement('li');
                li.textContent = tutorial.title;
                li.addEventListener('click', () => {
                    showContent(tutorial.id, tutorial.title, tutorial.description);
                });
                tutorialList.appendChild(li);
            });

            function showContent(id, title, description) {
                contentPlaceholder.innerHTML = `
                    <div id="${id}" class="content-item active">
                        <h2>${title}</h2>
                        ${description}
                    </div>
                `;
            }
        })
        .catch(error => console.error('Error fetching tutorials:', error));
});
