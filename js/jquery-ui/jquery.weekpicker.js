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
		
		$dprow.on('mousemove','tr', function() { 

			if (isSelected == false) return false;

			if ($(window).width() < 500) return;

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
		    if (end_week == 0 && (start_week > end_week)) end_week = 7;
		    if ((et < st) && (start_time != "") && (end_time) != ""){
		        end_week ++;
		        // if (end_week > 6) end_week = 6;
		    }

    		// if (end_week < start_week) return;	

    		var i = 0;
			$(this).find("td").each(function(){
				if (i >= start_week && i <= end_week){
					if ($(this).find("a").hasClass("ui-priority-secondary") == false && 
						$(this).hasClass("ui-state-disabled") == false) {
							$(this).addClass("ui-td-hover");
							$(this).find("a").addClass("ui-tr-hover");
					}
				}
				i ++;
			})

			var weekCount = $(this).find(".ui-td-hover").length - 1;
			i = 0
			$(this).find(".ui-td-hover").each(function(){
				if (i == 0){
					$(this).find("a").addClass("first-week-td");
				}

				if (i == weekCount){
					$(this).find("a").addClass("last-week-td");
				}
				i ++;
			})

			if (end_week > 6){
				i = 0;
				$(this).next().find("td").each(function(){
					if (i >= 0 && i <= end_week - 7){
						if ($(this).find("a").hasClass("ui-priority-secondary") == false && 
							$(this).hasClass("ui-state-disabled") == false) {
								$(this).addClass("ui-td-hover");
								$(this).find("a").addClass("ui-tr-hover");
						}
					}
					i ++;
				})

				weekCount = $(this).next().find(".ui-td-hover").length - 1;
				i = 0
				$(this).next().find(".ui-td-hover").each(function(){
					if (i == 0){
						$(this).find("a").addClass("first-week-td");
					}

					if (i == weekCount){
						$(this).find("a").addClass("last-week-td");
					}
					i ++;
				})
			}

		});
		$dprow.on('mouseleave','tr', function() { 
			if (isSelected == false) return;
			if ($(window).width() < 500) return;
			$(this).find('td').removeClass("ui-td-hover");
			$(this).find('td a').removeClass('ui-tr-hover'); 
			$(this).find("td a").removeClass("first-week-td");
			$(this).find("td a").removeClass("last-week-td");
			$(this).next().find('td').removeClass("ui-td-hover");
			$(this).next().find('td a').removeClass('ui-tr-hover'); 
			$(this).next().find("td a").removeClass("first-week-td");
			$(this).next().find("td a").removeClass("last-week-td");
		});

		// $.fn.greenify = function() {
 
	 //         return this.each(function () {
	 //             console.log(rangeArray);
	 //        });
	 //    };
	 	var c = $(this);
	    $(document).click(function(e){
            if (c.find(".ui-datepicker-month").is(e.target)){
                if (isSelected == false) return false;

                c.find(".ui-datepicker-month").toggleClass("selected-month")

                rangeArray = [[null, null]];
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
		        for (var j = 1; j <= lastDayOfMonth1.getDate(); j = j + 7){
		        	var date = new Date(_y, _m - 1, j);

		        	// if (j > 1){
		        	// 	date = new Date(_y, _m - 1, jj);
		        	// 	jj += 7;
		        	// }

			        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
			        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

			        if (j == 1){
			        	j = endDate.getDate() + 1 - 7;
			        }

			        var curMonth = date.getMonth();
			        var startMonth = startDate.getMonth();
			        var endMonth = endDate.getMonth();

			        if (startMonth < curMonth || date.getFullYear() > startDate.getFullYear()){
			        	startDate = new Date(date.getFullYear(), date.getMonth(), 1);
			        }

			        if (endMonth > curMonth || endDate.getFullYear() > date.getFullYear()){
						var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
						endDate = new Date(date.getFullYear(), date.getMonth(), lastDayOfMonth.getDate());
			        }

			        var existRange = false;
			        for (i = 0; i < rangeArray.length; i ++){
			        	var item = rangeArray[i];
			        	if (item[0] != null && item[0].getDate() == startDate.getDate()){
			        		rangeArray.splice(i, 1);
			        		existRange = true;
			        		break;
			        	}
			        }

			        if (existRange == false){
		        		var newArray = [startDate, endDate];
		        		rangeArray.push(newArray);
		        	}
		        }

		        var selectId = m.parents(".calendar-month").attr("id");
		        if (m.hasClass("ui-datepicker-month-highlight") == true) {
		        	rangeArray = [[null, null]];
		        	// removeSelectedDate(selectId);
		        	// m.removeClass("ui-datepicker-month-highlight");
		        }else{
		        	// m.addClass("ui-datepicker-month-highlight");
		        }
				removeSelectedDate(selectId);
		        selectCurrentWeek(startDate, endDate, selectId);
            }
        })

        $("#ends_on1").change(function(e){
        	for (var i = 1; i <=12; i ++){
        		var id = (".week-picker" + i);
        		id  +=  " .ui-datepicker-calendar";
        		rangeArray = [[null, null]];
				$('' + id + ' tbody tr').find('td').each(function(){//.addClass('ui-state-active');//.parent().addClass('ui-state-active');
	        		var tt = $(this).find("a");
					tt.removeClass("first-week-td-select");
					tt.removeClass("last-week-td-select");
					tt.removeClass("ui-tr-week-selected");
	        	});

	        	$(".week-picker" + i + ' .ui-datepicker-month').removeClass('ui-datepicker-month-highlight');
        	}
        })

        $("#starts_on1").change(function(e){
        	for (var i = 1; i <=12; i ++){
        		var id = (".week-picker" + i);
        		id  +=  " .ui-datepicker-calendar";
        		rangeArray = [[null, null]];
				$('' + id + ' tbody tr').find('td').each(function(){//.addClass('ui-state-active');//.parent().addClass('ui-state-active');
	        		var tt = $(this).find("a");
					tt.removeClass("first-week-td-select");
					tt.removeClass("last-week-td-select");
					tt.removeClass("ui-tr-week-selected");
	        	});
	        	$(".week-picker" + i + ' .ui-datepicker-month').removeClass('ui-datepicker-month-highlight');
        	}
        })

		var c = $(this);
		$(this).find(".ui-datepicker-month1").click(function(){
			// console.log("dfasdf");
			if (isSelected == false) return false;
			$(this).toggleClass("ui-datepicker-month-highlight");
			var _y = c.find(".ui-datepicker-year").html();
			_y = parseInt(_y);
			var _m = $.trim($(this).html());
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
	        for (var j = 1; j <= lastDayOfMonth1.getDate(); j =j + 7){
	        	var date = new Date(_y, _m - 1, j);
		        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
		        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

		        var curMonth = date.getMonth();
		        var startMonth = startDate.getMonth();
		        var endMonth = endDate.getMonth();

		        if (startMonth < curMonth || date.getFullYear() > startDate.getFullYear()){
		        	startDate = new Date(date.getFullYear(), date.getMonth(), 1);
		        }

		        if (endMonth > curMonth || endDate.getFullYear() > date.getFullYear()){
					var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
					endDate = new Date(date.getFullYear(), date.getMonth(), lastDayOfMonth.getDate());
		        }

		        var existRange = false;
		        for (i = 0; i < rangeArray.length; i ++){
		        	var item = rangeArray[i];
		        	if (item[0] != null && item[0].getDate() == startDate.getDate()){
		        		rangeArray.splice(i, 1);
		        		existRange = true;
		        		break;
		        	}
		        }

		        if (existRange == false){
	        		var newArray = [startDate, endDate];
	        		rangeArray.push(newArray);
	        	}
	        }

			var selectId = $(this).parents(".calendar-month").attr("id");
	        selectCurrentWeek(startDate, endDate, selectId);
		});

		if (isSelected == false) rebuildItems();

		function onSelect(dateText, inst) { 
			if (isSelected == false) return false;

			inst.inline = false;

	        var date = $(this).datepicker('getDate');
	        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	        var curMonth = date.getMonth();
	        var startMonth = startDate.getMonth();
	        var endMonth = endDate.getMonth();

	        if (startMonth < curMonth || date.getFullYear() > startDate.getFullYear()){
	        	startDate = new Date(date.getFullYear(), date.getMonth(), 1);
	        }

	        if (endMonth > curMonth || endDate.getFullYear() > date.getFullYear()){
				var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
				endDate = new Date(date.getFullYear(), date.getMonth(), lastDayOfMonth.getDate());
	        }

	        var existRange = false;
	        for (i = 0; i < rangeArray.length; i ++){
	        	var item = rangeArray[i];
	        	if (item[0] != null && item[0].getDate() == startDate.getDate()){
	        		rangeArray.splice(i, 1);
	        		existRange = true;
	        		break;
	        	}
	        }

	        if (existRange == false){
        		var newArray = [startDate, endDate];
        		rangeArray.push(newArray);
        	}

	        var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
			// $calroot.trigger('weekselected',{
			// 	start:startDate,
			// 	end:endDate,
			// 	weekOf:startDate
			// });

			var selectId = $(this).uniqueId().context.id;
			// removeSelectedDate(selectId);
	        selectCurrentWeek(startDate, endDate, selectId);
	        return true;
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
			window.setTimeout(function () {

				var rangeDays = 0;
		    	for (var k = 0; k < rangeArray.length; k ++){

		    		var item = rangeArray[k];

		    		if (item[0] == null) continue;

			        var sd = item[0].getDate();
			        var ed = item[1].getDate();
			        var first_week_day = item[0].getDay();

			        rangeDays += (ed - sd + 1);
			    }

				$('#' + selectId + ' tbody tr').find('td').each(function(){//.addClass('ui-state-active');//.parent().addClass('ui-state-active');
	        		
	        		var text = $.trim($(this).text());
	        		var exist = false;
	        		var tt = $(this).find("a");
	        		var first_e = false;
	        		var last_e = false;

					for (var k = 0; k < rangeArray.length; k ++){

			    		var item = rangeArray[k];

			    		if (item[0] == null) continue;

				        var sd = item[0].getDate();
				        var ed = item[1].getDate();
				        var first_week_day = item[0].getDay();

				        var lastDayOfMonth = new Date(item[0].getFullYear(), item[0].getMonth()+1, 0);

		        		var q = first_week_day;
		        		
		        		var start_week = $("#starts_on").val();
		        		var end_week = $("#ends_on").val();
		        		if (end_week == null || end_week == "" || end_week === undefined) end_week = -1;
		        		if (start_week == null || start_week == "" || start_week === undefined) start_week = -1;

		        		var start_time = $("#starts_time").val();
		        		var end_time = $("#ends_time").val();
					    var s1 = $.trim(toggle24hr1($.trim(start_time), 1));
					    var e1 = $.trim(toggle24hr1($.trim(end_time), 1));
					    var st = new Date('1970-01-01T' + s1);
					    var et = new Date('1970-01-01T' + e1);
					    s = st.getHours();
					    e = et.getHours();

					    if (start_week != -1 && end_week != -1){

					    	if (end_week < start_week && (end_week > 0)) {
					    		// alert("Special week ends must be greater than starts");	
					    		return;
					    	}

					    	if (end_week == 0 && end_week < start_week) {
					    		end_week = 7;
					    		ed ++;
					    	}

						    if ((et < st) && (start_time != "") && (end_time) != ""){
						 		ed ++;
						        end_week ++;
						        // if (end_week > 6) end_week = 6;
						    }
						}

						for (var i = sd; i <= ed; i ++){
							if (start_week == -1 ||  end_week == -1){
				        		if (tt.hasClass("ui-priority-secondary") == false){
					        		if (text == i){
					        			exist = true;
					        			if (i == sd){
					        				first_e = true;
					        			}
					        			if (i == ed){
					        				last_e = true;
					        			}
					        			break;
					        		}
					        	}
					        }else{
					        	if (q >= start_week && q <= end_week){
					        		if (tt.hasClass("ui-priority-secondary") == false){
						        		if (text == i){
						        			exist = true;
											if (q == start_week || (i == sd) || q == 7){
						        				first_e = true;
						        			}
						        			if (q == end_week || (i == ed) || q == 6){
						        				last_e = true;
						        			}
						        			break;
						        		}
						        	}
					        	}
					        }
					        q ++;
			        	}

			        	if (exist) break;
			        }

			        if (exist){
			        	if (tt.hasClass("ui-tr-week-selected") == false) tt.addClass("ui-tr-week-selected");
			        	if (first_e){
			        		if (tt.hasClass("first-week-td-select") == false) tt.addClass("first-week-td-select");
			        	}
			        	if (last_e){
			        		if (tt.hasClass("last-week-td-select") == false) tt.addClass("last-week-td-select");
			        	}
			        }else{
			        	tt.removeClass("ui-tr-week-selected");
			        }
	        	});

			    var lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth()+1, 0);
			    $('#' + selectId + ' .ui-datepicker-month').removeClass('ui-datepicker-month-highlight');
			    if (rangeArray.length >= 6){//lastDayOfMonth.getDate() == rangeDays){
			    	$('#' + selectId + ' .ui-datepicker-month').addClass('ui-datepicker-month-highlight');
			    }

			}, 1);

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