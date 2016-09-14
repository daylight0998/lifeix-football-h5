import { Router } from '@angular/router-deprecated';

export class Base {
	constructor(private router: Router) {

	}

	gotoDetail(id: number) {
		let link = ['Detail', { id: id }];
		this.router.navigate(link);
	}

}
