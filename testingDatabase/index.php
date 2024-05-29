<h1>Testing DB connection</h1>

<form action="insertColor.php" method="post">
    <label for="color">Insert Color</label><br>
    <input type="text" id="colorInput" name="colorInput"><br>
    <label for="colorCode">Insert Color Code</label><br>
    <input type="text" id="colorCodeInput" name="colorCodeInput"><br>
    <input type="submit" name="Submit" value="Submit">
</form>

<?php
    include('insertColor.php');

    $results = 
?>