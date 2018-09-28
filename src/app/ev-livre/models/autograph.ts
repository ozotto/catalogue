import {Exhibitor} from './exhibitor';
import {State} from './state';

export class Autograph {
  id: number;
  title: string;
  author: {
    id: number;
      first_name: string;
      last_name: string;
      job: string;
      copyright: string;
      image: string;
      is_validated: boolean;
  };
  exhibitor: Exhibitor[];
  state: State;
}
