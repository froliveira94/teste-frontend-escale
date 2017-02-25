'use strict'

var App = {

    getUserInfo : function() {
        $.getJSON( "https://api.github.com/users/wilfernandesjr", function( data ) {
            var obj = {};
            $.each( data, function( i, val ) {
                obj[i] = value;
            });
        });
        console.log(obj);
    }, 

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

    renderUserRepo : function(userUrlRepo, value) {
     var url =  "https://api.github.com/users/" + userUrlRepo; 
     var valueSelect = value;
     var dataAlphabeticalOrder = "";
     var dataUserRepo =  $.getJSON( url, function() {})
        .done(function(data){
            switch (valueSelect) {
            case "1":
               dataAlphabeticalOrder = data.sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                App.clearContainer('#userRepos');
                $.each(dataAlphabeticalOrder, function (i, value) {
                   $('#userRepos').append("<div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>"+dataAlphabeticalOrder[i].name+"</span><p>"+dataAlphabeticalOrder[i].description+"</p><p>"+dataAlphabeticalOrder[i].language+"</p><ul class='user-repos_list'><li>"+dataAlphabeticalOrder[i].stargazers_count+"</li><li>"+dataAlphabeticalOrder[i].open_issues_count+"</li><li>"+dataAlphabeticalOrder[i].created_at+"</li><li>"+dataAlphabeticalOrder[i].pushed_at+"</li></ul></div></div></div>");
                });
                break;
            case "2":
                var dataStarCount = data.sort(function(a, b){
                    return a.stargazers_count - b.stargazers_count;
                });
                App.clearContainer('#userRepos');
                $.each(dataStarCount, function (i, value) {
                   $('#userRepos').append("<div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>"+dataStarCount[i].name+"</span><p>"+dataStarCount[i].description+"</p><p>"+dataStarCount[i].language+"</p><ul class='user-repos_list'><li>"+dataStarCount[i].stargazers_count+"</li><li>"+dataStarCount[i].open_issues_count+"</li><li>"+dataStarCount[i].created_at+"</li><li>"+dataStarCount[i].pushed_at+"</li></ul></div></div></div>");
                });
                break;
            case "3":
                var dataIssuesCount = data.sort(function(a, b){
                    return a.open_issues_count - b.open_issues_count;
                });
                App.clearContainer('#userRepos');
                 $.each(dataIssuesCount, function (i, value) {
                   $('#userRepos').append("<div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>"+dataIssuesCount[i].name+"</span><p>"+dataIssuesCount[i].description+"</p><p>"+dataIssuesCount[i].language+"</p><ul class='user-repos_list'><li>"+dataIssuesCount[i].stargazers_count+"</li><li>"+dataIssuesCount[i].open_issues_count+"</li><li>"+dataIssuesCount[i].created_at+"</li><li>"+dataIssuesCount[i].pushed_at+"</li></ul></div></div></div>");
                });
                console.log(dataIssuesCount);
                break;
            default:
                App.clearContainer('#userRepos');
                $.each(dataAlphabeticalOrder, function (i, value) {
                   $('#userRepos').append("<div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>"+dataAlphabeticalOrder[i].name+"</span><p>"+dataAlphabeticalOrder[i].description+"</p><p>"+dataAlphabeticalOrder[i].language+"</p><ul class='user-repos_list'><li>"+dataAlphabeticalOrder[i].stargazers_count+"</li><li>"+dataAlphabeticalOrder[i].open_issues_count+"</li><li>"+dataAlphabeticalOrder[i].created_at+"</li><li>"+dataAlphabeticalOrder[i].pushed_at+"</li></ul></div></div></div>");
                });
            }
        })
        .fail(function() {
            console.log( "Ocorreu algum erro na API!" );
        });    
    },

    clearContainer : function(element) {
        $(element).html('');
    },

    parallax : function(){
         $('.parallax').parallax();
    }
}

$(document).ready(function(){
     App.parallax();
     App.getUserInfo();
     App.renderUserInfo('wilfernandesjr');
     App.renderUserRepo('wilfernandesjr/starred', 1);

     $('#selectFilter').change(function(){
        $( "#selectFilter option:selected" ).each(function() {
            App.renderUserRepo('wilfernandesjr/starred', this.value);
        });
     }).trigger('change');
});
        