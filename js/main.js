 (function(){

var templateHtml = $('#template').html();

var templateFactory = _.template(templateHtml);

var helper = {
    commaSeparateNumber: function(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
    },
    uppercased: function(val){
        val = val.toUpperCase();
        return val;
    }
}

//Sticky Buttons
var elementPosition = $('.buttons').offset();

$(window).scroll(function(){
        if($(window).scrollTop() > elementPosition.top){
              $('.buttons').css('position','fixed').css('top','0');
        } else {
            $('.buttons').css('position','static');
        }    
});

//DATA

$.getJSON('data/d1bball.json', function(myData){
    
    var datonLoad = myData;
    myData.forEach(function(acceptSchool){
            _.extend(acceptSchool, helper);
            $( '#canvas' ).append( templateFactory(acceptSchool) );
        })

    // MOST BUTTON

    var largPop = myData.filter(function(e){
        return e.UndergradPop >= 39800;
    })
    $('.most').on('click', function(){ 
        $('.buttons').find('div').removeClass( "active" );
        $( this ).addClass( "active" );
        $( '#canvas' ).html('');
        largPop.forEach(function(acceptSchool){
            _.extend(acceptSchool, helper);
            $( '#canvas' ).append( templateFactory(acceptSchool) );
        })
    });


    // LEST BUTTON

    var smallPop = myData.filter(function(e){
        return e.UndergradPop <= 1900;
    })
    $('.least').on('click', function(){
        $('.buttons').find('div').removeClass( "active" );
        $( this ).addClass( "active" );
        $( '#canvas' ).html('');
        smallPop.forEach(function(acceptSchool){
            _.extend(acceptSchool, helper);
            $( '#canvas' ).append( templateFactory(acceptSchool) );
        })
    });


    // ALL SCHOOLS BUTTON

    var allSchools = _.sortBy(myData, 'UndergradPop');
    $('.seeAll').on('click', function(){
        $('.buttons').find('div').removeClass( "active" );
        $( this ).addClass( "active" );
        $( '#canvas' ).html('');
        myData.forEach(function(acceptSchool){
            _.extend(acceptSchool, helper);
            $( '#canvas' ).append( templateFactory(acceptSchool) );
        })
        console.log(allSchools);
    });


    });


}).call(this);