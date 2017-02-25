'use strict'

var App = {

    renderUserInfo : function(userUrl) {
     var url =  "https://api.github.com/users/" + userUrl; 
     var dataUser =  $.getJSON( url, function() {})
        .done(function(data){
            console.log(data);
            $('#avatarUser').html("<img src='"+data.avatar_url+"'class='responsive-img'>");
        })
        .fail(function() {
            console.log( "Ocorreu algum erro!" );
        });
      return dataUser;       
    },

    parallax : function(){
         $('.parallax').parallax();
    }
}

$(document).ready(function(){
     App.parallax();
     App.renderUserInfo('wilfernandesjr');
});
        