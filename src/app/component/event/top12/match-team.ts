import * as models from '../../../api/model/models';

export class MatchGroup {
	 amatch: models.Match;
 	 bmatch: models.Match;


	constructor(amatch: models.Match, bmatch: models.Match) {
		this.amatch = amatch;
		this.bmatch = bmatch;
 	}


}

export class MatchStage{
	 matchGroups: MatchGroup[] = [];
	 stage: string;
	 startdate: Date;

	 constructor(stage: string, startdate: Date) {
		 this.stage = stage;
		 this.startdate = startdate;
	}

}

export class MatchTop12{
	private matchStages: MatchStage[] = [];

	aMs: models.Match[]=[];
	bMs: models.Match[]=[];

	 sortMatches(matchs: Array<models.Match>):any{
		for (var m of matchs) {
			if(m.group=='A') {
				this.aMs.push(m);
			}else if(m.group=='B'){
				this.bMs.push(m);
			}
		}

		//console.log(this.bMs.length+"+++"+matchs.length+"+++"+this.aMs.length);

		for (var i = 0; i < this.aMs.length; ++i) {
			//console.log(i+"---"+this.aMs.pop());
			var aM = this.aMs[i];
			var bM = this.bMs[i];
			var group = new MatchGroup(aM,bM);


			var existStage: boolean = false;
			for (var s of this.matchStages) {
				if (s.stage == aM.stage) {
					s.matchGroups.push(group);
					existStage = true;
				}
			}
			if(!existStage) {
				var matchStage = new MatchStage(aM.stage, aM.startDate);
				matchStage.matchGroups.push(group);
				this.matchStages.push(matchStage)
			}

		}
		//console.log(this.matchStages.length+"----");

		return this.matchStages;

	}


}
