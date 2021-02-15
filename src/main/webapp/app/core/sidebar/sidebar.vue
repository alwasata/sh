<template>
    <div>
        <b-sidebar id='sidebar-1' name='sidebar' no-close-on-backdrop left shadow title='صحتي' >
            <div class="sidebar-sticky">
            <!-- <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>

            </ul> -->
            <!-- <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>العناصر</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Current month
                </a>
              </li>
            </ul> -->

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>العناصر</span>
                <font-awesome-icon icon='th-list' />
            </h6>
            <ul class="nav flex-column">
                    <li class='nav-item' >
                        <router-link class='nav-link' to='/benefit'>
                            <font-awesome-icon icon='asterisk' />
                            <span>المنفعات</span>
                        </router-link>
                    </li>
                    <li class='nav-item'>
                        <router-link class='nav-link' to='/benefit-request'>
                            <font-awesome-icon icon='asterisk' />
                            <span>طلب منفعة</span>
                        </router-link>
                    </li>
                    <li class='nav-item'>
                        <router-link class='nav-link' to='/card'>
                            <font-awesome-icon icon='asterisk' />
                            <span>البطاقات</span>
                        </router-link>
                    </li>
                    <li class='nav-item'>
                        <router-link class='nav-link' to='/card-transaction'>
                            <font-awesome-icon icon='asterisk' />
                            <span>حركات البطاقة</span>
                        </router-link>
                    </li>
                    <li class='nav-item'>
                        <router-link class='nav-link' to='/category'>
                            <font-awesome-icon icon='asterisk' />
                            <span>الفئات</span>
                        </router-link>
                    </li>
                    <li class='nav-item' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <router-link class='nav-link' to='/company'>
                            <font-awesome-icon icon='asterisk' />
                            <span>الشركات</span>
                        </router-link>
                    </li>

                    <li class='nav-item' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <router-link class='nav-link' to='/employee'>
                            <font-awesome-icon icon='asterisk' />
                            <span>الموظفين</span>
                        </router-link>
                    </li>
                    <li class='nav-item' v-if="hasAnyAuthority('ROLE_ADMIN')">
                        <router-link class='nav-link'  to='/hospital'>
                            <font-awesome-icon icon='asterisk' />
                            <span>المستشفيات</span>
                        </router-link>
                    </li>
                    <li class='nav-item'>
                        <router-link class='nav-link' to='/invoice'>
                            <font-awesome-icon icon='asterisk' />
                            <span>الفواتير</span>
                        </router-link>
                    </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>المسؤولين</span>
                <font-awesome-icon icon="cogs" />
            </h6>
            <ul class="nav flex-column mb-2">
                <li class="nav-item">
                    <router-link class='nav-link' to="/admin/user-management">
                        <font-awesome-icon icon="user" />
                        <span>ادارة المسؤلين </span>
                    </router-link>
                </li>
                <li class="nav-item"></li>
                <router-link class='nav-link' to='/admin/docs'>
                    <font-awesome-icon icon='book' />
                    <span>API</span>
                </router-link>
            </ul>
          </div>
        </b-sidebar>
    </div>
</template>
<script lang="ts" src="./sidebar.component.ts">
</script>
<style scoped>
    a {
        color: #333;
    }
    a:hover {
        color: black;
    }
</style>
