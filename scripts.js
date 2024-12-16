document.addEventListener('DOMContentLoaded', function() {
    const repoList = document.getElementById('repo-list');

    // Fetch repositories from GitHub API
    fetch('https://api.github.com/users/sad1998/repos')
        .then(response => response.json())
        .then(repos => {
            // Sort repositories by creation date (newest first)
            repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // Limit to the first 10 repositories
            const limitedRepos = repos.slice(0, 10);

            // Create repository elements
            limitedRepos.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.classList.add('repo-item');

                const repoName = document.createElement('h3');
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;
                repoLink.target = '_blank';
                repoName.appendChild(repoLink);

                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description || 'No description available.';

                repoItem.appendChild(repoName);
                repoItem.appendChild(repoDescription);
                repoList.appendChild(repoItem);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Unable to load repositories at this time.';
            repoList.appendChild(errorMessage);
        });
});
