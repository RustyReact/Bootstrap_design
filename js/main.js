(function ($) {
"use strict";
// TOP Menu Sticky
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	// if (scroll < 400) {
 //    $("#sticky-header").removeClass("sticky");
 //    $('#back-top').fadeIn(500);
	// } else {
 //    $("#sticky-header").addClass("sticky");
 //    $('#back-top').fadeIn(500);
	// }
});


$(document).ready(function(){

  // mobile_menu
  var menu = $('ul#navigation');
  if(menu.length){
  	menu.slicknav({
  		prependTo: ".mobile_menu",
  		closedSymbol: '+',
  		openedSymbol:'-'
  	});
  };

  var notihtml = '<a><img class="slicknav_btn profile-img" alt="User Profile Image" src="img/img_avatar.jpg"></a>';

  $(".mobile_menu .slicknav_btn").after(notihtml);

  $(".control-timepicker").each(function(){
          //   $(this).focus(function(){

          //       // var time;
          //       // if ($(this).val() == "") {
          //       //     time = "";
          //       // }else{
          //       //     time = $(this).val();
          //       //     time = time.replace(" ", "");
          //       //     time = toggle24hr(time, 1);
          //       // }
          //       // $(this).attr("type", "time");
          //       // $(this).val(time);
          //       $(this).siblings("span").trigger("click");
          //       console.log($(this));
          //   })

          //   // $(this).blur(function(){
          //   //     var time = toggle24hr($(this).val(), 0)
          //   //     if ($(this).val() == "" || $(this).val() == null) time = "";
          //   //     $(this).attr("type", "text");
          //   //     $(this).val(time);
          //   // })
          // $(this).attr("readonly", "readonly");
          // $(this).timepicker({
          //     format: 'hh:MM TT',
          //     iconsLibrary: 'fontawesome',
          //     // disableDaysOfWeek: [0, 0],
          //     icons: {
          //      rightIcon: '<span class="fa fa-caret-down"></span>'
          //  }
          // });

          // $(this).change(function(){
          //   var val = $(this).val();
          //   $(this).val(toggle24hr(toggle24hr(val, 1), 0));
          // })
          $(this).timepicki();
        })

});

function toggle24hr(time, onoff){
    if(onoff==undefined) onoff = isNaN(time.replace(':',''))//auto-detect format
    var pm = time.toString().toLowerCase().indexOf('pm')>-1 //check if 'pm' exists in the time string
    time = time.toString().toLowerCase().replace(/[ap]m/,'').split(':') //convert time to an array of numbers
    time[0] = Number(time[0])
    if(onoff){//convert to 24 hour:
        if((pm && time[0]!=12)) time[0] += 12
        else if(!pm && time[0]==12) time[0] = '00'  //handle midnight
        if(String(time[0]).length==1) time[0] = '0'+time[0] //add leading zeros if needed
    }else{ //convert to 12 hour:
        pm = time[0]>=12
        if(!time[0]) time[0]=12 //handle midnight
        else if(pm && time[0]!=12) time[0] -= 12
        if(String(time[0]).length==1) time[0] = '0'+time[0] //add leading zeros if needed
    }
    return onoff ? time.join(':') : time.join(':')+(pm ? ' PM' : ' AM')
}
})(jQuery);	