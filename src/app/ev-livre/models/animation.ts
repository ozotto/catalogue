import {Author} from './author';
import {Public} from './public';
import {Location} from './location';
import {Type} from './type';
import {Exhibitor} from './exhibitor';

export class Animation {
  id: number;
  title: string;
  description: string;
  type: Type;
  location: Location;
  exhibitor: Exhibitor;
  public: Public[];
  author: Author[]
}


export class NewAnimation {
  id: number;
  title: string;
  description: string;
  type: Type;
  location: Location;
  exhibitor: number;
  public: number[];
  author: number[]
}
