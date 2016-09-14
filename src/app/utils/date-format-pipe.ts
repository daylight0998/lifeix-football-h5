import {Pipe} from '@angular/core';

@Pipe({
	name:"df"
})
export class DateFormatPipe {

	transform(value:any,args?:any){
		var time:Date = new Date(value);
		 var o = {
	        "M+": time.getMonth() + 1, //月份 
	        "d+": time.getDate(), //日 
	        "h+": time.getHours(), //小时 
	        "H+": time.getHours(), //小时 
	        "m+": time.getMinutes(), //分 
	        "s+": time.getSeconds(), //秒 
	        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
	        "S": time.getMilliseconds() //毫秒 
    	};

    	if (/(y+)/.test(args)) args = args.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    	for (var k in o)
    		if (new RegExp("(" + k + ")").test(args)) args = args.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    	return args;
		// if(args== 'zh') {
		// 	return time.getUTCFullYear()+"年"+time.getUTCMonth()+"月";
			
		// }else{
		// 	return "2012";
		// }

		
	}
}