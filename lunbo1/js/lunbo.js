$(function(){
	var list = $("#img-list");
	var imgAll = $("img");
	var nav = $("#nav-btns");
	var main = $("#main");
	var aAll = $("a");
	var auto;//setTimeout函数的id

	list.width(600 * imgAll.length + "px");//设置滚动栏的宽度
	nav.css('left',(main.width() - nav.width()) / 2 + "px");//使导航栏居中

	var index = 0;
	aAll.eq(index).css('background-color','rgba(0,255,0,0.5)');

	var autoChange = function(){//自动切换图片
		list.stop(true,false);//删除动画队列
		auto = setTimeout(function(){
			var currentleft = index * -600;
			index = (index == 5) ? 0 : ++index;
			//console.log(index);
			aAll.css('background-color','rgba(255,0,0,0.5)')
				.eq(index).css('background-color','rgba(0,255,0,0.5)');
			list.animate({left:currentleft-600},1000,function(){
				if(index == 0){
				//console.log('跳转');
				list.css('left','0px');
				}
				autoChange();
			});
		},1500);
	}
	autoChange();//初始调用自动切换图片函数

	nav.on('click','a',function(e){//点击切换图片
		clearTimeout(auto);
		list.stop(true,false);
		index = $(this).index();
		aAll.css('background-color','rgba(255,0,0,0.5)')
			.eq(index).css('background-color','rgba(0,255,0,0.5)');

		list.animate({left:-600 * index},1000,autoChange);
	})
})