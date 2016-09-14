import {Injectable} from '@angular/core';

@Injectable()
export class QuizResult {

	/* -1 初始状态 -2 测试结束 **/
	currIndex: number =-1;
	total: number ;
	successNum: number =0;
	errorNum: number =0;
	msg: string;
	playend: boolean = false;
	currR1:number =-1;
	currR2:number =-1;
	passNum =0;
	
}

