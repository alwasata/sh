import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IInvoiceBenefits } from '@/shared/model/invoice-benefits.model';

const baseApiUrl = 'api/invoice-benefits';

export default class InvoiceBenefitsService {
  public find(id: number): Promise<IInvoiceBenefits> {
    return new Promise<IInvoiceBenefits>((resolve, reject) => {
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
          reject(err);
        });
    });
  }

  public create(entity: IInvoiceBenefits): Promise<IInvoiceBenefits> {
    return new Promise<IInvoiceBenefits>((resolve, reject) => {
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

  public update(entity: IInvoiceBenefits): Promise<IInvoiceBenefits> {
    return new Promise<IInvoiceBenefits>((resolve, reject) => {
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
