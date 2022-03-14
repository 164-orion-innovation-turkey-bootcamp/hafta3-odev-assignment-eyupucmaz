export class User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;

  constructor(id: number, name: string, lastname: string, password: string, email: string) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
  }
}