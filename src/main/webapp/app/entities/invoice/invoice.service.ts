import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { ISetting } from '@/shared/model/setting.model';
import { IInvoice } from '@/shared/model/invoice.model';
import { IBenefit } from '@/shared/model/benefit.model';

const baseApiUrl = 'api/invoices';

export default class InvoiceService {
  public find(id: number): Promise<IInvoice> {
    return new Promise<IInvoice>((resolve, reject) => {
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

  public getinvoices(id: number): Promise<IInvoice> {
    return new Promise<IInvoice>((resolve, reject) => {
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

  public getInvoicesByStatus(status: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}`)
        .then(res => {
          var countInvoice = 0;
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].invoiceStatus == status) {
              countInvoice++;
            }
          }
          resolve(countInvoice);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `/123?${buildPaginationQueryOpts(paginationQuery)}`)
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

  public create(entity: IInvoice): Promise<IInvoice> {
    return new Promise<IInvoice>((resolve, reject) => {
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

  public update(entity: IInvoice): Promise<IInvoice> {
    return new Promise<IInvoice>((resolve, reject) => {
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

  public search(id: string): Promise<IInvoice> {
    return new Promise<IInvoice>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/search/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public saveInvoice(data: object): Promise<IInvoice> {
    return new Promise<IInvoice>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}/saveinvoice`, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getBeneit(id: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/getbenefit/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  public checkBenefitQuantity(data: any): Promise<any> {
    console.log(data);
    // return data;
    return new Promise<any>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}/checkbenefit`, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
