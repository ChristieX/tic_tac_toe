<?php
    //For inserting new customer to database
    include('conn_db.php');
    $pwd = $_POST["pwd"];
    $cfpwd = $_POST["cfpwd"];
    if($pwd != $cfpwd){
        ?>
        <script>
            alert('Your password is not match.\nPlease enter it again.');
            history.back();
        </script>
        <?php
        exit(1);
    }else{
        $username = $_POST["username"];
        $password=$_POST["password"];

        //Check for duplicating username
        $query = "SELECT c_username FROM customer WHERE c_username = '$username';";
        $result = $mysqli -> query($query);
        if($result -> num_rows >= 1){
            ?>
            <script>
                alert('Your username is already taken!');
                history.back();
            </script>
            <?php
        }
        $result -> free_result();

        $query = "INSERT INTO customer (c_username,c_pwd)
        VALUES ('$username','$pwd');";

        $result = $mysqli -> query($query);

        if($result){
            header("location: game.html");
        }else{
            header("location: game.html?err={$mysqli -> errno}");
        }
    }
?>