
var user = null;
var scoreboardContainer = document.querySelector(`#scoreboard`);

// retrieve initials and score from local storage
function retrieveLocalStorage () {
    user = JSON.parse(localStorage.getItem('user'));
}

retrieveLocalStorage()
for (let i=0; i<user.length; i++) {
    var scoreboardEl = document.createElement("h2");
    scoreboardEl.textContent = `${user[i].initials}: ${user[i].score}`;
    scoreboardContainer.appendChild(scoreboardEl);
}
