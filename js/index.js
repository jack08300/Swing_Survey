/**
 * Created by yen-chieh on 7/9/15.
 */
var Index = function() {
		var self = this;
		this.host = "http://111.185.13.44:60/childrenLab/survey/";
		//this.host = "http://www.childrenlab.com/survey/";
		$(document).ready(function(){
			self.init();
		});

}
;

Index.prototype.init = function(){
    this.resourcePage = getParams("resourcePage");
	this.$submitButton = $('div.submitButton');

	this.nextPage = this.$submitButton.attr('to');

    //
    var token = readCookie("token");
    if(!token){
        token = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        createCookie("token", token);
    }
	if(userip){
		//this.storeIp();
	}

	this.attachEvent();
};

Index.prototype.attachEvent = function(){
	var self = this;
	this.$submitButton.on('click', function(){


        if(self.$submitButton.hasClass('lastPage')){
            self.storeAnswer(true);
            eraseCookie("token");
        }else{
            self.storeAnswer();
        }
	});


};

Index.prototype.moveToPage = function(){
	var options = $('input[name=usedSmartWatch]:checked');

	if(options.length != 0){
		if(options.val() == "3"){
			this.nextPage = "seventhPage.html";
		}else if(options.val() == "2"){
			this.nextPage = "sixthPage.html";
		}
	}else{
		options = $('input[name=outdoorActivity]:checked');
		if(options.length != 0 && options.val() == "3"){
			this.nextPage = "fourthPage.html";
		}
	}

	window.location = this.nextPage;
};

Index.prototype.storeAnswer = function(lastPage){
	var self = this;

    var regionParam = '';
    if(typeof region != "undefined"){
        regionParam = "&region=" + region;
    }

    var resourcePageParam = '';
    if(typeof this.resourcePage != "undefined"){
        resourcePageParam = "&resourcePage=" + this.resourcePage;
    }

    var lastPageParam = '';
    if(lastPage){
        lastPageParam = '&completed=true'
    }
	$.ajax({
		url: this.host + 'storeAnswer?' + $('#surveyForm').serialize() + '&token=' + readCookie("token") + '&ip=' + userip + resourcePageParam + regionParam + lastPageParam,
		success: function(){
			self.moveToPage();
		}
	});
};

Index.prototype.storeIp = function(){
	$.ajax({
		url: this.host + 'storeIp',
		data: {
			ip: userip
		}
	})
};

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function getParams(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};



new Index();