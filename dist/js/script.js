'use strict'

var App = {

    renderUserInfo : function(userUrl) {
     var url =  "https://api.github.com/users/" + userUrl; 
     var dataUser =  $.getJSON( url, function() {})
        .done(function(data){
            console.log(data);
            $('#avatarUser').html("<img src='"+data.avatar_url+"'class='responsive-img'>");
            $('#userInfoName').html(data.name);
            $('#userInfoData').html("<li>" + "<i class='material-icons left'>perm_identity</i><span class='left'>" + data.login + "</span></li>" + "<li>" + "<i class='material-icons left'>work</i><span class='left'>" + data.company + "</span></li>" + "<li>" + "<i class='material-icons left'>email</i><span class='left'>" + data.email + "</span></li>")
        })
        .fail(function() {
            console.log( "Ocorreu algum erro!" );
        });    
    },

    renderUserRepo : function(userUrlRepo) {
     var url =  "https://api.github.com/users/" + userUrlRepo; 
     var dataUserRepo =  $.getJSON( url, function() {})
        .done(function(data){
            console.log(data);
            $.each( data, function(key, val) {
               $('#userRepos').html("<div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>"+val.name+"</span></div></div></div>");
            });
        })
        .fail(function() {
            console.log( "Ocorreu algum erro!" );
        });    
    },

    parallax : function(){
         $('.parallax').parallax();
    }
}

$(document).ready(function(){
     App.parallax();
     App.renderUserInfo('wilfernandesjr');
     App.renderUserRepo('wilfernandesjr/starred');
});
        