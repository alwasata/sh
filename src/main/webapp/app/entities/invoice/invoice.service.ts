import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { ISetting } from '@/shared/model/setting.model';
import { IInvoice } from '@/shared/model/invoice.model';
import { IBenefit } from '@/shared/model/benefit.model';

const baseApiUrl = 'api/invoices';

export default class InvoiceService {
  public find(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

  public getInvoicesByStatus(status: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/getinvoices/status`)
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

  public retrieve(search: string, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      console.log('in rerrieve ' + search);
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

  public search(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

  public getBeneit(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

  public getInvoicesAdmin(status: string, hospitalid: string, dateFrom: Date, dateTo: Date): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/getInvoicesWithStatusAdmin/${status}/${hospitalid}/${dateFrom}/${dateTo}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  public getInvoices(status: string, dateFrom: Date, dateTo: Date): Promise<any> {
    console.log('In service web frontend ' + status + dateFrom + dateTo);

    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/getInvoicesWithStatus/${status}/${dateFrom}/${dateTo}`)
        .then(res => {
          console.log(res.data);
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
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
