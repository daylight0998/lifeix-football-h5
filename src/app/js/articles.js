
$(function() {
	var resourceUrl = "http://s.files.c-f.com/";
	var apiBaseUrl = "http://api.c-f.com/";
	var categoryId = getURLParam("type");
	var articlesUrl = apiBaseUrl + "football/elearning/training_categories/" + categoryId + "/article_pages";//文章列表
	var articleShareUrl = resourceUrl + "templates/elearning/training/article.html";//文章单篇H5
	var imgPrefix = resourceUrl; //图片前缀
	var videoPrefix = resourceUrl; //视频前缀
	var videoSuffix = "/LD"; //视频后缀
	var videoThumbnail = "-vthumb"; //
	var start = 0;
	var limit = 5;
	var loadFlag = false;
	document.getElementsByTagName("html")[0].style.fontSize = document.body.clientWidth / 10 + "px";
	requireData();
	scrollToLoad();
	resizeListen();
	playVideo();
	shareArticle();
	/**
	 * 请求并渲染数据
	 */
	function requireData() {
		$(document).ready(function(){
			$.ajax({
				url: articlesUrl,
				type: 'GET',
				data: {
					key: "visitor",
					limit: limit,
					start: start
				},
				success: function(res) {
					$(".do_loading").hide();
					if (res.length > 0) {
						var data = {
							list: res,
							imgPrefix: imgPrefix,
							videoPrefix: videoPrefix,
							videoSuffix: videoSuffix,
							videoThumbnail: videoThumbnail
						}
						var ListTpl = $("#train").html();
						$(".container ul").append(juicer(ListTpl, data));
						if(res.length >= limit)
							start += limit;
						else
							start = -1;
						loadFlag = false;
					} else {
						start = -1;
					}
				},
				error: function() {
					$(".do_loading").hide();
				}
			});
		});
	}

	/**
	 * 监听resize事件
	 */
	function resizeListen(){
		$(window).on("resize", function(){
			var playGroup = $(".play_group");
			var heightValue = playGroup.height() + "px";
			playGroup.siblings(".loading_group").css("height", heightValue);
		});
	}
	
	/**
	 * 播放视频
	 */
	function playVideo(){		
		$("body").delegate(".video_box","click",function(){
			var video = $("#video_play");
			if(video){
				var videoBox = video.parent(".video_box");
				var videoBoxId = videoBox.attr("id");
				var newVideoBoxId = $(this).attr("id");
				if(videoBoxId == newVideoBoxId)
					return;
				video.attr("src", "");
				video.load();
				video.remove();
				videoBox.find(".play_group").show();
			}
			var imagePath = $(this).attr("data-imagePath");
			var videoPath = $(this).attr("data-videoPath");
			var videoHtml = '<video id="video_play" autoplay controls ' + 
							' poster="' + imagePath + '"' + 
							' src="' + videoPath + '"' + 
							' type="video/mp4" >' + 
							'</video>';
			var playGroup = $(this).find(".play_group");
			var heightValue = playGroup.height() + "px";
			playGroup.hide();
			$(this).find(".loading_group").css("height", heightValue).show();
			$(this).append(videoHtml);
			var videoNew = $(this).find("#video_play");
			videoNew.on("playing", function(){
				$(this).show();
				var videoBox = $(this).parent(".video_box");
				videoBox.find(".loading_group").hide();
			})
			videoNew.get(0).play();
		});
	}

	/**
	 * 获取url中的对应参数
	 */
	function getURLParam(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}

	/**
	 * 滚动到底部加载更多
	 */
	function scrollToLoad() {
		$(window).on("scroll", function() {
			var scrollT = $(window).scrollTop();
			var screenH = $(window).height();
			var clientH = $(document).height();
			if ((scrollT + screenH >= clientH) && !loadFlag && start != -1) { //上一次加载已结束才能再请求，避免重复请求
				loadFlag = true;
				requireData();
			}
		});
	}
	
	/**
	 * 分享文章
	 */
	function shareArticle(){		
		$("body").delegate(".btn_share","click",function(){
			var id = $(this).attr("data-id");
			var title= $(this).attr("data-title");
			var subTitle= $(this).attr("data-subTitle");
			var shareName = title;
			if(subTitle && subTitle.length > 0)
				shareName = shareName + " - " + subTitle;
			var shareUrl = articleShareUrl + "?pageId=" + id + "&catId=" + categoryId;
			window.shareObject.shareToThirdWithNameAndShareUrl(shareName, shareUrl);
		});
	}
});

