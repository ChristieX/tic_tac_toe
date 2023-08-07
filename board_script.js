// Scoreboard data (dummy data for demonstration purposes)
var scoreboard = [
    { player: 'Player 1', score: 5 },
    { player: 'Player 2', score: 8 },
    { player: 'Player 3', score: 3 },
    { player: 'you', score: 0 },
    // Add more entries here if needed
];

// Function to dynamically generate the scoreboard table
function generateScoreboard() {
    var scoreboardTable = document.getElementById('scoreboard');
    var scoreboardHTML = '';

    for (var i = 0; i < scoreboard.length; i++) {
        var entry = scoreboard[i];
        scoreboardHTML += '<tr><td>' + entry.player + '</td><td>' + entry.score + '</td></tr>';
    }

    scoreboardTable.innerHTML += scoreboardHTML;
}

// Function to sort the scoreboard using Quick Sort algorithm
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var pivot = arr[Math.floor(arr.length / 2)];
    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].score < pivot.score) {
            left.push(arr[i]);
        } else if (arr[i].score > pivot.score) {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));
}

// Sort the scoreboard and generate the table
scoreboard = quickSort(scoreboard);
generateScoreboard();