/**
 * Created by yen-chieh on 7/9/15.
 */
var Index = function() {
		var self = this;
		//this.host = "http://111.185.13.44:80/childrenLab/survey/";
		this.host = "http://www.childrenlab.com/survey/";
		$(document).ready(function(){
			self.init();
		});

}
;

Index.prototype.init = function(){
	this.$submitButton = $('div.submitButton');

	this.nextPage = this.$submitButton.attr('to');

	if(userip){
		this.storeIp();
	}

	this.attachEvent();
};

Index.prototype.attachEvent = function(){
	var self = this;
	this.$submitButton.on('click', function(){
		self.storeAnswer();
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

Index.prototype.storeAnswer = function(){
	var self = this;
	$.ajax({
		url: this.host + 'storeAnswer?' + $('#surveyForm').serialize() + '&ip=' + userip,
		success: function(){
			self.moveToPage();
		}
	})
};

Index.prototype.storeIp = function(){
	$.ajax({
		url: this.host + 'storeIp',
		data: {
			ip: userip
		}
	})
};

new Index();