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

  getMyGovLocations(): Observable<IGovLocation_Dto[]> {
    return this.govLocationClient.getMyGovLocations();
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
