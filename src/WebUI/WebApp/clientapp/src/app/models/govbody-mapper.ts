import { createMetadataMap, pojos } from "@automapper/pojos";
import { Mapper } from '@automapper/types';
import {
  createMapper
  //  CamelCaseNamingConvention,
  //  mapFrom
} from "@automapper/core";

import {
  IGovbody_Vm,
  IGovbodyDetails_Vm,
  IGovLocation_Vm,
  IOfficial_Vm,
  IAppointedOfficial_Vm,
  IElectedOfficial_Vm
} from './govbody-view';

import {
  IGovLocation_Dto,
  IGovbodyDetails_Dto,
  GovlocTypes,
  IOfficial_Dto,
  IElectedOfficial_Dto,
  IAppointedOfficial_Dto
} from '../apis/api.generated.clients';

export class IGovLocationArray_Dto {
  locations: IGovLocation_Dto[];
}

export class IGovLocationArray_Vm {
  locations: IGovLocation_Vm[];
}

export class GovbodyMapper{

  mapper: Mapper;

  constructor() {
    this.mapper = createMapper({
      name: "GovbodyMapper",
      pluginInitializer: pojos
    });

    this.mapOfficial();

    this.mapGovLocation();

    this.mapGovLocationArray();

    this.mapGovbodyDetails();
  }

  mapOfficial() {
    createMetadataMap<IOfficial_Vm>("Official_Vm", {
      name: String,
      title: String
    });

    createMetadataMap<IOfficial_Dto>("Official_Dto", "Official_Vm")
  }

  mapGovLocation(){
    createMetadataMap<IGovLocation_Vm>("IGovLocation_Vm", {
      id: Number,
      name: String,
      type: Number,
      parentLocationId: Number
    });

    createMetadataMap<IGovLocation_Dto>("IGovLocation_Dto", "IGovLocation_Vm");

    this.mapper.createMap<IGovLocation_Dto, IGovLocation_Vm>("IGovLocation_Dto", "IGovLocation_Vm");
  }

  mapGovbodyDetails() {
      createMetadataMap<IGovbodyDetails_Vm>("IGovbodyDetails_Vm", {
        name: String,
        parentLocationId: Number,
        officials: "IOfficial_Vm",
        officers: "IOfficial_Vm",
        recordingsUrl: String,
        transcriptsUrl: String
      });

      createMetadataMap<IGovbodyDetails_Dto>("IGovbodyDetails_Dto", "IGovbodyDetails_Vm");
  }

  mapGovLocationArray() {
    createMetadataMap<IGovLocationArray_Dto>("IGovLocationArray_Dto", {
      locations: "IGovLocation_Dto"
    });

    createMetadataMap<IGovLocationArray_Vm>("IGovLocationArray_Vm", {
      locations: "IGovLocation_Vm"
    });

    this.mapper.createMap<IGovLocationArray_Dto, IGovLocationArray_Vm>("IGovLocationArray_Dto", "IGovLocationArray_Vm");
  }
}
