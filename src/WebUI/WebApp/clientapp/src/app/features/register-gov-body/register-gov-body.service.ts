import { Inject, Injectable } from '@angular/core';
import { GovbodyMapper, IGovLocationArray_Dto, IGovLocationArray_Vm } from '../../models/govbody-mapper';
import { GovbodyClient, GovLocationClient } from '../../apis/api.generated.clients';
import { GovbodyDetails_Dto, GovLocation_Dto, Official_Dto } from '../../apis/api.generated.clients'
import { RegisterGovbody_Cmd } from '../../apis/api.generated.clients'
import { IGovbodyDetails_Vm, IGovLocation_Vm, IOfficial_Vm } from '../../models/govbody-view';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterGovBodyService {

  //mapper: GovbodyMapper = new GovbodyMapper;
  mapper: GovbodyMapper;
  govbodyClient: GovbodyClient;
  govLocationClient: GovLocationClient;

  myGovlocationsDto: GovLocation_Dto[];
  myGovlocationsVm: IGovLocation_Vm[] = [];

  mygovDto: IGovLocationArray_Dto = new IGovLocationArray_Dto();
  //mygovVm: IGovLocationArray_Vm = new IGovLocationArray_Vm();
  mygovVm: IGovLocationArray_Vm;

  observeVm: Observable<IGovLocation_Vm[]> = null;
  observe: Observable<GovLocation_Dto[]> = null;
  my1: IGovLocation_Vm;

  returnofcall: any;

  constructor(
    public http: HttpClient,
    //_mapper: GovbodyMapper,
    _govbodyClient: GovbodyClient,
    _govLocationClient: GovLocationClient
  ) {
    this.mapper = new GovbodyMapper;
    //this.mapper = _mapper;
    this.govbodyClient = _govbodyClient;
    this.govLocationClient = _govLocationClient;
  //  this.myGovlocationsVm = [];
  }

  //getMyGovLocations(): Observable<IGovLocation_Vm[]> {
  //// API: getMyGovLocations(): Observable<GovLocation_Dto[]> {
  //  this.govLocationClient.getMyGovLocations()

  //  //const userDto = this.mapper.mapper.map(user, "UserDto", "User");
  //}

  mapReturn(n) {
  //  return this.mapper.mapper.map(n[0], "IGovLocation_Vm", "GovLocation_Dto");
    let vms : IGovLocation_Vm[] = [];
    n.forEach((value, index) => {
      vms.push(this.mapper.mapper.map(value, "IGovLocation_Vm", "GovLocation_Dto"));
    });
    return vms;
  }

  getMyGovLocations(): Observable<IGovLocation_Vm[]> {
    this.returnofcall = this.govLocationClient.getMyGovLocations().pipe(
      //  map(n => "another string")
      //  map(n => n)
      //  map(n =>
      //    this.mapper.mapper.map(n[0], "IGovLocation_Vm", "GovLocation_Dto")
      //  )
      map(n => this.mapReturn(n))
    );
      //.subscribe(
      //  result => {
      //    console.log(result)
      //  }
      //);

    //this.observe = this.govLocationClient.getMyGovLocations();
      //this.http.get("/api/GovLocation/GetMyGovLocations")

      //.pipe(map(value => {
      //  value
      //}));

      //.pipe(value => {
      //  value
      //})
    //  .subscribe(
    //////this.observe.subscribe(
    //  (result) => {
    //    this.myGovlocationsDto = result;

    //    this.myGovlocationsDto.forEach((value, index) => {
    //      let x = 2;
    //      this.myGovlocationsVm.push(this.mapper.mapper.map(value, "IGovLocation_Vm", "GovLocation_Dto"));
    //    })
    //      this.mygovDto.locations = result;
    //      this.my1 = this.mapper.mapper.map(this.myGovlocationsDto[0], "IGovLocation_Vm", "GovLocation_Dto");
    //      this.mygovVm = this.mapper.mapper.map(this.mygovDto, "IGovLocationArray_Vm", "IGovLocationArray_Dto");
    //  },

    //  (error) => console.error(error)
    //);

    return this.returnofcall
    //return this.myGovlocationsVm;
    //  return this.mygovVm.locations;
  }


  getMyGovLocations1(): IGovLocation_Vm[] {
    this.observe = this.govLocationClient.getMyGovLocations();
    this.observe.subscribe(
      (result) => {
        this.myGovlocationsDto = result;
        this.mygovDto.locations = result;
        this.my1 = this.mapper.mapper.map(this.myGovlocationsDto[0], "IGovLocation_Vm", "GovLocation_Dto");
        this.mygovVm = this.mapper.mapper.map(this.mygovDto, "IGovLocationArray_Vm", "IGovLocationArray_Dto");
      },

      (error) => console.error(error)
    );

    return this.mygovVm.locations;
  }


  registerGovbody(govbody: IGovbodyDetails_Vm) {
  // API: register(command: RegisterGovbody_Cmd): Observable<number> {

    let govbodyRegCmd: RegisterGovbody_Cmd;
    // TODO map vm to cmd
    this.govbodyClient.register(govbodyRegCmd)
  }

  getGovbodies(govLocationId: number) {
    this.govbodyClient.getGovbodies(govLocationId);
  }

  getGovbody(govBodyId: number) {
    // API: getGovbody(id: number): Observable<GovbodyDetails_Dto>
    this.govbodyClient.getGovbody(govBodyId);
  }
}
