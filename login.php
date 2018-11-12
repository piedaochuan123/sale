    <?php
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE');
        $username=$_POST['username'];
        $password=$_POST['password'];
        $con=mysqli_connect('localhost','root','') or die('数据库连接失败');
        $x=mysqli_select_db($con,'sale') or die('11');
        $y=mysqli_query($con,"SELECT * from user where username = '{$username}'") or die(22);
        $dbusername=null;
        $dbpassword=null;
        $money=null;
        while($row=mysqli_fetch_array($y)){
            $dbusername=$row['username'];
            $dbpassword=$row['password'];
            $money=$row['balance'];
        }
        if($password != $dbpassword){
        echo json_encode('wrong');
        }
        else{
        $boss='boss';
        $seller='seller';
        $buyer='buyer';
        if($username =='piedaochuan'){
            echo json_encode([$boss,$username,$money]);
        };
        if($username == 'seller1' || $username == 'seller2' || $username == 'seller3'){
            echo json_encode([$seller,$username,$money]);
        };
        if($username == 'buyer1' || $username == 'buyer2' || $username == 'buyer3' || $username == 'buyer4' || $username == 'buyer5'){
            echo json_encode([$buyer,$username,$money]);
        };
    }
    ?>





