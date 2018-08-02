import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user';
import {BACKEND_URL} from '../constants';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${BACKEND_URL}/users`);
  }

  getById(id: number) {
    return this.http.get(`${BACKEND_URL}/users/` + id);
  }

  register(user: User) {
    return this.http.post(`${BACKEND_URL}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${BACKEND_URL}/users/` + user.pk, user);
  }

  delete(id: number) {
    return this.http.delete(`${BACKEND_URL}/users/` + id);
  }
}
