<!doctype html>
<html class="no-js" lang="zxx">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Employee Scheduling Tool</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- <link rel="manifest" href="site.webmanifest"> -->
    <!-- <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png"> -->
    <!-- Place favicon.ico in the root directory -->

    <!-- CSS here -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/nice-select.css">
    <link rel="stylesheet" href="css/flaticon.css">
    <link rel="stylesheet" href="css/flaticon.css">
    <link rel="stylesheet" href="css/gijgo.css">
    <link rel="stylesheet" href="css/slicknav.css">
    <link rel="stylesheet" href="css/style.css">
    <!-- <link rel="stylesheet" href="css/responsive.css"> -->
</head>

<body>
    <!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->

    <!-- header-start -->
    <header>
        <div class="header-area ">
            <div id="sticky-header" class="main-header-area">
                <div class="container-fluid p-0">
                    <div class="row align-items-center justify-content-between no-gutters">
                        <div class="col-xl-2 col-lg-2">
                            <div class="logo-img">
                                <a href="index.php">
                                    <img src="img/logo.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-8">
                            <div class="main-menu  d-none d-lg-block">
                                <nav>
                                    <ul id="navigation">
                                        <li><a class="active" href="index.php">Schedule</a></li>
                                        <li><a href="#">Analytics & Archive</a></li>
                                        <li><a href="#">Settings</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                         <div class="col-xl-2 col-lg-2 d-none d-lg-block">
                            <div class="noti-menu d-none d-lg-block">
                                <nav>
                                    <ul>
                                        <li style="position: absolute;margin-top: 6px;margin-left: -62px;">
                                            <a class="noti">
                                              <span class="has-badge" data-count="3">
                                                <i class="fa fa-bell" data-count="5"></i>
                                              </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                            <img class="profile-img" alt="User Profile Image" src="img/img_avatar.jpg"></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- header-end -->

    <div class="title_area">
        <div class="">
            <div class="row">
                <div class="col-xl-5 col-md-5" style="text-align: center">
                    <input type="hidden" id="cur_year" value="2019">
                    <span class="date-input" id="start_date">
                        Jan 1, 2019
                    </span> -
                    <span class="date-input" id="end_date">
                        Dec 31, 2019
                    </span>
                    <span class="cal prev-cal">
                        <i class="fa fa-caret-left"> </i>
                    </span>
                    <span class="cal next-cal">
                        <i class="fa fa-caret-right"></i>
                    </span>
                    <div class="btn-group option-cal" role="group" aria-label="Basic example">
                      <button type="button" id="year" class="btn btn-primary">Month</button>
                      <button type="button" id="month" class="btn btn-primary active">Year</button>
                    </div>
                </div>
                <div class="col-xl-2 col-md-2 middle-area" style="text-align: center">
                    
                </div>
                <div class="col-xl-5 col-md-5 schedule-area" style="text-align: center">

                    <span class="request-schedule">
                        <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" id="customSwitch1" checked>
                          <label class="custom-control-label" for="customSwitch1">Request Schedule Revision</label>
                        </div>
                    </span>
                    <span class="confirm-schedule">Confirm Schdule</span>
                </div>
            </div>
            <div class="lavel-div" style="text-align: center;margin-top:15px;">
                <span>Thank you for entering your scheduling constraints. You will be notified when the schedule is ready for your review</span>
            </div>
        </div>
    </div>
    <?php
        $months = array("January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October",
                        "November", "December"); 
    ?>
    <div class="calendar_area">
        <table class="calendar_year">
          <tr>
            <?php 
                $w = 100 / 32;
                for ($i = 0; $i < 32; $i ++){
                    if ($i == 0)
                        echo '<th></th>';
                    else
                        echo '<th style="padding:5px;width:'.$w.'%">' . $i . '</th>';
                }
            ?>
          </tr>
            <?php for ($i = 0; $i < 12; $i ++){
                    echo '<tr>';
                    echo '<td style="padding:10px;">' . $months[$i] . '</td>';
                    for ($j = 0; $j < 31; $j ++){
                        if ($i == 0 && $j == 5)
                            echo '<td><a href="#" class="item-schedule"><img class="img" src="img/item.png" /></a></td>';
                        else 
                            echo '<td>' . "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" . '</td>';
                    }
                    echo '</tr>';
                }
            ?>
        </table>
    </div>

    <!-- footer_start -->
    <footer class="footer">
        
    </footer>
    <!-- footer_end -->


    <!-- JS here -->
    <script src="js/vendor/modernizr-3.5.0.min.js"></script>
    <script src="js/vendor/jquery-1.12.4.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/isotope.pkgd.min.js"></script>
    <script src="js/ajax-form.js"></script>
    <script src="js/waypoints.min.js"></script>
    <script src="js/jquery.counterup.min.js"></script>
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <script src="js/scrollIt.js"></script>
    <script src="js/jquery.scrollUp.min.js"></script>
    <script src="js/wow.min.js"></script>
    <script src="js/nice-select.min.js"></script>
    <script src="js/gijgo.min.js"></script>
    <script src="js/jquery.slicknav.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/plugins.js"></script>

    <!--contact js-->
    <script src="js/contact.js"></script>
    <script src="js/jquery.ajaxchimp.min.js"></script>
    <script src="js/jquery.form.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/mail-script.js"></script>

    <script src="js/main.js"></script>

    <script>
           
    </script>
</body>
<script type="text/javascript">
    $(document).ready(function(){
        var tooltiphtml = '<div class="item-tooltip"><span>Mondy, 07 March</span><br>' +
                        '<span>08:00 AM - 08:00 PM</span></div>';
        $('.item-schedule').tooltip({title: tooltiphtml, html: true, placement: "bottom", animation: true}); 

        $(".next-cal").click(function(){
            var curYear = $("#cur_year").val();
            curYear = parseInt(curYear) + 1;
            $("#cur_year").val(curYear);
            $("#start_date").html("Jan 1, " + curYear);
            $("#end_date").html("Dec 31, " + curYear);
        })

        $(".prev-cal").click(function(){
            var curYear = $("#cur_year").val();
            curYear = parseInt(curYear) - 1;
            $("#cur_year").val(curYear);
            $("#start_date").html("Jan 1, " + curYear);
            $("#end_date").html("Dec 31, " + curYear);
        })
    })
</script>

</html>