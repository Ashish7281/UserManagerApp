import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisteredUser, IUser } from '../contracts/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL = "https://reqres.in/";
  status: string = '';
  postId: number = 0;
  users: IUser[] = [];
  constructor(private http: HttpClient) {    
  }  

  // Retrieve all user for specified page from server.  
  getAllUsers(page: number): any {
    return this.http.get<IRegisteredUser>(this.BASE_URL + 'api/users?page=' + page);
  }

  // Add and create user on server.
  addUser(user: IUser) {
    this.http.post<IRegisteredUser>(this.BASE_URL + 'api/users', user).subscribe(data => {
      console.log(data);
    });
  }

  // Update user details on server.
  updateUser(user: IRegisteredUser) {
    this.http.put<any>(this.BASE_URL + 'api/users/' + user.id, user)
      .subscribe(data => {
        console.log(data);
      });
  }

  // Delete user of corresponding user id on server.
  deleteUser(id: number): any {
    return this.http.delete(this.BASE_URL + 'api/users/' + id).subscribe(
      () => this.status = 'Deleted'
    );
  }

  // Retrieve user of specific user id.
  getById(id: number) {
    return this.http.get<IRegisteredUser>(this.BASE_URL + 'api/users/' + id);
  }
}
