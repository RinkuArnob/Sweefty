(function($){
$(document).ready(function() {
    
    /*====================================================================
        
        we append a couple of divs
        and then test some value, the value must be decimal other wise the
        browser rounds things, so then we run this to equlize divs widths
        
    =====================================================================*/
    var equalizeDivs = false;
    var div = $('<div id="_hidden_ele" style="width:50px;height:0;padding:0;margin:0;"></div>');
    $('body').append(div);
    var div2 = $('<div></div>').css({width:'1',marginLeft:'50.1%'});
    div.append(div2);
    var num = parseFloat(div2.css('margin-left'));
    if (num == 25){
	equalizeDivs = true;
    }
    
    
    //$('.row .column:first-child').css({marginLeft: '2%'});
    
    //div.remove();
    
    //testing if broswer rounds percent values
    //if (equalizeDivs == true){
    //    
    //    $('.row').each(function(i){
    //        var $this = $(this);
    //        //append div
    //        var $div = $('<div class="column grid_1" style="height:0;"></div>');
    //        $this.append($div);
    //        var width  = parseInt($div.width());
    //        $div.remove();
    //        
    //        //width = parseFloat(parseInt($this.width())/12);
    //        //width = Math.floor(width);
    //        $this.children('.column').each(function(){
    //            
    //            var $col = $(this);
    //            //get classes
    //            var classes = $col.attr('class').split(' ');
    //            
    //            for (var y = 0; y < classes.length; y++){
    //                var grid = classes[y];
    //                if (grid.match(/^grid_\d+/g)){
    //                    var values = grid.split('_');
    //                    $col.css({
    //                        width : (width) * parseInt(values[1]) + 'px'
    //                    });
    //                    break;
    //                }
    //            }
    //        }); 
    //    });
    //}
    
    
    
    
    
    
    
});
}(jQuery));

