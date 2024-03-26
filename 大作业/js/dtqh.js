
function overall(root){
	var root = root || document;
	var re = /j_([\w_]+)/;
	var funcs = {};
	$(".js",root).each(function(i) {
		var m = re.exec(this.className);
		if (m) {
			var f = funcs[m[1]];		
			if (!f) {
				f = eval('CF.' + m[1].replace(/\_/gi,'.'));
				funcs[m[1]] = f;
			}			
			f && f(this);
		}
	});
}

var CF = new Object();

//图片换一批（跑马灯效果）
CF.index = {
	
	carouseProduct: function(obj){		
		var obj = $(obj);
		var prevChild = obj.prev();
		var visible = 6;
		var liNums = $('li', obj).length;		
		var pageNum = Math.ceil( liNums/visible );
		var pageStr = '';
		prevChild.append('<ul class="jcarouseLiteNav"></ul>');
		var jcarouseLiteNav = $('>ul.jcarouseLiteNav', prevChild);		
		for(var i = 0; i < pageNum; i++){
			pageStr += '';
		}
		jcarouseLiteNav.prepend('' + pageStr + ' <li class="next"><button class="hyh"><a><span>换一换</span></a></button></li>');
		$('>li .1', jcarouseLiteNav).parent().addClass('current');

		if(liNums <=visible){
			jcarouseLiteNav.hide();
		}
		obj.jCarouselLite({
			btnNext: $('>li.next ', jcarouseLiteNav),
			btnPrev: $('>li.prev a', jcarouseLiteNav),
			visible: visible,
			scroll: visible,
			speed: 1000,
			afterEnd: function(a){
				$('>li.current', jcarouseLiteNav).removeClass('current');
				var currLI = $(a[0]).attr("class").split('order')[1];
				$('>li:eq(' + currLI + ')', jcarouseLiteNav).addClass('current');
			},
			btnGo: $('>li:not([class*=previous]):not([class*=next]) a', jcarouseLiteNav)
		})
		var width = obj.width();
		obj.width( width - 3 );
	}
}

$(function() {
    overall();
    SetuserPannel();
    SetuserUserInfoPannel();
})