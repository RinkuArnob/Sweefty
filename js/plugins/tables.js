(function($){
    
    var SW = Sweefty();
    
    
    
    $(document).ready(function(){
        
    });
    
    var table_options = {
        position : 'top',
        speed : 250,
        easing : 'linear',
        on: 'mouseenter',
        off : 'mouseleave'
    }
    
    var _table = SW.trigger('table',function(ele,obj){
        
        obj = $.extend({},table_options, obj);
        
        // counts total number of td in a head so that we can can use it for label extraction
	var head_col_count =  $('thead td').size();
	// loop which replaces td
	for ( i=0; i <= head_col_count; i++ )  {
		// head column label extraction
		var head_col_label = $('thead td:nth-child('+ i +')').text();
		// replaces td with <div class="column" data-label="label">
		$('tr td:nth-child('+ i +')').replaceWith(
			function(){
				return $('<div class="column" data-label="'+ head_col_label +'">').append($(this).contents());
			}
		);
	}	
	// replaces table with <div class="table">
	$('table').replaceWith(
		function(){
			return $('<div class="table">').append($(this).contents());
		}
	);	
	// replaces thead with <div class="table-head">
	$('thead').replaceWith(
		function(){
			return $('<div class="table-head">').append($(this).contents());
		}
	);	
	// replaces tr with <div class="row">
	$('tr').replaceWith(
		function(){
			return $('<div class="row">').append($(this).contents());
		}
	);	
	// replaces th with <div class="column">
	$('th').replaceWith(
		function(){
			return $('<div class="column">').append($(this).contents());
		}
	);
        
    });
    
    
    //jQuery custom functions
    //$.fn.tooltip = function(text,customOptions) {  
    //
    //    var options = $.extend({},tooltip_options, customOptions);
    //    options.tooltip = text;
    //    
    //    return this.each(function() {
    //        var $this = $(this);
    //        if ($this[0] == $(document)[0]){
    //            tooltip_options = $.extend({},tooltip_options,text);
    //        } else {
    //            _tooltip($this,options);
    //        }
    //    });
    //};
    
    
    
}(jQuery));