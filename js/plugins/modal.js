(function($){
    
    var SW = Sweefty();
    var _SW_overlay,_modalWrapper,_SW_modal;
    
    var modal_options =  {
        speed : 250,
        easing : 'linear',
        position : '0 auto',
        animation: 'left bottom zoom',
        on : 'click'
    }
    
    $(document).ready(function(){
    //overlay div
    _SW_overlay = $('<div></div>').css({
        width : '100%',
        height: $(document).height(),
        position : 'fixed',
        backgroundColor : '#000000',
        overflow : 'hidden',
        opacity : '0.5',
        top : 0,
        left: 0,
        display : 'none',
        zIndex : '999996'
    }).appendTo('body');

    _modalWrapper = $('<div></div>').css({
        width : '100%',
        height: $(document).height(),
        position : 'absolute',
        display: 'none',
        overflow : 'hidden',
        top : 0,
        left: 0,
        zIndex : '999998'
    }).appendTo('body'),
        
    //modal container
    _SW_modal = $('<div></div>').css({
        position : 'relative',
        width : '100%',
        zIndex : '999997',
        top : 0,
        left : 0,
        visibility : 'hidden'
    }).appendTo(_modalWrapper);
    });
    
    
    var _modal = SW.trigger('modal',function(ele,obj){
        
        obj = $.extend({},modal_options, obj);
        var target = $(obj.modal);
        
        var clone = _SW_modal;
        
        obj.position = obj.position.replace( /(\d+)(\s|$)/g, "$1px"+"$2");
        var expand = obj.position.split(' ');
        var eLeft = expand[1];
        
        var css = {
            position: 'relative',
            overflow : 'hidden',
            display : 'block',
            zIndex : '999999',
            margin : obj.position
        };
        
        //fake screen resolution
        var cc = target.clone();
        cc.appendTo('body').css({
            maxWidth:window.screen.width,
            maxHeight:window.screen.height
        });
        
        var origWidth,origHeight;
        origWidth = cc.outerWidth();
        origHeight = cc.outerHeight();
        if (origHeight == 0){
            origHeight = '1%';
        }
        cc.remove();
        
        //parse animation options
        var from = {};
        var fromArr = obj.animation.split(' ');
        for (var x = 0; x < fromArr.length; x++){
            from[fromArr[x]] = true;
        }
        
        _modalWrapper.click(function(e){
            if (this == e.target || e.target == clone[0]){
                target.trigger('close');
            }
            return false;
        });
        
        if (obj.close){
            $(obj.close).click(function(){
                target.trigger('close');
                return false;
            });
        }
        
        ele.bind(obj.on,function(e){
            
            var currentX,currentY;
            if (obj.on !== 'click'){
                $(document).one('mouseup',function(e){
                    currentX = e.pageX;
                    currentY = e.pageY;
                });
            }
            
            if (obj.position == 'center'){
                var marTop = ($(window).height()/2 - origHeight/2);
                css.margin = marTop+"px auto";
            } else if (obj.position == 'bottom'){
                var marTop = ($(window).height() - origHeight);
                css.margin = marTop+"px auto";
                //css.margin = "0 0";
            }
            
            //clear previous clone content
            clone.children(':first').hide().appendTo('body');
            
            target.appendTo(clone);
            
            _modalWrapper.css({
                height : $(document).height(),
                width : '100%',
                display : 'block'
            });
            
            var left = 0,top = $(window).scrollTop();
            target.css(css);
            
            var secondEasing;
            
            if (from.top == true){
                top = -((origHeight+parseInt(target.css('marginTop')))-$(window).scrollTop());
            } else if (from.bottom == true){
                top = $(window).height()+$(window).scrollTop();
            }
            
            if (from.left == true){
                var marginleft = parseInt(target.css('marginLeft'));
                if (isNaN(marginleft)){
                    marginleft = (clone.width()/2 - target.width()/2);
                }
                left = - (target.width()+marginleft);
            } else if (from.right == true){
                var marginleft = parseInt(target.css('marginLeft'));
                if (isNaN(marginleft)){
                    marginleft = (clone.width()/2 - target.width()/2);
                }
                left = (clone.width()-marginleft);
            }
            
            if (from.zoom){
                top = e.pageY;
                left = e.pageX;
                if (!top && !left){
                    var p = ele.position();
                    //left = _SW_cache.currentMousePos.x;
                    //top = _SW_cache.currentMousePos.y;
                    
                    //left = currentX;
                    //top =  currentY;
                }
                var marginLeft = target.css('marginLeft');
                var value = parseFloat(marginLeft);
                var prefix = marginLeft.replace(value,'');
                
                if ((value == 0 && eLeft !== '0px') || eLeft == 'auto'){
                    value = clone.width()/2;
                } else if (value !== 0 && !isNaN(value)){
                    if (prefix == '%'){
                        value = ($(document).width()*value)/100;
                    }
                }
                left = left - value;
                
                //TOP
                var marginTop = target.css('marginTop');
                var value = parseFloat(marginTop);
                var prefix = marginTop.replace(value,'');
                
                if (value !== 0 && !isNaN(value)){
                    if (prefix == '%'){
                        value = ((clone.innerHeight()*value)/100);
                    }   
                    top = top - value;
                }
                
                //since it's a zoom effect enable size effect too
                from.width = true;
                from.height = true;
            }
            
            var closeFunction = function(){};
            if (from.width == true || from.height == true){
                
                var cssSize = {};
                
                if (from.height == true){
                    cssSize.height = 0;
                } if (from.width == true){
                    cssSize.width = 0;
                }
                
                target.css(cssSize);
                var setTimer = obj.speed;
                if (isNaN(top) && isNaN(left)){
                    setTimer = 0;
                }
                
                setTimeout(function(){
                    target.animate({
                        width: origWidth,
                        height: origHeight
                    },{
                        easing : obj.easing,
                        duration : obj.speed
                    });
                },setTimer);
                
                secondEasing = 'linear';
                
                closeFunction = function(){
                    target.stop().animate({
                        width : 0,
                        height : 0
                    },{
                        duration : obj.speed,
                        complete : function(){
                            $(this).css({
                                width:origWidth,
                                height:origHeight
                            });
                        }
                    });
                };   
            }
            
            target.on('close',function(){
                closeFunction();
                clone.stop().animate({top : top, left : left, opacity : 0},{
                    duration : obj.speed,
                    easing: 'linear',
                    complete : function(){
                        _SW_overlay.fadeOut(obj.speed,function(){
                            clone.css({
                                visibility : 'hidden',
                                top:0,
                                left:0
                            });
                            
                            _modalWrapper.hide();
                        });
                    }
                });
                target.off('close');
            });
            
            _SW_overlay.stop().fadeIn(obj.speed/2,function(){});
            
            clone.css({
                top : top,
                left: left,
                opacity: 0,
                visibility : 'visible'
                }).stop().animate({
                opacity : 1,
                top : $(window).scrollTop(),
                left: 0
                },{
                easing : secondEasing ? secondEasing : obj.easing,
                duration : obj.speed,
                complete: function(){
                    setTimeout(function(){
                        clone.css({
                            //top : 0,
                            //position : 'fixed'
                        });
                    },obj.speed);
                }
            });
            return false;
        });
        
        
    });
    
    $.fn.modal = function(action,customOptions) {  
	
        if (!customOptions && typeof action == 'object'){
            customOptions = action;
            action = undefined;
        }
        
        var options = $.extend({},modal_options, customOptions);
        options.on = action || 'click';
        options.modal = options.target;
        
        if (action == 'view'){
            options.modal = this;
            
        } else if (action == 'close'){
            this.trigger('close');
            return false;
        }
        
        return this.each(function() {
            var $this = $(this);
            if ($this[0] == $(document)[0]){
                modal_options = options;
            } else {
                _modal($this,options);
                $this.trigger('view');
            }
        });
    };
    
}(jQuery));