$(document).ready(function(){

  //code for showing sign up and login forms
  $('#sign').click(function(){
    $('#login_container').fadeOut('fast');
    $('#regis_container').fadeIn('fast');
    $('#auth_container').css("height","50%");
  });
  $('#log').click(function(){
    $('#login_container').fadeIn('fast');
    $('#regis_container').fadeOut('fast');
    $('#auth_container').css("height","40%")
  });

  //code for footer
  $('.links').mouseenter(function(){
    var id = $(this).attr('id');
    if(id=="ab"){
      $('#about').fadeIn('fast');
    }
    if(id=="con"){
      $('#contact').fadeIn('fast');
    }
    if(id=="copy"){
      $('#copyright').fadeIn('fast');
    }
    $('.links').mouseleave(function(){
      $('.footer_notification').fadeOut('fast');
    });
  });

  //functions to check whether ticks in login and register forms are visible
  function check_login(){
    if($('#login_form>#tick1').css('display')=='inline' && $('#login_form>#tick2').css('display')=='inline'){
      $('#login_submit').removeClass('disabled');
    }
    else{
      $('#login_submit').addClass('disabled');
    }
    if($('#uname_login').val()==""||$("#pass_login").val()==""){
      $('#login_submit').addClass('disabled');
    }
  }
  function check_register(){
    if($('#register_form>#tick1').css('display')=='inline' && $('#register_form>#tick2').css('display')=='inline' && $('#register_form>#tick3').css('display')=='inline' && $('#register_form>#tick4').css('display')=='inline' && $('#register_form>#tick5').css('display')=='inline'){
      $('#regis_submit').removeClass('disabled');
    }
    else{
      $('#regis_submit').addClass('disabled');
      if($('#uname_regis').val()==""){
        $("#regis_submit").addClass('disabled');
      }
    }
  }



  /*
   *
  Code for validating login data begins
   *
   */

  //Code for checking password
  $('#pass_login').on("keyup",function(){
    var pass = $(this).val();
    if(pass.length<6){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html('<p>Password too short</p>');
      $('#login_form #cross2').fadeIn('fast');
      $('#login_form #tick2').fadeOut('fast');
      $('#login_submit').addClass('disabled');
    }
    else{
      $('#auth_notification').fadeOut('fast');
      $('#login_form #cross2').fadeOut('fast');
      $('#login_form #tick2').fadeIn('fast');
    }
    check_login();
  });

  //Code for checking username
  $('#uname_login').on("keyup",function(){
    var uname = $(this).val();
    if(uname.length<5){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html('<p>Username too short</p>');
      $('#login_form #cross1').fadeIn('fast');
      $('#login_form #tick1').fadeOut('fast');
      $('#login_submit').addClass('disabled');
    }
    else if(/^[a-zA-Z0-9]*$/.test(uname) == false){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html("<p>Username contains illegal characters<p>");
      $('#login_form #cross1').fadeIn('fast');
      $('#login_form #tick1').fadeOut('fast');
      $('#login_submit').addClass('disabled');
    }
    else{
      $('#auth_notification').fadeOut('fast');
      $('#login_form #cross1').fadeOut('fast');
      $('#login_form #tick1').fadeIn('fast');
    }
    check_login();
  });

  /*
   *
   Code for validating registeration data begins
   *
   */

  //Code for checking name of user
  $('#name_regis').on("keyup",function(){
    var name = $(this).val();
    if(name.length<4){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html('<p>Name too short</p>');
      $('#register_form>#cross1').fadeIn('fast');
      $('#register_form>#tick1').fadeOut('fast');
      $('#regis_submit').addClass('disabled');
    }
    else if(/^[a-zA-Z0-9 ]*$/.test(name) == false){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html("<p>Name contains illegal characters<p>");
      $('#register_form #cross1').fadeIn('fast');
      $('#register_form #tick1').fadeOut('fast');
      $('#regis_submit').addClass('disabled');
    }
    else{
      $('#auth_notification').fadeOut('fast');
      $('#register_form #cross1').fadeOut('fast');
      $('#register_form #tick1').fadeIn('fast');
    }
    check_register();
  });

  //Code for checking username
  $('#uname_regis').on("keyup",function(){
    var uname = $(this).val();
    if(uname.length<5){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html('<p>Username too short</p>');
      $('#register_form #cross2').fadeIn('fast');
      $('#register_form #tick2').fadeOut('fast');
      $('#regis_submit').addClass('disabled');
    }
    else if(/^[a-zA-Z0-9]*$/.test(uname) == false){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html("<p>Username contains illegal characters<p>");
      $('#register_form #cross2').fadeIn('fast');
      $('#register_form #tick2').fadeOut('fast');
      $('#regis_submit').addClass('disabled');
    }
    else{
      $('#auth_notification').fadeOut('fast');
      $('#register_form #cross2').fadeOut('fast');
      $('#register_form #tick2').fadeIn('fast');
    }
    check_register();
  });

  //Code for checking email of a person
  $('#email_regis').on("keyup",function(){
    var email = $(this).val();
    if(email.length<5){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html('<p>Email too short</p>');
      $('#register_form #cross3').fadeIn('fast');
      $('#register_form #tick3').fadeOut('fast');
      $('#regis_submit').addClass('disabled');
    }
    else if(/^[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[a-z]*$/.test(email) == false){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html("<p>Email not in proper format<p>");
      $('#register_form #cross3').fadeIn('fast');
      $('#register_form #tick3').fadeOut('fast');
      $('#regis_submit').addClass('disabled');
    }
    else{
      $('#auth_notification').fadeOut('fast');
      $('#register_form #cross3').fadeOut('fast');
      $('#register_form #tick3').fadeIn('fast');
    }
    check_register();
  });

  //Code for checking password
  $('#pass_regis').on("keyup",function(){
    var pass = $(this).val();
    if(pass.length<6){
      $('#auth_notification').fadeIn('fast');
      $('#auth_notification').html('<p>Password too short</p>');
      $('#register_form #cross4').fadeIn('fast');
      $('#register_form #tick4').fadeOut('fast');
      $('#regis_submit').addClass('disabled');
    }
    else{
      $('#auth_notification').fadeOut('fast');
      $('#register_form #cross4').fadeOut('fast');
      $('#register_form #tick4').fadeIn('fast');
    }
    check_register();
  });

  //Code for confirming passwords
  $('#confirm_regis').on("keyup",function(){
    var conf = $(this).val();
    var orig = $('#pass_regis').val();
    if(conf==orig && conf.length>0){
      $('#register_form>#tick5').fadeIn('fast');
      $('#register_form>#cross5').fadeOut('fast');
      $('#auth_notification').fadeOut('fast');
    }
    else{
      $('#register_form>#cross5').fadeIn('fast');
      $('#register_form>#tick5').fadeOut('fast');
      $("#auth_notification").html("<p>Both the passwords do not match</p>");
      $('#auth_notification').fadeIn('fast');
    }
    check_register();
  });

  /*
   *
   Code for validating add data begins
   *
   */
   $('#task_field').on("keyup",function(){
     var task = $(this).val();
     if(task!=""){
       $('#task_submit').removeClass('disabled');
     }
     else{
       $('#task_submit').addClass('disabled');
     }
   });

});
