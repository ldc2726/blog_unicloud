(function(){
	// note that this js uses jQuery!
	// note that this js requires bShare's button.js!
	var isReady = false, u = window.bShareUtil, b = window.bShare, iL8n = b.iL8n || {}, BSHARE_MORE = "more";
	                          
	// CUSTOMIZABLE FIELDS:
	var CSS_LOGOS_PATH = b.imageBasePath + "logos/m2/"; // logos path
	var CSS_SHADOW_IMAGE_URL = b.shost + "/images/bshareap-shadow.gif";
	
	// the ordering of the platforms... use bShare short names.
	// note: BSHARE_MORE is to show all platforms.
	var buttonPlatforms = ['weixin','sinaminiblog','facebook','qqim','qqmb','twitter']; 
	
	u.ready(function(){
		var prepare = function () {
			if (!!b.completed) {
				iL8n = b.iL8n;
				loadAddon();
				return;
			}
			setTimeout(prepare, 50);
		};
        if (!isReady) {
            isReady = true;
            prepare();
        }
	});
	
	function loadAddon() {
		// load necessary styles:
        var cssStyleS = '#bshareap .aplist{height:40px;margin-top:5px;}';
        cssStyleS += '#bshareap .aplist .listitem{position:relative;height:30px;width:45px;margin:0 3px;padding:5px 0 0;cursor:pointer;text-align:center;list-style:none;display:inline-block;' + ((u.isIe&&(!u.isIe8&&!u.isIe9))?'*display:inline;':'') + 'zoom:1;vertical-align:top;}';
        cssStyleS += '#bshareap .aplist .listitem img{border:none !important;}';
        cssStyleS += '#bshareap .aplist .apicon{width:24px;height:24px;margin:0 auto;display:block;z-index:2;position:relative;}';
        cssStyleS += '#bshareap .aplist .apshadow{width:45px;z-index:1;position:absolute;bottom:-5px;left:0;*margin:0 auto;}';

        var numPlat = 0;
		for (var k=0; k<buttonPlatforms.length; k++) {
			var key = buttonPlatforms[k];
			if (key == BSHARE_MORE) {
				cssStyleS += '#bshareap .aplist .icon-' + key + '{background:url("' + CSS_LOGOS_PATH + 'more.gif") 0 0 no-repeat;}';
				numPlat++;
				continue;
			}
			if (u.isUndefined(b.pnMap[key])) continue;
			cssStyleS += '#bshareap .aplist .icon-' + key + '{background:url("' + CSS_LOGOS_PATH + key + '.gif") 0 0 no-repeat;}';
			numPlat++;
		}
		u.loadStyle(cssStyleS);
		
		var BSHARE_AP_DIV_WIDTH = numPlat * 51;
		var htmlS = '<div id="bshareap" style="position:relative;overflow-x:hidden;overflow-y:hidden;width:' + BSHARE_AP_DIV_WIDTH + 'px;"><div class="aplist">';
		for (var k=0; k<buttonPlatforms.length; k++) {
			var key = buttonPlatforms[k];
			if (key == BSHARE_MORE) {
				htmlS += '<div class="listitem"><span onclick="javascript:bShare.more(event);return false;" title="' + iL8n.morePlatsShort + '" class="apicon icon-' + key + '"></span>';
				htmlS += '<div class="apshadow"><img src="' + CSS_SHADOW_IMAGE_URL + '"></div></div>';
				continue;
			}
			if (u.isUndefined(b.pnMap[key])) continue;
			htmlS += '<div class="listitem"><span onclick="javascript:bShare.share(event,\'' + key + '\',0);return false;" title="' + iL8n.shareText + ' ' + b.pnMap[key][0] + '" class="apicon icon-' + key + '"></span>';
			htmlS += '<div class="apshadow"><img src="' + CSS_SHADOW_IMAGE_URL + '"></div></div>';
		}	
		htmlS += '</div></div>';
		
		var placeHolder = u.getElem(document, "a", "bshareDiv", function(h) {
    		h.innerHTML = htmlS;
    		h.onclick = function(){return false;};
    	});
		
		var iconOnHover = {marginTop: "-6px"};
		var iconOnHoverOut = {marginTop: "0"};
		var iconOnHoverOutBounce = {marginTop: "4px"};
		var shadowOnHover = {width: "29px", height: "10px", marginLeft: "8px"};
		var shadowOnHoverOut = {width: "45px", height: "15px", marginLeft: "0"};
		var shadowOpacityOn = {opacity: 0.25};
		var shadowOpacityOff = {opacity: 1};
		if (u.isIe && !u.isIe8) {
			shadowOnHover.marginLeft = "0";
		}
		
		// this code uses jquery... if you don't want to load jquery, you can try rewriting the lines below into javascript.
		$(".listitem").hover(function(e) {
			$(this).children(".apicon").stop().animate(iconOnHover, 250);
			$(this).children(".apshadow").children("img").stop().animate(shadowOnHover, 250);
			$(this).children(".apshadow").stop().animate(shadowOpacityOn, 250);
			e.stopPropagation();
		}, function(e) {
			$(this).children(".apicon").stop().animate(iconOnHoverOutBounce, 250, function(e) {
				$(this).animate(iconOnHoverOut, 250);
			});
			$(this).children(".apshadow").children("img").stop().animate(shadowOnHoverOut, 250);
			$(this).children(".apshadow").stop().animate(shadowOpacityOff, 250);
			e.stopPropagation();
		});
	}
})();