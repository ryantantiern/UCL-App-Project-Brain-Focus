<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>GetFocused</title>

    <!-- Bootstrap Core CSS -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../../css/grayscale.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../../font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">



</head>

<body>

    <header class="intro">
        <div class="intro-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <h1 class="brand-heading"><br>Get Focused!</h1>
                        <h3>Excellent</h3>
                        <img src="../../img/WaveSong1.jpg" alt="Original Soundwave" style="width:704px;height:328px;">
												<div style=" width:704px;height:328px; position: absolute; top: 260px; left: 38px; border:0;">	
													<canvas !important id="myCanvas" style="height:100%; width:100%;  background" > </canvas>
												</div>
												<ul class="list-inline">
                            <li>
                                <a href="../../html/PlayPage.html" class="btn btn-default btn-lg"><i class="fa fa-play"></i><span class="">   Play again</span></a>
                            </li>
                            <li>
                                <a href="../../html/MainMenu.html" class="btn btn-default btn-lg"><i class="fa fa-home"></i><span class="">   Main Menu</span></a>
                            </li>
                            <li>
                                <a href="javascript:window.open('','_self').close();" class="btn btn-default btn-lg"><i class="fa fa-sign-out"></i><span class="">   Quit</span></a>
                             </li>
                        </ul>
											<script>											
											function drawLine(x1, y1, x2, y2){
													context.beginPath();
													context.moveTo(x1, y1);
													context.lineTo(x2, y2);
													context.lineWidth =1;
													
													context.strokeStyle ='red';
													context.stroke();
												}
											var canvas = document.getElementById('myCanvas');
											var context = canvas.getContext('2d');
											var myGraphArray = <?php echo $_SESSION["json_data"];?>;
											
																					
											for( i=0; i < myGraphArray.length-1; i++){ 
												drawLine((myGraphArray[i].t * 704), (myGraphArray[i].y * 328), (myGraphArray[i+1].t* 704),( myGraphArray[i+1].y * 328));
											} 
												
											</script>
											<br><br><br><br><br><br>
                    </div>
                </div>
            </div>
        </div>
    </header>

</body>

</html>
<?php 
	session_write_close();
	session_unset();
?>