import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BACKEND_URL} from '../constants';
import {UserProfile} from '../models/profile';


@Injectable()
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserProfile[]>(BACKEND_URL + 'profile/profiles/');
    }

    getById(id: number) {
        return this.http.get<UserProfile>(BACKEND_URL + 'profile/profiles/' + id);
    }

    update(profile: UserProfile) {
        return this.http.put(BACKEND_URL + 'profile/profiles/' + profile.id, profile);
    }
}
