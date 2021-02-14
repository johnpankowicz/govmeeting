import { createMapper, mapFrom } from '@automapper/core';
//import { classes } from '@automapper/classes';
import { createMetadataMap } from '@automapper/pojos';

//import { EditMeeting_Dto } from '../apis/swagger-api';
//import { EditTranscript } from './edittranscript-view';

//export const mapper = createMapper({
//  name: 'someName',
//  pluginInitializer: classes,
//});

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: Bio;
}

export interface Bio {
  job: Job;
  birthday: Date;
  avatarUrl: string;
}

export interface Job {
  title: string;
  salary: number;
}

export interface UserDto {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  bio: BioDto;
}

export interface BioDto {
  jobTitle: string;
  jobSalary: number;
  birthday: string;
  avatarUrl: string;
}

createMetadataMap<Job>('Job', {
  title: String,
  salary: Number,
});

createMetadataMap<Bio>('Bio', {
  job: 'Job',
  avatarUrl: String,
});

createMetadataMap<User>('User', {
  firstName: String,
  lastName: String,
  username: String,
  bio: 'Bio',
});

createMetadataMap<BioDto>('BioDto', {
  jobTitle: String,
  jobSalary: String,
  avatarUrl: String,
});

createMetadataMap<UserDto>('UserDto', 'User', {
  fullName: String,
  bio: 'BioDto',
});

//mapper
//  .createMap<Bio, BioDto>('Bio', 'BioDto', {
//    namingConventions: {
//      source: new CamelCaseNamingConvention(),
//      destination: new CamelCaseNamingConvention(),
//    },
//  })
//  .forMember(
//    (destination) => destination.birthday,
//    mapFrom((source) => source.birthday.toDateString())
//  );

//mapper.createMap<User, UserDto>('User', 'UserDto').forMember(
//  (destination) => destination.fullName,
//  mapFrom((source) => source.firstName + ' ' + source.lastName)
//);

//function getUserDto(username: string): UserDto {
//  const user = fetchUserByUsernameFromDb(username);
//  return mapper.map<User, UserDto>(user, 'UserDto', 'User');
//}

//export const mapper = createMapper({
//  name: 'someName',
//  pluginInitializer: classes,
//});

//mapper.createMap(EditTranscript, EditMeeting_Dto)
//  .forMember((d) => d.sections, mapFrom((s) => s.sections))
//  .forMember((d) => d.topics, mapFrom((s) => s.topics))
//  //.forMember((d) => d.talks, mapFrom((s) => s.talks))
//  ;

//mapper
//  .createMap(EditTranscript, EditMeeting_Dto, {
//    namingConventions: {
//      source: new CamelCaseNamingConvention(),
//      destination: new CamelCaseNamingConvention(),
//    },
//  })
//  .forMember(
//    (destination) => destination.birthday,
//    mapFrom((source) => source.birthday.toDateString())
//  );
