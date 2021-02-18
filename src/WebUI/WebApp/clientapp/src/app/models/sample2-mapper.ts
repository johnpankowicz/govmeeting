import { createMetadataMap, pojos } from "@automapper/pojos";
import {
  createMapper,
  CamelCaseNamingConvention,
  mapFrom
} from "@automapper/core";

export interface Job {
  title: string;
  salary: number;
}

export interface Bio {
  jobs: Job[];
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

export interface JobDto {
  title: string;
  salary: number;
}

export interface BioDto {
  jobs: JobDto[];
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

export class Sample2Mapper {

  mapper = createMapper({
    name: "blah",
    pluginInitializer: pojos
  });

  useMapper() {

    this.mapBio();

    this.mapUser()

    const user: User = this.getUser();

    const userDto = this.mapper.map(user, "UserDto", "User");

  }
  mapBio() {
    createMetadataMap<Job>("Job", {
      title: String,
      salary: Number
    });

    createMetadataMap<JobDto>("JobDto", "Job");

    //createMetadataMap<JobDto>("JobDto", {
    //  title: String,
    //  salary: Number
    //});

    createMetadataMap<Bio>("Bio", {
      jobs: "Job",
      avatarUrl: String
    });

    createMetadataMap<BioDto>("BioDto", "Bio", {
      jobs: "JobDto",
    });

    //createMetadataMap<BioDto>("BioDto", {
    //  jobs: "JobDto",
    //  avatarUrl: String
    //});

    this.mapper.createMap<Job, JobDto>("Job", "JobDto");

    this.mapper
      .createMap<Bio, BioDto>("Bio", "BioDto", {
        namingConventions: new CamelCaseNamingConvention()
      })
      .forMember(
        destination => destination.birthday,
        mapFrom(source => source.birthday.toDateString())
      );
      //.forMember(
      //  destination => destination.jobs,
      //  mapFrom(source => source.jobs)
  //    );
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

  getUser(): User {
    const user = {
      bio: {
        jobs: [
          {
          title: "dev",
          salary: 1234567
          },
          {
            title: "mgr",
            salary: 7654321
          }
        ],
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
