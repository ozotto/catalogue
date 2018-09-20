import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BACKEND_URL} from '../constants';
import {User} from '../models/user';


@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(BACKEND_URL + 'profile/users/');
    }

    getById(id: number) {
        return this.http.get(BACKEND_URL + 'profile/users/' + id);
    }

    create(user: User) {
        return this.http.post(BACKEND_URL + 'rest-auth/registration/', user);
    }

    update(user: User) {
        return this.http.put(BACKEND_URL + 'profile/users/' + user.pk, user);
    }

    delete(id: number) {
        return this.http.delete(BACKEND_URL + 'profile/users/' + id);
    }
}
