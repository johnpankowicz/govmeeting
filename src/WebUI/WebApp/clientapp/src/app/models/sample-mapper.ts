//import "reflect-metadata";

import { createMetadataMap, pojos } from "@automapper/pojos";
import {
  createMapper,
  CamelCaseNamingConvention,
  mapFrom
} from "@automapper/core";

//// Import stylesheets
//import "./style.css";

//// Write TypeScript code!
//const appDiv: HTMLElement = document.getElementById("app");
//appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

//const output = document.getElementById("output");

  export interface Job {
    title: string;
    salary: number;
  }

  export interface Bio {
    job: Job;
    birthday: Date;
    avatarUrl: string;
  }

  export interface User {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    bio: Bio;
  }

  export interface BioDto {
    jobTitle: string;
    jobSalary: number;
    birthday: string;
    avatarUrl: string;
  }

  export interface UserDto {
    firstName: string;
    lastName: string;
    fullName: string;
    username: string;
    bio: BioDto;
  }

export class SampleMapper {

  mapper = createMapper({
    name: "blah",
    pluginInitializer: pojos
  });

  mapBio() {
    createMetadataMap<Job>("Job", {
      title: String,
      salary: Number
    });

    createMetadataMap<Bio>("Bio", {
      job: "Job",
      avatarUrl: String
    });

    createMetadataMap<BioDto>("BioDto", {
      jobTitle: String,
      jobSalary: String,
      avatarUrl: String
    });

    this.mapper
      .createMap<Bio, BioDto>("Bio", "BioDto", {
        namingConventions: new CamelCaseNamingConvention()
      })
      .forMember(
        destination => destination.birthday,
        mapFrom(source => source.birthday.toDateString())
      );
  }

  mapUser() {
    createMetadataMap<User>("User", {
      firstName: String,
      lastName: String,
      username: String,
      bio: "Bio"
    });

    createMetadataMap<UserDto>("UserDto", "User", {
      fullName: String,
      bio: "BioDto"
    });

    this.mapper
      .createMap<User, UserDto>("User", "UserDto")
      .forMember(
        destination => destination.fullName,
        mapFrom(source => source.firstName + " " + source.lastName)
      );
  }

  useMapper() {

    this.mapBio();

    this.mapUser()

    const user: User = this.getUser();

    const vm = this.mapper.map(user, "UserDto", "User");

    const dto = this.mapper.map(vm, "User", "UserDto");

    const user2: User = this.getUser();

    const users: User[] = [user, user2];

    //const userDtos = this.mapper.mapArray(users, UserDto);

  }

  getUser(): User {
    const user = {
      bio: {
        job: {
          title: "dev",
          salary: 1234567
        },
        birthday: new Date(),
        avatarUrl: "url.com"
      },
      firstName: "Chau",
      lastName: "Tran",
      username: "ctran",
      password: "123456"
    } as User;
    return user;
  }
}

      //  output.innerHTML = `
      //    <h4>User</h4>
      //    <pre>${JSON.stringify(user, null, 2)}</pre>
      //    <br>
      //    <h4>UserDto</h4>
      //    <pre>${JSON.stringify(vm, null, 2)}</pre>
      //  `;
