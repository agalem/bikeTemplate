/**
 * Created by agalempaszek on 13.09.2017.
 */
var $menu = $('.menu_responsive');

$('.menu_toggle').on('click', function(){
    $menu.toggleClass('shazam');
});
$('.content').on('click', function(){
    $menu.removeClass('shazam');
});