import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IHospital } from '@/shared/model/hospital.model';

const baseApiUrl = 'api/hospitals';

export default class HospitalService {
  public find(id: number): Promise<IHospital> {
    return new Promise<IHospital>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getActive(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `/active?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number, status: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}/${status}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IHospital): Promise<IHospital> {
    return new Promise<IHospital>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IHospital): Promise<IHospital> {
    return new Promise<IHospital>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
