import axios from 'axios';
import { Store } from 'vuex';
import VueRouter from 'vue-router';

export default class AccountService {
  constructor(private store: Store<any>, private router: VueRouter) {
    this.init();
  }

  public init(): void {
    this.retrieveProfiles();
  }

  public retrieveProfiles(): void {
    axios.get('management/info').then(res => {
      if (res.data && res.data.activeProfiles) {
        this.store.commit('setRibbonOnProfiles', res.data['display-ribbon-on-profiles']);
        this.store.commit('setActiveProfiles', res.data['activeProfiles']);
      }
    });
  }

  public retrieveAccount(): Promise<boolean> {
    return new Promise(resolve => {
      axios
        .get('api/account')
        .then(response => {
          this.store.commit('authenticate');
          const account = response.data;
          if (account) {
            this.store.commit('authenticated', account);
            if (sessionStorage.getItem('requested-url')) {
              this.router.replace(sessionStorage.getItem('requested-url'));
              sessionStorage.removeItem('requested-url');
            }
          } else {
            this.store.commit('logout');
            this.router.push('/');
            sessionStorage.removeItem('requested-url');
          }
          resolve(true);
        })
        .catch(() => {
          this.store.commit('logout');
          resolve(false);
        });
    });
  }

  public hasAnyAuthorityAndCheckAuth(authorities: any): Promise<boolean> {
    if (typeof authorities === 'string') {
      authorities = [authorities];
    }

    if (!this.authenticated || !this.userAuthorities) {
      const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
      if (!this.store.getters.account && !this.store.getters.logon && token) {
        return this.retrieveAccount();
      } else {
        return new Promise(resolve => {
          resolve(false);
        });
      }
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this.userAuthorities.includes(authorities[i])) {
        return new Promise(resolve => {
          resolve(true);
        });
      }
    }

    return new Promise(resolve => {
      resolve(false);
    });
  }

  public getAuthorities(): boolean {
    return this.store.getters.account;
  }
  public get authenticated(): boolean {
    return this.store.getters.authenticated;
  }

  public get userAuthorities(): any {
    return this.store.getters.account.authorities;
  }

  public hasRole(roles: any): Promise<boolean> {
    if (this.store.getters.account == null) {
      return new Promise(resolve => {
        resolve(false);
      });
    }
    var userAuth = this.store.getters.account.authorities;
    for (const element of roles) {
      if (userAuth[0].includes(element) || userAuth[1].includes(element)) {
        return new Promise(resolve => {
          resolve(true);
        });
      }
    }
    return new Promise(resolve => {
      resolve(false);
    });
  }
}
