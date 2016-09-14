
import {Observable} from 'rxjs/Rx';
export class DateTimeUtil {

	nowTime:Date;
	o:TimeCountDown={
		s:1,
		m:60,
		h:60*60,
		d:60*60*24
	};

	

	constructor() {
		this.nowTime = new Date();
	}

	countDown(date:number):any{
		//console.log(date);
		
		var delta = date - this.nowTime.getTime();
		if(delta<=0) {
			return null;
		}
		var until = new TimeCountDown();
		delta = delta/1000;

		until.d=Math.floor(delta/this.o['d']);
		delta = delta%this.o['d'];

		until.h=Math.floor(delta/this.o['h']);
		delta = delta%this.o['h'];
		until.m=Math.floor(delta/this.o['m']);
		delta = delta%this.o['m'];
		
		until.s=Math.floor(delta/this.o['s']);
		
		return until;

	}
}


export class TimeCountDown{
	d:number;
	h:number;
	m:number;
	s:number;
}