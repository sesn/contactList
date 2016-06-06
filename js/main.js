$(document).ready(function(){

  /*Start counter for notification*/
  $('.count').each(function () {
    $(this).prop('count',0).animate({
        count: $(this).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

/*Slidedown Anim for drop down*/
  $('.dropdown').on('show.bs.dropdown', function(){
   $(this).find('.dropdown-menu').slideDown();
 });

 $('.dropdown').on('hide.bs.dropdown', function(){
   $(this).find('.dropdown-menu').slideUp();
 });

 /*Checkbox Change*/
 $(document).on('change','.customCheckboxWrap input[type=checkbox]', function(){
   var $checkedOrNot = $(this).prop('checked');
   $(this).closest('label').find('.customCheckbox i').toggleClass('fa-plus fa-check');
   $(this).closest('tr').toggleClass('check-active');
 });

 /*Tab Change*/
 $('#contactTab a').on('show.bs.tab', function(event){
   var $tabName = $(event.target).html().toLowerCase();
   getData("json/data.json",event.target,$tabName);
 });
 /*Trigger the click on load*/
 $('#contactTab a').trigger('click');

 dropdownWidth();

});

$(window).on('resize', function(){
  dropdownWidth();
});

/*Template*/
function templateFn(obj) {
  var $template = '<tr>'+
  '<td><div class="hexagon"><i class="fa fa-'+ obj.hexagonImage +' iconImg" aria-hidden="true"></i></div></td>' +
   '<td><img src="img/profile1.png" class="img-circle img-responsive float-left" alt="'+ obj.contactName +'"></td> ' +
   '<td><h4 class="name">'+ obj.contactName+'</h4><div class="details"><span><i class="fa fa-thumbs-up" aria-hidden="true"></i></span>'+
      '<span class="address">'+obj.location+'</span>' +
      '<i class="fa fa-thumbs-up" aria-hidden="true"></i>'+
      '<span class="category">'+obj.category+'</span>'+
      '</div>'+
    '</td>' +
    '<td>'+
        '<label class="customCheckboxWrap">' +
            '<input type="checkbox" value="'+ obj.contactName+'" name="clUser[]"/>' +
            '<div class="customCheckbox"><i class="fa fa-plus" aria-hidden="true"></i></div>'+
        '</label>'+
    '</td>'+
   '</tr>';
   return $template;
}

/*GET DATA*/
function getData($url,$targetElement, $category) {
  $.getJSON( $url, function( data ) {
    var $contactItems = [];
      $.each(data.contactList,function(key,value){
        if(value.category.toLowerCase() == $category) {
          $contactItems.push(templateFn(value));
        }
        if($category == 'all') {
            $contactItems.push(templateFn(value));
        }
      });
      $($targetElement + '.clUserContainer table').html($contactItems);
   });
}

function dropdownWidth() {

  $(document).on('show.bs.dropdown','.dropdown', function(){
    $('.dropdown-menu',$(this)).css('min-width','100px');
      $('.dropdown-menu',$(this)).width($('.dropdown-toggle',$(this)).width());
  });
}
