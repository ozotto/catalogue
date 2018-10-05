///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>

import {Location} from './location';
import {Type} from './type';
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
