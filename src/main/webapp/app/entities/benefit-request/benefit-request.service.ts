import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IBenefitRequest } from '@/shared/model/benefit-request.model';

const baseApiUrl = 'api/benefit-requests';

export default class BenefitRequestService {
  public find(id: number): Promise<IBenefitRequest> {
    return new Promise<IBenefitRequest>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/find/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(search: string, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `/${search}?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IBenefitRequest): Promise<IBenefitRequest> {
    return new Promise<IBenefitRequest>((resolve, reject) => {
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

  public update(entity: IBenefitRequest): Promise<IBenefitRequest> {
    return new Promise<IBenefitRequest>((resolve, reject) => {
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
