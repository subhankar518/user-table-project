
export interface Dob {
  date: string;
  age: number;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface User {
  _id: string;
  gender: string;
  name: Name;
  location: {};
  email: string;
  login: {};
  dob: Dob;
  registered: {};
  phone: string;
  cell: string;
  picture: {};
  nat: string;
  createdAt?: string;
  updatedAt?: string;
}
