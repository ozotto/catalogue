///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
import Any = jasmine.Any;

export class Schedule {
  id: number;
  date_start: string;
  date_end: string;
  animation: Any[];
}
