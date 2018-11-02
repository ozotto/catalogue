export class Public {
  id: number;
  title: string;
}

export interface IPublic {
  id: number;
  title: string;
}

export class ListPublic implements IPublic {
  id: number;
  title: string;
  constructor(obj?: any) {
  	this.id = obj.id || '';
  	this.title = obj.title || '';
	}
}
