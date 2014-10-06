$(function () {

	inputListener(); //输入框监听
	zeroClipboardCopy(); //复制到剪贴板
	recentColor(); //最近使用的颜色

})


//*********************************************************************//
//                              页面效果                               //
//*********************************************************************//


// 输入框监听
function inputListener () {
	var hexBox = $(".hex input");
	var decBox = $(".dec input");
	hexBox.keyup(function(){  //keyup事件处理
		transformHex();
	}).bind("paste",function(){  //CTR+V事件处理
		transformHex();
	});
	decBox.blur(function () {
		var thisVal = parseInt($(this).val());
		var rgb = [$("#r").val(), $("#g").val(), $("#b").val()];
		if (thisVal < 0 || thisVal > 255) {
			$(this).addClass("error");
		}
		else {
			$(this).removeClass("error");
		}
		if (decCorrect(rgb)) {
			writeHex(dec2hex(rgb));
		}
	})
	decBox.keyup(function(){  //keyup事件处理 
		$(this).val($(this).val().replace(/\D|^0/g,''));  
	}).bind("paste",function(){  //CTR+V事件处理 
		$(this).val($(this).val().replace(/\D|^0/g,''));  
	})
	// 转换十六进制颜色
	function transformHex () {
		var hexVal = hexBox.val();
		if (hexCorrect(hexVal)) {
			writeDec(hex2dec(hexVal));
			saveToRecent(hexVal);
		}
		else {
			clearDec();
		}
		decBox.removeClass("error");
	}
}


// 最近使用的颜色
function recentColor () {
	$(".recent p").on("click","a",function () {
		var thisHex = $(this).parent().find("i").html();
		writeHex(thisHex);
		writeDec(hex2dec(thisHex));
		$(".recent p span").removeClass("current");
		$(this).parent().addClass("current");
	})
}


// 保存到最近使用的颜色
function saveToRecent (hex) {
	var recentList = $(".recent p");
	var lastColor = recentList.find("span:first-of-type i").html();
	if (lastColor != "" && lastColor != hex) {
		if ($(".recent p span").length > 9) {
			recentList.find("span:last-of-type").remove();
		}
		recentList.find("span").removeClass("current");
		recentList.prepend("<span class='current'><a href='javascript:;' style='background-color: #" + hex + "'></a><i>" + hex + "</i></span>");
	};
}


// 写入十六进制色值
function writeHex (hex) {
	$(".hex input").val(hex);
}


// 写入十进制色值
function writeDec (rgb) {
	$(".dec .r input").val(rgb[0]);
	$(".dec .g input").val(rgb[1]);
	$(".dec .b input").val(rgb[2]);
}

// 清空十六进制色值
function clearHex () {
	$(".hex input").val("");
}


// 清空十六进制色值
function clearDec () {
	$(".dec input").val("");
}


// 检测十六进制色值是否合法
function hexCorrect (hex) {
	if (hex.length > 5 && addZero(parseInt(hex,16).toString(16),6) == hex) {
		return true;
	}
	else {
		return false;
	}
}


// 检测十进制色值是否合法
function decCorrect (rgb) {
	var flag = 1;
	for (var i = 0; i < rgb.length; i++) {
		if(rgb[i] == "" || rgb[i] < 0 || rgb[i] > 255) {
			flag = 0;
		}
	};
	if (flag) {
		return true;
	}
	else {
		return false;
	}
}


// 十六进制转十进制
function hex2dec (hex) {
	var r, g, b;
	r = parseInt(hex.substring(0,2),16);
	g = parseInt(hex.substring(2,4),16);
	b = parseInt(hex.substring(4,6),16);
	return [r, g, b];
}


// 十进制转十六进制
function dec2hex (rgb) {
	var hex = addZero(parseInt(rgb[0]).toString(16), 2) + addZero(parseInt(rgb[1]).toString(16), 2) + addZero(parseInt(rgb[2]).toString(16), 2);
	return hex;
}


// 补零
function addZero(str,length){               
    return new Array(length - str.length + 1).join("0") + str;              
}




//*********************************************************************//
//                                插件                                 //
//*********************************************************************//


// 复制到剪贴板
function zeroClipboardCopy () {
	var clip = new ZeroClipboard($(".copy"));
	ZeroClipboard.on("aftercopy", function(e) {
		var thisTip = $(e.target).find("span");
		thisTip.removeClass("copied");
		thisTip.addClass("copied");
		var timer = setTimeout(function () {
			thisTip.removeClass("copied");
		},700);
	});
}