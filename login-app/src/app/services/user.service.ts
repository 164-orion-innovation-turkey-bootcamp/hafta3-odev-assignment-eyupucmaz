import { HttpClient } from "@angular/common/http";
import { User } from "../model/user.model";
import { Observable } from "rxjs"
import { Injectable, OnInit } from "@angular/core";

interface Login {
  email: string;
  password: string;
}

interface SingUp {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class UserService implements OnInit {
  private API_URL: string = "http://localhost:1234/users";
  private users!: User[];
  constructor(private http: HttpClient) {
    this.setUsers();
  }
  ngOnInit(): void {
  }

  private getUsersFromDb<T>(): Observable<T> {
    return this.http.get<T>(this.API_URL);
  }

  private setUsers() {
    this.getUsersFromDb<User[]>().subscribe((data: User[]) => {
      this.users = [...data];
    })
  }

  private nextId() {
    let lastUser = this.users.pop();
    return lastUser!.id + 1;
  }

  login(data: Login): boolean {
    this.setUsers();
    return this.users.some((user) => user.email === data.email && user.password === data.password);
  }

  signup(data: SingUp) {
    let id = this.nextId();
    this.http.post(this.API_URL, { id, ...data }).subscribe((data: any) => {
      this.users = data;
    }).unsubscribe();
  }

}