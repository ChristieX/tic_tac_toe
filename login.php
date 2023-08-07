<?php
// Database connection credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tic_tac_toe";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["login"])) {
        // Handle login functionality
        $username = $_POST["username"];
        $password = $_POST["password"];

        // Perform a query to check if the username and password match
        $sql = "SELECT * FROM `scoreboard` WHERE `username` = '$username' AND `password` = '$password'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows == 1) {
            // Successful login
            header("Location: game.html");
            exit();
        } else {
            // Invalid credentials
            echo "Invalid username or password!";
        }
    } elseif (isset($_POST["register"])) {
        // Handle registration functionality
        $username = $_POST["username"];
        $password = $_POST["password"];

        // Check if the username already exists
        $checkSql = "SELECT * FROM `scoreboard` WHERE `username` = '$username'";
        $checkResult = $conn->query($checkSql);

        if ($checkResult && $checkResult->num_rows > 0) {
            // Username already exists
            echo "Username already exists. Please choose a different username.";
        } else {
            // Insert the new user into the database
            $Sql = "INSERT INTO `scoreboard` (`username`, `password`) VALUES ('$username', '$password')";

            if ($conn->query($Sql) === true) {
                // Registration successful
                header("Location: game.html");
                exit();
            } else {
                // Error occurred during registration
                echo "Error: " . $Sql . "<br>" . $conn->error;
            }
        }
    }
}

// Close the database connection
$conn->close();
?>