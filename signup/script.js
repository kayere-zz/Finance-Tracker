$(document).ready(function(){
    $('.pass_err').hide();
    $('#btn-signup').on('click',function(){
        let first_name = $('#first_name').val();
        let last_name = $('#last_name').val();
        let Email = $('#Email').val();
        let password = $('#Password').val();
        let confirm_password =$('#confirm_password').val();
        if(password==confirm_password){
            $("form")[0].reset();
        }
        else{
             $('.pass_err').show();
        }
    });
});