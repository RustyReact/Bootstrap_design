/*
 * Requires jquery ui
 */
 
 
(function($){
    $.fn.weekpicker = function(options){
		var $this = this;
		var $calroot = $this;

		var rangeArray = $.extend( [], $.fn.defaults);
		$.fn.defaults = new Array();
		var default_value = [null, null];
		$.fn.defaults.push(default_value);

		var isSelected = $.extend(true);

		var reqOpt = {
			onSelect:onSelect,
			showOtherMonths: true,
	        selectOtherMonths: false,
	        autoclose: false
		};

		$this.datepicker(reqOpt);
		$this.datepicker("setDate", options.setDate);

		if (options.isSelected != null && options.isSelected == false){
			isSelected = false;
		}

		$(this).datepicker( "option", "dayNamesMin", [ "S", "M", "T", "W", "T", "F", "S" ] );
		//events	
		$dprow = $this.find('.ui-datepicker');
		
		$dprow.on('mousemove','tr td a', function() { 

			if (isSelected == false) return false;

			var d = parseInt($(this).text());

			var parent = $(this).parents(".ui-datepicker");

			var m = parent.find(".ui-datepicker-month");
			var _y = parent.find(".ui-datepicker-year").html();
			_y = parseInt(_y);
			var _m = $.trim(m.html());
			switch (_m){
				case "January": _m = 1;break;
				case "February": _m = 2;break;
				case "March": _m = 3;break;
				case "April": _m = 4;break;
				case "May": _m = 5;break;
				case "June": _m = 6;break;
				case "July": _m = 7;break;
				case "August": _m = 8;break;
				case "September": _m = 9;break;
				case "October": _m = 10;break;
				case "November": _m = 11;break;
				case "December": _m = 12;break;
				default: break;
			}

			var weekArray = [];
			var result = [];
			var return_value = {};

	        var date = new Date(_y, _m-1, d);
	        var selectedMonth = date.getMonth();
	        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	        var originS = startDate;
	        var originE = endDate;

	        weekArray = weekArray.concat(getWeekRange(date, startDate, endDate));

	  		var start_week = $("#starts_on").val();
    		var end_week = $("#ends_on").val();
    		if (end_week == null || end_week == "" || end_week === undefined) end_week = 6;
    		if (start_week == null || start_week == "" || start_week === undefined) start_week = 0;
    		var start_time = $("#starts_time").val();
    		var end_time = $("#ends_time").val();
		    var s1 = $.trim(toggle24hr1($.trim(start_time), 1));
		    var e1 = $.trim(toggle24hr1($.trim(end_time), 1));
		    var st = new Date('1970-01-01T' + s1);
		    var et = new Date('1970-01-01T' + e1);
		    s = st.getHours();
		    e = et.getHours();
		    start_week = parseInt(start_week);
		    end_week = parseInt(end_week);
		    if (start_week > end_week) end_week += 7;
		    if ((et < st) && (start_time != "") && (end_time) != ""){
		        end_week ++;
		    }

		    if (end_week <= 6){
		    	for (var i = 0; i < weekArray.length; i ++){

		    		sw = start_week;
		    		ew = end_week;

		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:sw, day_end:ew};
		    		result.push(item);
		    	}
		    }else{
		    	for (var i = 0; i < weekArray.length; i ++){
		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:start_week, day_end:6};
		    		result.push(item);
		    	}

		    	date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
		    	startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	        	endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	        	weekArray = getWeekRange(date, startDate, endDate);
	        	for (var i = 0; i < weekArray.length; i ++){
		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:0, day_end:end_week - 7};
		    		result.push(item);
		    	}
		    }

		    if (options.onHoverWeek !== undefined){

		    	var r = {weekstart:originS, weekend:originE, data:result, month:selectedMonth};
		    	options.onHoverWeek(r);
		    }
		});
		$dprow.on('mouseleave','tr td a', function() { 

			if (isSelected == false) return false;

			var d = parseInt($(this).text());

			var parent = $(this).parents(".ui-datepicker");

			var m = parent.find(".ui-datepicker-month");
			var _y = parent.find(".ui-datepicker-year").html();
			_y = parseInt(_y);
			var _m = $.trim(m.html());
			switch (_m){
				case "January": _m = 1;break;
				case "February": _m = 2;break;
				case "March": _m = 3;break;
				case "April": _m = 4;break;
				case "May": _m = 5;break;
				case "June": _m = 6;break;
				case "July": _m = 7;break;
				case "August": _m = 8;break;
				case "September": _m = 9;break;
				case "October": _m = 10;break;
				case "November": _m = 11;break;
				case "December": _m = 12;break;
				default: break;
			}

			var weekArray = [];
			var result = [];
			var return_value = {};

	        var date = new Date(_y, _m-1, d);
	        var selectedMonth = date.getMonth();
	        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	        var originS = startDate;
	        var originE = endDate;

	        weekArray = weekArray.concat(getWeekRange(date, startDate, endDate));

	  		var start_week = $("#starts_on").val();
    		var end_week = $("#ends_on").val();
    		if (end_week == null || end_week == "" || end_week === undefined) end_week = 6;
    		if (start_week == null || start_week == "" || start_week === undefined) start_week = 0;
    		var start_time = $("#starts_time").val();
    		var end_time = $("#ends_time").val();
		    var s1 = $.trim(toggle24hr1($.trim(start_time), 1));
		    var e1 = $.trim(toggle24hr1($.trim(end_time), 1));
		    var st = new Date('1970-01-01T' + s1);
		    var et = new Date('1970-01-01T' + e1);
		    s = st.getHours();
		    e = et.getHours();
		    start_week = parseInt(start_week);
		    end_week = parseInt(end_week);
		    if (start_week > end_week) end_week += 7;
		    if ((et < st) && (start_time != "") && (end_time) != ""){
		        end_week ++;
		    }

		    if (end_week <= 6){
		    	for (var i = 0; i < weekArray.length; i ++){

		    		sw = start_week;
		    		ew = end_week;

		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:sw, day_end:ew};
		    		result.push(item);
		    	}
		    }else{
		    	for (var i = 0; i < weekArray.length; i ++){
		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:start_week, day_end:6};
		    		result.push(item);
		    	}

		    	date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
		    	startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	        	endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	        	weekArray = getWeekRange(date, startDate, endDate);
	        	for (var i = 0; i < weekArray.length; i ++){
		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:0, day_end:end_week - 7};
		    		result.push(item);
		    	}
		    }

		    if (options.onUnhoverWeek !== undefined){

		    	var r = {weekstart:originS, weekend:originE, data:result, month:selectedMonth};
		    	options.onUnhoverWeek(r);
		    }
		});

		var c = $(this);
		$(this).find(".ui-datepicker-month1").click(function(){

		});

		if (isSelected == false) rebuildItems();

		var c = $(this);
	    $(document).click(function(e){

	    	if (isSelected == false) return false;

            if (c.find(".ui-datepicker-month").is(e.target)){
                if (isSelected == false) return false;

                var m = c.find(".ui-datepicker-month");
				var _y = c.find(".ui-datepicker-year").html();
				_y = parseInt(_y);
				var _m = $.trim(m.html());
				switch (_m){
					case "January": _m = 1;break;
					case "February": _m = 2;break;
					case "March": _m = 3;break;
					case "April": _m = 4;break;
					case "May": _m = 5;break;
					case "June": _m = 6;break;
					case "July": _m = 7;break;
					case "August": _m = 8;break;
					case "September": _m = 9;break;
					case "October": _m = 10;break;
					case "November": _m = 11;break;
					case "December": _m = 12;break;
					default: break;
				}

		        var date1 = new Date(_y, _m - 1, 1);
		        var lastDayOfMonth1 = new Date(date1.getFullYear(), date1.getMonth()+1, 0);
		        var jj = 0;
		        var result_array = [];
		        for (var j = 1; j <= lastDayOfMonth1.getDate(); j = j + 7){
		        	var date = new Date(_y, _m - 1, j);

			        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
			        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

			        if (j == 1){
			        	j = endDate.getDate() + 1 - 7;
			        }

			        var weekArray = [];
					var result = [];
					var return_value = {};

			        var originS = startDate;
			        var originE = endDate;
			        var selectedMonth = _m - 1;

			        weekArray = weekArray.concat(getWeekRange(date, startDate, endDate, 1));

			  		var start_week = $("#starts_on").val();
		    		var end_week = $("#ends_on").val();
		    		if (end_week == null || end_week == "" || end_week === undefined) end_week = 6;
		    		if (start_week == null || start_week == "" || start_week === undefined) start_week = 0;
		    		var start_time = $("#starts_time").val();
		    		var end_time = $("#ends_time").val();
				    var s1 = $.trim(toggle24hr1($.trim(start_time), 1));
				    var e1 = $.trim(toggle24hr1($.trim(end_time), 1));
				    var st = new Date('1970-01-01T' + s1);
				    var et = new Date('1970-01-01T' + e1);
				    s = st.getHours();
				    e = et.getHours();
				    start_week = parseInt(start_week);
				    end_week = parseInt(end_week);
				    if (start_week > end_week) end_week += 7;
				    if ((et < st) && (start_time != "") && (end_time) != ""){
				        end_week ++;
				    }

				    if (end_week <= 6){
				    	for (var i = 0; i < weekArray.length; i ++){

				    		sw = start_week;
				    		ew = end_week;

				    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:sw, day_end:ew};
				    		result.push(item);
				    	}
				    }else{
				    	for (var i = 0; i < weekArray.length; i ++){
				    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:start_week, day_end:6};
				    		result.push(item);
				    	}

				    	date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
				    	startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
			        	endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

			        	weekArray = getWeekRange(date, startDate, endDate, 1);
			        	for (var i = 0; i < weekArray.length; i ++){
				    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:0, day_end:end_week - 7};
				    		result.push(item);
				    	}
				    }

				    var r = {weekstart:originS, weekend:originE, data:result, month:selectedMonth};
				    result_array.push(r);
			    }

			    if (options.onSelectMonth !== undefined){

			    	options.onSelectMonth({month: _m - 1, data:result_array});
			    }
            }
        })

		function onSelect(dateText, inst) { 
			if (isSelected == false) return false;

			var weekArray = [];
			var result = [];
			var return_value = {};

			inst.inline = false;

	        var date = $(this).datepicker('getDate');
	        var selectedMonth = date.getMonth();
	        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	        var originS = startDate;
	        var originE = endDate;

	        weekArray = weekArray.concat(getWeekRange(date, startDate, endDate));

	  		var start_week = $("#starts_on").val();
    		var end_week = $("#ends_on").val();
    		if (end_week == null || end_week == "" || end_week === undefined) end_week = 6;
    		if (start_week == null || start_week == "" || start_week === undefined) start_week = 0;
    		var start_time = $("#starts_time").val();
    		var end_time = $("#ends_time").val();
		    var s1 = $.trim(toggle24hr1($.trim(start_time), 1));
		    var e1 = $.trim(toggle24hr1($.trim(end_time), 1));
		    var st = new Date('1970-01-01T' + s1);
		    var et = new Date('1970-01-01T' + e1);
		    s = st.getHours();
		    e = et.getHours();
		    start_week = parseInt(start_week);
		    end_week = parseInt(end_week);
		    if (start_week > end_week) end_week += 7;
		    if ((et < st) && (start_time != "") && (end_time) != ""){
		        end_week ++;
		    }

		    if (end_week <= 6){
		    	for (var i = 0; i < weekArray.length; i ++){

		    		sw = start_week;
		    		ew = end_week;

		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:sw, day_end:ew};
		    		result.push(item);
		    	}
		    }else{
		    	for (var i = 0; i < weekArray.length; i ++){
		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:start_week, day_end:6};
		    		result.push(item);
		    	}

		    	date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
		    	startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	        	endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	        	weekArray = getWeekRange(date, startDate, endDate);
	        	for (var i = 0; i < weekArray.length; i ++){
		    		var item = {start:weekArray[i]['start'],end:weekArray[i]['end'], month:weekArray[i]['month'], day_start:0, day_end:end_week - 7};
		    		result.push(item);
		    	}
		    }

		    if (options.onSelectWeek !== undefined){

		    	var r = {weekstart:originS, weekend:originE, data:result, month:selectedMonth};
		    	options.onSelectWeek(r);
		    }
	  		
	        return true;
	    }

	    function getWeekRange(date, startDate, endDate, f=0){
	    	var curMonth = date.getMonth();
	        var startMonth = startDate.getMonth();
	        var endMonth = endDate.getMonth();

	        var result = [];

	        if (startMonth < curMonth || date.getFullYear() > startDate.getFullYear()){
	        	
	        	var lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
	        	var beforeEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), lastDayOfMonth.getDate());

	        	var weekNumber = startDate.getDate() / 7;
	        	var firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
	        	if (weekNumber >= 4 && firstDate.getDay() == 0) weekNumber = weekNumber - 1;
	        	if (weekNumber <= 4){
		        	result.push({month:startDate.getMonth() + 1, start:startDate, end:beforeEndDate});

		        	startDate = new Date(date.getFullYear(), date.getMonth(), 1);
		        	result.push({month:startDate.getMonth() + 1, start:startDate, end:endDate});
		        }else{
		        	result.push({month:endDate.getMonth() + 1, start:startDate, end: endDate});
		        }
	        }else if (endMonth > curMonth || endDate.getFullYear() > date.getFullYear()){
				var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
				var endMonthDate = new Date(date.getFullYear(), date.getMonth(), lastDayOfMonth.getDate());

				result.push({month:startDate.getMonth() + 1, start:startDate, end:endMonthDate});

				startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
				result.push({month:startDate.getMonth() + 1, start:startDate, end:endDate});				
	        }else{
	        	result.push({month:startDate.getMonth() + 1, start:startDate, end: endDate});
	        }

	        return result;
	    }

	    function removeSelectedDate(selectId){
	    	window.setTimeout(function () {

				$('#' + selectId + ' tbody tr').find('td').each(function(){//.addClass('ui-state-active');//.parent().addClass('ui-state-active');
	        		var tt = $(this).find("a");
					tt.removeClass("first-week-td-select");
					tt.removeClass("last-week-td-select");
					tt.removeClass("ui-tr-week-selected");
	        	});
		    }, 1);
	    }

	    function selectCurrentWeek(startDate, endDate, selectId) {
	    }

	    function toggle24hr1(time, onoff){
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

	    function rebuildItems(){

	    	$dprow.find('tbody tr').find('td:not(.ui-datepicker-other-month)').each(function(){//.addClass('ui-state-active');//.parent().addClass('ui-state-active');
        		
	    		$(this).removeClass();
	    		$(this).addClass("ui-datepicker-unselectable");
        		var tt = $(this).find("a");
        		var text = tt.html();

        		tt.replaceWith("<span class='ui-state-default'>"+text+"</span>");
        	});
	    }

	    return this;
	};
})(jQuery);