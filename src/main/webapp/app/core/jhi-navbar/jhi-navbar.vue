<template>
    <b-navbar class='jh-navbar' toggleable='md' type='dark'>
        <b-navbar-brand b-link class='logo' to='/'>
            <span class='logo-img'></span>
            <span class='navbar-title'>صحتي</span> <span class='navbar-version'>{{ version }}</span>
        </b-navbar-brand>
        <b-navbar-toggle
            aria-expanded='false'
            aria-label='Toggle navigation'
            class='jh-navbar-toggler d-lg-none'
            data-toggle='collapse'
            href='javascript:void(0);'
            right
            target='header-tabs'>
            <font-awesome-icon icon='bars' />
        </b-navbar-toggle>

        <b-collapse id='header-tabs' is-nav>
            <b-navbar-nav class='ml-auto'>
                <b-nav-item exact to='/'>
                    <span>
                        <font-awesome-icon icon='home' />
                        <span>الرئيسية</span>
                    </span>
                </b-nav-item>
                <b-nav-item-dropdown
                    right
                    id='entity-menu'
                    v-if='authenticated'
                    active-class='active' class='pointer'>
                    <span slot="button-content" class="navbar-dropdown-menu">
                        <font-awesome-icon icon="th-list" />
                        <span>العناصر</span>
                    </span>
                    <b-dropdown-item to="/attatchment">
                        <font-awesome-icon icon="asterisk" />
                        <span>Attatchment</span>
                    </b-dropdown-item>
                    <b-dropdown-item to='/benefit'>
                        <font-awesome-icon icon='asterisk' />
                        <span>المنفعات</span>
                    </b-dropdown-item>
                    <b-dropdown-item to='/benefit-request'>
                        <font-awesome-icon icon='asterisk' />
                        <span>طلب منفعة</span>
                    </b-dropdown-item>
                    <b-dropdown-item to='/card'>
                        <font-awesome-icon icon='asterisk' />
                        <span>البطاقات</span>
                    </b-dropdown-item>
                    <b-dropdown-item to='/card-transaction'>
                        <font-awesome-icon icon='asterisk' />
                        <span>حركات البطاقة</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/category">
                        <font-awesome-icon icon="asterisk" />
                        <span>الفئات</span>
                    </b-dropdown-item>
                    <b-dropdown-item to='/company'>
                        <font-awesome-icon icon='asterisk' />
                        <span>الشركات</span>
                    </b-dropdown-item>
                    <b-dropdown-item to='/employee'>
                        <font-awesome-icon icon='asterisk' />
                        <span>الموظفين</span>
                    </b-dropdown-item>
                    <b-dropdown-item to='/hospital'>
                        <font-awesome-icon icon='asterisk' />
                        <span>المستشفيات</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/invoice">
                        <font-awesome-icon icon="asterisk" />
                        <span>الفواتير</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/invoice-benefits">
                        <font-awesome-icon icon="asterisk" />
                        <span>InvoiceBenefits</span>
                    </b-dropdown-item>
                    jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    right
                    id="admin-menu"
                    v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated"
                    :class="{'router-link-active': subIsActive('/admin')}"
                    active-class="active"
                    class="pointer">
                    <span slot="button-content" class="navbar-dropdown-menu">
                        <font-awesome-icon icon="cogs" />
                        <span>المسؤلين</span>
                    </span>
                    <b-dropdown-item to="/admin/user-management" active-class="active">
                        <font-awesome-icon icon="user" />
                        <span>ادارة المسؤلين </span>
                    </b-dropdown-item>
                    <b-dropdown-item active-class='active' to='/admin/docs'>
                        <font-awesome-icon icon='book' />
                        <span>API</span>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    right
                    href="javascript:void(0);"
                    id="account-menu"
                    :class="{'router-link-active': subIsActive('/account')}"
                    active-class="active"
                    class="pointer">
                    <span slot="button-content" class="navbar-dropdown-menu">
                        <font-awesome-icon icon="user" />
                        <span>
                            الحساب
                        </span>
                    </span>
                    <b-dropdown-item to="/account/settings" tag="b-dropdown-item" v-if="authenticated" active-class="active">
                        <font-awesome-icon icon="wrench" />
                        <span>الاعدادات</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/account/password" tag="b-dropdown-item" v-if="authenticated" active-class="active">
                        <font-awesome-icon icon="lock" />
                        <span>الرقم السري</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="authenticated"  v-on:click="logout()" id="logout" active-class="active">
                        <font-awesome-icon icon="sign-out-alt" />
                        <span>تسجيل الخروج</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="!authenticated"  v-on:click="openLogin()" id="login" active-class="active">
                        <font-awesome-icon icon="sign-in-alt" />
                        <span> تسجيل الدخول</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/register" tag="b-dropdown-item" id="register" v-if="!authenticated" active-class="active">
                        <font-awesome-icon icon="user-plus" />
                        <span>تسجيل حساب جديد</span>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
             <b-button v-b-toggle.sidebar-1 >
                <font-awesome-icon icon="bars" />
            </b-button>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ==========================================================================
    Navbar
    ========================================================================== */
.navbar-version {
  font-size: 10px;
  color: #ccc;
}

.jh-navbar {
  background-color: #353d47;
  padding: 0.2em 1em;
}

.jh-navbar .profile-image {
  margin: -10px 0px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.jh-navbar .dropdown-item.active,
.jh-navbar .dropdown-item.active:focus,
.jh-navbar .dropdown-item.active:hover {
  background-color: #353d47;
}

.jh-navbar .dropdown-toggle::after {
  margin-left: 0.15em;
}

.jh-navbar ul.navbar-nav {
  padding: 0.5em;
}

.jh-navbar .navbar-nav .nav-item {
  margin-left: 1.5rem;
}

.jh-navbar a.nav-link {
  font-weight: 400;
}

.jh-navbar .jh-navbar-toggler {
  color: #ccc;
  font-size: 1.5em;
  padding: 10px;
}

.jh-navbar .jh-navbar-toggler:hover {
  color: #fff;
}

@media screen and (min-width: 768px) {
  .jh-navbar-toggler {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 1150px) {
  span span{
    display:none;
  }
}

.navbar-title {
  display: inline-block;
  vertical-align: middle;
  color: white;
}

/* ==========================================================================
    Logo styles
    ========================================================================== */
.navbar-brand.logo {
  padding: 5px 15px;
}

.logo .logo-img {
  height: 45px;
  display: inline-block;
  vertical-align: middle;
  width: 70px;
}

.logo-img {
  height: 100%;
  background: url("../../../content/images/sahati-logo.gif") no-repeat center
    center;
  background-size: contain;
  width: 100%;
  filter: drop-shadow(0 0 0.05rem white);
}

</style>
