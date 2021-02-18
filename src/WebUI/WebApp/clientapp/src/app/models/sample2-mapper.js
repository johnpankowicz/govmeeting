"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sample2Mapper = void 0;
var pojos_1 = require("@automapper/pojos");
var core_1 = require("@automapper/core");
var Sample2Mapper = /** @class */ (function () {
    function Sample2Mapper() {
        this.mapper = core_1.createMapper({
            name: "blah",
            pluginInitializer: pojos_1.pojos
        });
    }
    Sample2Mapper.prototype.useMapper = function () {
        this.mapBio();
        this.mapUser();
        var user = this.getUser();
        var userDto = this.mapper.map(user, "UserDto", "User");
    };
    Sample2Mapper.prototype.mapBio = function () {
        pojos_1.createMetadataMap("Job", {
            title: String,
            salary: Number
        });
        pojos_1.createMetadataMap("JobDto", "Job");
        //createMetadataMap<JobDto>("JobDto", {
        //  title: String,
        //  salary: Number
        //});
        pojos_1.createMetadataMap("Bio", {
            jobs: "Job",
            avatarUrl: String
        });
        pojos_1.createMetadataMap("BioDto", "Bio", {
            jobs: "JobDto",
        });
        //createMetadataMap<BioDto>("BioDto", {
        //  jobs: "JobDto",
        //  avatarUrl: String
        //});
        this.mapper.createMap("Job", "JobDto");
        this.mapper
            .createMap("Bio", "BioDto", {
            namingConventions: new core_1.CamelCaseNamingConvention()
        })
            .forMember(function (destination) { return destination.birthday; }, core_1.mapFrom(function (source) { return source.birthday.toDateString(); }));
        //.forMember(
        //  destination => destination.jobs,
        //  mapFrom(source => source.jobs)
        //    );
    };
    Sample2Mapper.prototype.mapUser = function () {
        pojos_1.createMetadataMap("User", {
            firstName: String,
            lastName: String,
            username: String,
            bio: "Bio"
        });
        pojos_1.createMetadataMap("UserDto", "User", {
            fullName: String,
            bio: "BioDto"
        });
        this.mapper
            .createMap("User", "UserDto")
            .forMember(function (destination) { return destination.fullName; }, core_1.mapFrom(function (source) { return source.firstName + " " + source.lastName; }));
    };
    Sample2Mapper.prototype.getUser = function () {
        var user = {
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
        };
        return user;
    };
    return Sample2Mapper;
}());
exports.Sample2Mapper = Sample2Mapper;
//# sourceMappingURL=sample2-mapper.js.map