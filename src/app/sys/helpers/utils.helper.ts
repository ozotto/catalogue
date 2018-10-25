import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsHelper {
  constructor( ) { }

  public remove_id_in_list(element, list) {
    console.log('before delete')
    console.log(list)
    list.splice(list.indexOf(element), 1);
    console.log('after delete')
    console.log(list)
  }

  public remove_object_in_list(object, list_of_objects) {
    for (let i = 0; i < list_of_objects.length; i++) {
      const list_obj = list_of_objects[i];

      if (list_obj.id === object.id) {
        list_of_objects.splice(i, 1);
        i--;
      }
    }
  }

}
