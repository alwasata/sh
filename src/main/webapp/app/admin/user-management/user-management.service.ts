import axios from 'axios';
import Vue from 'vue';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { Authority } from '@/shared/security/authority';

export default class UserManagementService {
  public get(userId: number): Promise<any> {
    return axios.get(`api/users/${userId}`);
  }

  public create(user): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post('api/users', user)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(user): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .put('api/users', user)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public remove(userId: number): Promise<any> {
    return axios.delete(`api/users/${userId}`);
  }

  public retrieve(req?: any): Promise<any> {
    return axios.get(`api/users?${buildPaginationQueryOpts(req)}`);
  }

  public retrieveAuthorities(): Promise<any> {
    return axios.get('api/users/authorities');
  }
}
