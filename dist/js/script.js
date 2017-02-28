'use strict'

var App = {

    renderUserInfo: function (userUrl) {
        var url = "https://api.github.com/users/" + userUrl;
        var dataUser = $.getJSON(url, function (data) {
        }).done(function (data) {
            $('#avatarUser').html("<img src='" + data.avatar_url + "'class='responsive-img'>");
            $('#userInfoName').html(data.name);
            $('#userInfoData').html("<li>" + "<i class='fa fa-user-o pull-left' aria-hidden='true'></i><span class='left'>" + data.login + "</span></li>" + "<li>" + "<i class='fa fa-suitcase pull-left' aria-hidden='true'></i><span class='left'>" + data.company + "</span></li>" + "<li>" + "<i class='fa fa-envelope pull-left' aria-hidden='true'></i><span class='left'>" + data.email + "</span></li>");
        }).fail(function () {
            console.log('Ocorreu algum erro na API!');
        })
    },


    renderUserRepo: function (userUrlRepo, valSelect, objFilter) {
        var url = "https://api.github.com/users/" + userUrlRepo;
        var valueSelect = valSelect;
        var dataAlphabeticalOrder = '';
        var objectFilter = objFilter;


        var dataUserRepo = $.getJSON(url, function () { })
            .done(function (data) {
                for (var i in data) {
                    if (data[i].language === null) {
                        data[i].language = 'Linguagem não cadastrada';
                    }
                    if (data[i].description === null) {
                        data[i].description = 'Descrição não cadastrada';
                    }
                    data[i].created_at = moment(data[i].created_at).format('DD/MM/YYYY');
                    data[i].pushed_at = moment(data[i].pushed_at).format('DD/MM/YYYY');
                }

                switch (valueSelect) {
                    case "1":
                        dataAlphabeticalOrder = data.sort(function (a, b) {
                            var textA = a.name.toUpperCase();
                            var textB = b.name.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        });
                        App.renderFilter(data, objectFilter, dataAlphabeticalOrder);
                        break;
                    case "2":
                        var dataStarCount = data.sort(function (a, b) {
                            return a.stargazers_count - b.stargazers_count;
                        });
                        App.renderFilter(data, objectFilter, dataStarCount);
                        break;
                    case "3":
                        var dataIssuesCount = data.sort(function (a, b) {
                            return a.open_issues_count - b.open_issues_count;
                        });
                        App.renderFilter(data, objectFilter, dataIssuesCount);
                        break;
                    default:
                        App.renderFilter(data, objectFilter, dataAlphabeticalOrder);
                }
            })
            .fail(function () {
                console.log("Ocorreu algum erro na API!");
            });
    },

    renderFilter: function (data, objFilter, dataOrder) {
        var currentObjectFilter;
        var elementsFiltered = [];

        for (var i in objFilter) {
            if (objFilter[i] == "CSS") {
                currentObjectFilter = dataOrder.filter(function (el) {
                    return el.language === "CSS";
                });
                currentObjectFilter.forEach(function (el) {
                    elementsFiltered.push(el);
                });
            }
            if (objFilter[i] == "HTML") {
                currentObjectFilter = dataOrder.filter(function (el) {
                    return el.language === "HTML";
                });
                currentObjectFilter.forEach(function (el) {
                    elementsFiltered.push(el);
                });
            }
            if (objFilter[i] == "JavaScript") {
                currentObjectFilter = dataOrder.filter(function (el) {
                    return el.language === "JavaScript";
                });
                currentObjectFilter.forEach(function (el) {
                    elementsFiltered.push(el);
                });
            }
        }

        if (elementsFiltered == '') {
            data.forEach(function (el) {
                elementsFiltered.push(el);
            })
        }

        App.clearContainer('#userRepos');
        $.each(elementsFiltered, function (i, value) {
            $('#userRepos').append("<div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><i class='fa fa-github pull-left fa-2x' aria-hidden='true'></i><span class='card-title'>" + elementsFiltered[i].name + "</span><p class='card_description'>" + elementsFiltered[i].description + "</p><div class='row'><div class='col s12'><i class='fa fa-code pull-left icon-language' aria-hidden='true'></i><span class='card_language'>"+ elementsFiltered[i].language + "</span></div></div><div class='row'><div class='col m6 s6'><i class='fa fa-star pull-left' aria-hidden='true'></i><span class='card_text_icon'>" + elementsFiltered[i].stargazers_count + "</span></div><div class='col m6 s6'><i class='fa fa-warning pull-left' aria-hidden='true'></i><span class='card_text_icon'>" + elementsFiltered[i].open_issues_count + "</span></div></div><div class='row'><div class='col m6 s6'><span class='card_at'>Criado em:</span><br/>" + elementsFiltered[i].created_at + "</div><div class='col m6 s6'><span class='card_at'>Último push:</span><br/>" + elementsFiltered[i].pushed_at + "</div></div></div><div class='card-action'><a href='" + elementsFiltered[i].html_url + "' target='_blank'>Ver mais</a></div></div></div>");
        });

    },

    clearContainer: function (element) {
        $(element).html('');
    },

    parallax: function () {
        $('.parallax').parallax();
    }
}

$(document).ready(function () {
    var valueSelect;
    var obj = {};

    App.parallax();
    $('select').material_select();

    App.renderUserInfo('wilfernandesjr');
    App.renderUserRepo('wilfernandesjr/starred', '1', obj);

    $('#selectOrder').change(function () {
        $('#selectFilterLanguage').prop('selectedIndex', 0);
        $('select').material_select();
        $("#selectOrder option:selected").each(function () {
            valueSelect = this.value;
            App.renderUserRepo('wilfernandesjr/starred', this.value, obj);
        });
    }).trigger('change');

    $('#selectFilterLanguage').change(function () {
        $("#selectFilterLanguage option:selected").each(function (key, val) {
            obj[key] = this.value;
        });

        App.renderUserRepo('wilfernandesjr/starred', valueSelect, obj);
        obj = {}
    });
});
