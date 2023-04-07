var user = document.getElementById("user");
var pass = document.getElementById("pass");
var email = document.getElementById("email");
var confirm = document.getElementById("confirm");
var reg = document.getElementById("create");

var user_letter = document.getElementById("1stletter");
var user_length = document.getElementById("user-length");

var pass_length = document.getElementById("pass-length");
var pass_upper = document.getElementById("pass-upper");
var pass_num = document.getElementById("pass-num");
var pass_special = document.getElementById("pass-special");

var confirm_pass = document.getElementById('confirm-pass');

//Username Requirements
user.onfocus = function () {
    document.getElementById("user-message").style.display = "block";
}

user.onblur = function () {
    document.getElementById("user-message").style.display = "none";
}

user.onkeyup = function getinfo() {

    var upper = /[A-Z]/g;
    var lowwer = /[a-z]/g;
    var num = /[0-9]/g;
    //Checking for 1st character of username to be a letter
    if (user.value == null || user.value == "") {
        user_letter.classList.remove("valid");
        user_letter.classList.add("invalid");
        return false;
    }
    else if (user.value[0].match(upper) || user.value[0].match(lowwer)) {
        user_letter.classList.remove("invalid");
        user_letter.classList.add("valid");
    }
    else {
        user_letter.classList.remove("valid");
        user_letter.classList.add("invalid");
        return false;
    }
    //Checking for username to be 3 letters or longer
    if (user.value.length >= 3) {
        var count = 0;
        for (let i = 0; i < user.value.length; i++) {
            if (user.value[i].match(upper) || user.value[i].match(lowwer) || user.value[i].match(num)) {
                count++;
            }
        }
        if (count >= 3) {
            user_length.classList.remove("invalid");
            user_length.classList.add("valid");
        }
    }
    else {
        user_length.classList.remove("valid");
        user_length.classList.add("invalid");
    }
}


//Password Requirements
pass.onfocus = function () {
    document.getElementById("pass-message").style.display = "block";
}

pass.onblur = function () {
    document.getElementById("pass-message").style.display = "none";
}

pass.onkeyup = function getinfo () {
    var upper = /[A-Z]/g;
    var special = /[/*+!@#$^&]/g;
    var minus_check = '-'
    var num = /[0-9]/g;
    var check_u = 0;
    var check_s = 0;
    var check_n = 0;
    //Checking for length
    if(pass.value.length >= 8) {
        pass_length.classList.remove("invalid");
        pass_length.classList.add("valid");
      }
    else {
        pass_length.classList.remove("valid");
        pass_length.classList.add("invalid");
      }

      for (let i = 0; i < pass.value.length; i++) {
        if (pass.value[i].match(upper)) check_u = 1;
        if (pass.value[i].match(special) || pass.value[i].match(minus_check)) check_s = 1;
        if (pass.value[i].match(num)) check_n = 1;
        if (check_u == 1 && check_s == 1 && check_n == 1) break;
    }
    //Checks for upper case latters
    if(check_u == 1) {
        pass_upper.classList.remove("invalid");
        pass_upper.classList.add("valid");
      }
    else {
        pass_upper.classList.remove("valid");
        pass_upper.classList.add("invalid");
      }
    //Checks for special characters
    if(check_s == 1) {
        pass_special.classList.remove("invalid");
        pass_special.classList.add("valid");
      }
    else {
        pass_special.classList.remove("valid");
        pass_special.classList.add("invalid");
      }
    //Checks for numbers
    if(check_n == 1) {
        pass_num.classList.remove("invalid");
        pass_num.classList.add("valid");
      }
    else {
        pass_num.classList.remove("valid");
        pass_num.classList.add("invalid");
      }
      
}

//Comfirm Password
confirm.onfocus = function () {
    document.getElementById("confirm-message").style.display = "block";
}

confirm.onblur = function () {
    document.getElementById("confirm-message").style.display = "none";
}

confirm.onkeyup = function getinfo () {
    if (confirm.value.match(pass.value) && pass.value.match(confirm.value)) {
        confirm_pass.classList.remove("invalid");
        confirm_pass.classList.add("valid");
      }
    else {
        confirm_pass.classList.remove("valid");
        confirm_pass.classList.add("invalid");
      }
    }

