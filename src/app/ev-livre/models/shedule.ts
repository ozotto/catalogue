export class Schedule {
  id: number;
  date_start: string;
  date_end: string;
  animation: {
  id: number;
    title: string;
    description: string;
    type: number;
    location: number;
    exhibitor: number;
    public: number[];
    author: number[];
}
