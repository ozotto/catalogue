import {Author} from './author';
import {Public} from './public';
import {Location} from './location';
import {Type} from './type';
import {Exhibitor} from './exhibitor';
import Any = jasmine.Any;

export class Animation {
  id: number;
  title: string;
  description: string;
  type: Type;
  location: Location;
  exhibitor: Any;
  public: Any[];
  author: Any[];
}
