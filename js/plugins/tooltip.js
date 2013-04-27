(function($){
    
    var SW = Sweefty();
    var _SW_tooltip,_SW_tooltipClass;
    
    $(document).ready(function(){
        //tooltip div
        _SW_tooltip = $('<div class="tooltip"></div>').css({
            width : 'auto',
            'max-width' : '90%',
            position : 'absolute',
            display : 'none',
            top : '0',
            left : '0',
            margin: '0',
            zIndex : '9999'
        }).appendTo('body');
    });
    
    var tooltip_options = {
        position : 'top',
        speed : 250,
        easing : 'linear',
        on: 'mouseenter',
        off : 'mouseleave'
    }
    
    var _tooltip = SW.trigger('tooltip',function(ele,obj){
        
        obj = $.extend({},tooltip_options, obj);
        var text = obj.tooltip;
        var fix = obj.fix || '0 0';
        
        if(text){
            var fixcoords = fix.split(' '),
            fixX = parseInt(fixcoords[0]),
            fixY = parseInt(fixcoords[1]);
            
            var _class = obj.addClass;
            var position = obj.position || 'top';
            var op = parseFloat(_SW_tooltip.css('opacity')),
            effect = obj.effect,
            speed = parseInt(obj.speed);
            var startX = function(x){
                return x;
            }, startY = function(y){
                return y;
            };
            
            if (obj.animation){
                var xy = obj.animation.split('+');
                if (xy.length == 2){
                    xy.push('+');
                } else {
                    xy = [];
                    xy = obj.animation.split('-');
                    xy.push('-');
                }
                
                var val = parseInt(xy[1]);
                
                if (xy[0] == 'left'){
                    startX = function(x){
                        //var val = parseInt(xy[1]);
                        var newx = (xy[2] == '-') ? x-val : x+val;
                        return newx;
                    }
                } else {
                    
                    startY = function(y){
                        var newy = (xy[2] == '-') ? y-val : y+val;
                        return newy;
                    }
                }
            }
            
            var start1,start2;
            ele.on(obj.on,function(){
                
                if (_SW_tooltipClass){
                    _SW_tooltip.removeClass(_SW_tooltipClass);
                }
                
                _SW_tooltipClass = _class;
                
                _SW_tooltip.html('<p>'+text+'</p>');
                
                var top = ele.offset().top + fixY;
                var left = ele.offset().left;
                var width = ele.outerWidth();
                var height = _SW_tooltip.outerHeight();
                
                
                if (position == 'bottom'){
                    top = top + ele.outerHeight() + 2;
                    left = left + (width/2);
                    left = left - (_SW_tooltip.outerWidth()/2);
                } else if (position == 'left'){
                    left = left - _SW_tooltip.outerWidth() - 2;
                } else if (position == 'right'){
                    left = left + width + 2;
                } else {
                    left = left + (width/2);
                    left = left - (_SW_tooltip.outerWidth()/2);
                    top = top - height - 2;
                } 
                
                start1 = parseFloat(startY(top));
                start2 = parseFloat(startX(left));
                
                _SW_tooltip.addClass(_class).stop().css({
                    top : start1,
                    left : start2,
                    opacity: 0,
                    display : ''
                }).animate({opacity: 1,top:top,left:left},speed,obj.easing);
            }).on(obj.off,function(){
                //_SW_tooltip.stop(true,false).fadeOut(speed);
                _SW_tooltip.stop().animate({opacity: 0,top:start1,left:start2},speed,obj.easing,function(){$(this).hide()});
            });
        }
        
    });
    
    //jQuery custom functions
    $.fn.tooltip = function(text,customOptions) {  
	
        var options = $.extend({},tooltip_options, customOptions);
        options.tooltip = text;
        
        return this.each(function() {
            var $this = $(this);
            if ($this[0] == $(document)[0]){
                tooltip_options = $.extend({},tooltip_options,text);
            } else {
                _tooltip($this,options);
            }
        });
    };
    
    
    
}(jQuery));