import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { ICard } from '@/shared/model/card.model';

const baseApiUrl = 'api/cards';

export default class CardService {
  public find(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  public create(entity: ICard): Promise<ICard> {
    return new Promise<ICard>((resolve, reject) => {
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

  public update(entity: ICard): Promise<ICard> {
    return new Promise<ICard>((resolve, reject) => {
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

  public charge(entity: object): Promise<ICard> {
    return new Promise<ICard>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/chargecard`, entity)
        .then(res => {
          console.log(res);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
