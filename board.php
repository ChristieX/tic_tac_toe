<?php
// Connect to the database
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'your_database';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Fetch scores from the database
$query = 'SELECT username, score FROM scores';
$result = $conn->query($query);

$scores = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $username = $row['username'];
        $score = $row['score'];
        $scores[$username] = $score;
    }
}

// Close the database connection
$conn->close();

// Display scores
foreach ($scores as $username => $score) {
    echo "Username: $username, Score: $score<br>";
}
?>
