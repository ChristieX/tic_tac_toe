<?php
// Scoreboard data fetched from a database or any other source
$scoreboard = [
    ['player' => 'Player 1', 'score' => 5],
    ['player' => 'Player 2', 'score' => 8],
    ['player' => 'Player 3', 'score' => 3],
    // Add more entries here if needed
];

// Function to sort the scoreboard using Quick Sort algorithm
function quickSort($arr) {
    if (count($arr) <= 1) {
        return $arr;
    }

    $pivot = $arr[floor(count($arr) / 2)];
    $left = [];
    $right = [];

    foreach ($arr as $entry) {
        if ($entry['score'] < $pivot['score']) {
            $left[] = $entry;
        } else if ($entry['score'] > $pivot['score']) {
            $right[] = $entry;
        }
    }

    return array_merge(quickSort($left), [$pivot], quickSort($right));
}

// Sort the scoreboard
$scoreboard = quickSort($scoreboard);

// Generate the scoreboard table
echo '<table id="scoreboard">';
echo '<tr><th>Player</th><th>Score</th></tr>';

foreach ($scoreboard as $entry) {
    echo '<tr><td>' . $entry['player'] . '</td><td>' . $entry['score'] . '</td></tr>';
}

echo '</table>';
?>
