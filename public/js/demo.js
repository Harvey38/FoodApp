// $(document).ready(function() {
//   // event
//   $("footer").click(function() {
//     // changes
//     $("h1").css("background-color", "yellow");
//   });
// });
// $(document).ready(function() {
//   // $("nav").click(function() {
//   //   $("nav").addClass("sticky");
//   // });
//   // $("h1").click(function() {
//   //   $("h1").addClass("jquery");
//   // });
//   // $(".btn").hover(function() {
//   //   $(".btn").css("background-color", "yellow");
//   // });
//   $(".cities-btn").click(function() {
//     $("h2").addClass("animated infinite bounce delay-1s");
//   });
//   $(".cities-btn").click(function() {
//     $("h2").addClass("animated infinite bounce delay-1s");
//   });

  // $(window).scroll(function() {
  //   if ($(header).scrollTop() >20) {
  //     $("h2").css("background-color", "yellow");
  //   }
  // });

  $(document).ready(function() {
    $(window).scroll(function() {
      if ($(document).scrollTop() > 50&& $(document).scrollTop()<100) {
    
        $(".features-heading").addClass("animated infinite bounce delay-1s");
        
      } else if($(document).scrollTop() > 100&& $(document).scrollTop()<150){
        $(".steps-iphone").addClass("animated infinite bounce delay-1s");
      }
    
    });
  });