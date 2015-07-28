/**
 * Created by yen-chieh on 7/9/15.
 */
var Index = function() {
		var self = this;
		//this.host = "http://111.185.13.44:60/childrenLab/survey/";
		this.host = "http://www.childrenlab.com/survey/";
		$(document).ready(function(){
			self.init();
		});

}
;

Index.prototype.init = function(){
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

    var sourceParam = getParams("source");
    if(sourceParam){
        sourceParam = "&source=" + sourceParam;
    }

    var lastPageParam = '';
    if(lastPage){
        lastPageParam = '&completed=true'
    }

    var idea = $('textarea[name="idea"]');
    if(idea.length > 0){
        idea.val(Base64.encode(idea.val()));
    }

    var other = $('input[name="whereToBuySmartWatchOther"]');
    if(other.length > 0){
        other.val(Base64.encode(other.val()));
    }
	$.ajax({
		url: this.host + 'storeAnswer?' + $('#surveyForm').serialize() + '&token=' + readCookie("token") + '&ip=' + userip + sourceParam + regionParam + lastPageParam,
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


// Create Base64 Object
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    }, decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    }, _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    }, _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
};

new Index();