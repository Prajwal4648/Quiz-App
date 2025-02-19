const finalScore = document.getElementById('finalScore');
const saveScoreForm = document.getElementById('saveScoreForm');
const username = document.getElementById('username');

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

saveScoreForm.addEventListener('submit', e => {
    e.preventDefault();

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/index.html');
});