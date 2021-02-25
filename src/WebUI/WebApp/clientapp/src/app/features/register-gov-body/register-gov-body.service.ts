import { Injectable } from '@angular/core';
import { GovbodyMapper } from '../../models/govbody-mapper';
import { GovbodyClient, GovLocationClient } from '../../apis/api.generated.clients';
import { IGovbodyDetails_Dto, IGovLocation_Dto, IOfficial_Dto } from '../../apis/api.generated.clients'
import { RegisterGovbody_Cmd } from '../../apis/api.generated.clients'
import { IGovbodyDetails_Vm, IGovLocation_Vm, IOfficial_Vm } from '../../models/govbody-view';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterGovBodyService {

  //mapper: GovbodyMapper = new GovbodyMapper;
  mapper: GovbodyMapper;
  govbodyClient: GovbodyClient;
  govLocationClient: GovLocationClient;

  myGovlocationsDto: IGovLocation_Dto[];
  myGovlocationsVm: IGovLocation_Vm[];

  observe: Observable<IGovLocation_Dto[]> = null;
  my1: IGovLocation_Vm;

  constructor(
    //_mapper: GovbodyMapper,
    _govbodyClient: GovbodyClient,
    _govLocationClient: GovLocationClient
  ) {
    this.mapper = new GovbodyMapper;
    //this.mapper = _mapper;
    this.govbodyClient = _govbodyClient;
    this.govLocationClient = _govLocationClient;
  }

  //getMyGovLocations(): Observable<IGovLocation_Vm[]> {
  //// API: getMyGovLocations(): Observable<GovLocation_Dto[]> {
  //  this.govLocationClient.getMyGovLocations()

  //  //const userDto = this.mapper.mapper.map(user, "UserDto", "User");
  //}

  testMapper() {
    let g1: IGovLocation_Dto = { id: 1, name: "me", type: 0, parentLocationId: 2 };
    let g2: IGovLocation_Vm = this.mapper.mapper.map(g1, "IGovLocation_Vm", "IGovLocation_Dto");
    let x = 2;
  }

  //getMyGovLocations(): IGovLocation_Vm[] {
  //  this.observe = this.govLocationClient.getMyGovLocations();
  //  this.observe.subscribe(
  //    (result) => {
  //      this.myGovlocationsDto = result;
  //      this.my1 = this.mapper.mapper.map<IGovLocation_Dto, IGovLocation_Vm>(this.myGovlocationsDto[0], "IGovLocation_Vm", "IGovLocation_Dto");
  //      //this.my1 = this.mapper.mapper.map(this.myGovlocationsDto[0], "IGovLocation_Dto", "IGovLocation_Vm");
  //      this.myGovlocationsVm = this.mapper.mapper.map<IGovLocation_Dto[], IGovLocation_Vm[]>(this.myGovlocationsDto, "IGovLocation_Vm", "IGovLocation_Dto");
  //    },

  //    (error) => console.error(error)
  //  );

  //  return this.myGovlocationsVm;
  //}


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
