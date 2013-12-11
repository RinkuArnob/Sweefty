(function($){
    var _SW = Sweefty();
    function setHeights () {
        //get screen height
        var _screenHeight = $(window).height();
        
        $('.intro').css({
            height : _screenHeight + 'px'
        });
    }
    
    $(document).ready(function() {
        var currentSize = 32;
        var bigFonts = {
            screen : 32,
            tablet : 22,
            mobile : 14
        };
        
        _SW.on.resize(function(type){
            currentSize = bigFonts[type];
            $('.intro .text h1').animate({
                'font-size' : currentSize
            },500);
            setHeights(type);
        });
        
        var _headerTop = 0;
        
        _SW.on.screen(function(type){
            
        }, function(){
            
        });
        
        _SW.on.mobile(function(type){
            
        },function(type){
            
        });
        
        //=====================================================================
        // .enter click effects
        //=====================================================================
        $('.enter').click(function(){
            var $this = $(this);
            var thisTop = $this.offset().top;
            
            $('.enter p').stop().animate({
                opacity : 0
            },500);
            
            $('.intro .text h1').stop().animate({
                'font-size' : 0,
                opacity : 0
            },{
                duration : 800,
                complete : function(){
                    $this.css({'position' : 'relative'}).stop().animate({
                        'width' : '150%',
                        'height' : '150%',
                        opacity : 0,
                        'top' : -thisTop-100
                    },{
                        easing : '',
                        duration : 800,
                        complete : function(){
                            $('.intro .text h1').html('Take a <span>Closer</span> Look').animate({
                                'font-size' : currentSize,
                                opacity : 1
                            },500);
                            $this.animate({
                                'width' : '150px',
                                'height' : '40px',
                                opacity : 1,
                                'top' : 0
                            },{
                                complete : function(){
                                    $('.enter p').animate({
                                        opacity : 1
                                    },500);
                                }
                            });
                            
                        }
                    });
                }
            });
        });
    });
    
}(jQuery));
