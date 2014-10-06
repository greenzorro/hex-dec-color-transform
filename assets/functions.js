$(function () {

	inputListener(); //输入框监听
	zeroClipboardCopy(); //复制到剪贴板

})


//*********************************************************************//
//                              页面效果                               //
//*********************************************************************//


// 输入框监听
function inputListener () {
	var hexBox = $(".hex input");
	var rBox = $(".dec .r input");
	var gBox = $(".dec .g input");
	var bBox = $(".dec .b input");
	var hexVal;
	hexBox.keyup(function(){  //keyup事件处理
		transformHex();
	}).bind("paste",function(){  //CTR+V事件处理
		transformHex();
	});
	function transformHex () {
		hexVal = hexBox.val();
		if (hexCorrect(hexVal)) {
			writeDec(hex2dec(hexVal));
			saveToRecent(hexVal);
		}
		else {
			clearDec();
		}
	}
}


// 保存到最近使用的颜色
function saveToRecent (hex) {
	var recentList = $(".recent p");
	if ($(".recent p a").length > 9) {
		recentList.find("a:last-of-type").remove();
	}
	recentList.prepend("<a href='javascript:;' style='background-color: #" + hex + "'>" + hex + "</a>");
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
		if(rgb[i] < 0 || rgb[i] > 255) {
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
	var hex = rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
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