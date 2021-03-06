import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Attatchment = () => import('@/entities/attatchment/attatchment.vue');
// prettier-ignore
const AttatchmentUpdate = () => import('@/entities/attatchment/attatchment-update.vue');
// prettier-ignore
const AttatchmentDetails = () => import('@/entities/attatchment/attatchment-details.vue');
// prettier-ignore
const Benefit = () => import('@/entities/benefit/benefit.vue');
// prettier-ignore
const BenefitUpdate = () => import('@/entities/benefit/benefit-update.vue');
// prettier-ignore
const BenefitDetails = () => import('@/entities/benefit/benefit-details.vue');
// prettier-ignore
const BenefitRequest = () => import('@/entities/benefit-request/benefit-request.vue');
// prettier-ignore
const BenefitRequestUpdate = () => import('@/entities/benefit-request/benefit-request-update.vue');
// prettier-ignore
const BenefitRequestDetails = () => import('@/entities/benefit-request/benefit-request-details.vue');
// prettier-ignore
const Card = () => import('@/entities/card/card.vue');
// prettier-ignore
const CardUpdate = () => import('@/entities/card/card-update.vue');
// prettier-ignore
const CardDetails = () => import('@/entities/card/card-details.vue');
// prettier-ignore
const CardTransaction = () => import('@/entities/card-transaction/card-transaction.vue');
// charge
const CardCharge = () => import('@/entities/card/card-charge.vue');
// prettier-ignore
const CardTransactionUpdate = () => import('@/entities/card-transaction/card-transaction-update.vue');
// prettier-ignore
const CardTransactionDetails = () => import('@/entities/card-transaction/card-transaction-details.vue');
// prettier-ignore
const Category = () => import('@/entities/category/category.vue');
// prettier-ignore
const CategoryUpdate = () => import('@/entities/category/category-update.vue');
// prettier-ignore
const CategoryDetails = () => import('@/entities/category/category-details.vue');
// prettier-ignore
const Company = () => import('@/entities/company/company.vue');
// prettier-ignore
const CompanyUpdate = () => import('@/entities/company/company-update.vue');
// prettier-ignore
const CompanyDetails = () => import('@/entities/company/company-details.vue');
// prettier-ignore
const Employee = () => import('@/entities/employee/employee.vue');
// prettier-ignore
const EmployeeUpdate = () => import('@/entities/employee/employee-update.vue');
// prettier-ignore
const EmployeeDetails = () => import('@/entities/employee/employee-details.vue');
// prettier-ignore
const Hospital = () => import('@/entities/hospital/hospital.vue');
// prettier-ignore
const HospitalUpdate = () => import('@/entities/hospital/hospital-update.vue');
// prettier-ignore
const HospitalDetails = () => import('@/entities/hospital/hospital-details.vue');
// prettier-ignore
const Invoice = () => import('@/entities/invoice/invoice.vue');
// prettier-ignore
const InvoiceUpdate = () => import('@/entities/invoice/invoice-update.vue');
// prettier-ignore
const InvoiceReturn = () => import('@/entities/invoice/invoice-return.vue');
// prettier-ignore
const InvoiceDetails = () => import('@/entities/invoice/invoice-details.vue');
// prettier-ignore
const InvoiceBenefits = () => import('@/entities/invoice-benefits/invoice-benefits.vue');
// prettier-ignore
const InvoiceBenefitsUpdate = () => import('@/entities/invoice-benefits/invoice-benefits-update.vue');
// prettier-ignore
const InvoiceBenefitsDetails = () => import('@/entities/invoice-benefits/invoice-benefits-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/attatchment',
    name: 'Attatchment',
    component: Attatchment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/attatchment/new',
    name: 'AttatchmentCreate',
    component: AttatchmentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/attatchment/:attatchmentId/edit',
    name: 'AttatchmentEdit',
    component: AttatchmentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/attatchment/:attatchmentId/view',
    name: 'AttatchmentView',
    component: AttatchmentDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/benefit',
    name: 'Benefit',
    component: Benefit,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },
  {
    path: '/benefit/new',
    name: 'BenefitCreate',
    component: BenefitUpdate,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },
  {
    path: '/benefit/:benefitId/edit',
    name: 'BenefitEdit',
    component: BenefitUpdate,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },
  {
    path: '/benefit/:benefitId/view',
    name: 'BenefitView',
    component: BenefitDetails,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },

  {
    path: '/benefit-request',
    name: 'BenefitRequest',
    component: BenefitRequest,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/benefit-request/new',
    name: 'BenefitRequestCreate',
    component: BenefitRequestUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/benefit-request/:benefitRequestId/edit',
    name: 'BenefitRequestEdit',
    component: BenefitRequestUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/benefit-request/:benefitRequestId/view',
    name: 'BenefitRequestView',
    component: BenefitRequestDetails,
    meta: { authorities: [Authority.ADMIN] },
  },

  {
    path: '/card',
    name: 'Card',
    component: Card,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/card/new',
    name: 'CardCreate',
    component: CardUpdate,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/card/:cardId/edit',
    name: 'CardEdit',
    component: CardUpdate,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/card/:cardId/view',
    name: 'CardView',
    component: CardDetails,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/card/:cardId/charge',
    name: 'CardCharge',
    component: CardCharge,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },

  {
    path: '/card-transaction',
    name: 'CardTransaction',
    component: CardTransaction,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/card-transaction/new',
    name: 'CardTransactionCreate',
    component: CardTransactionUpdate,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/card-transaction/:cardTransactionId/edit',
    name: 'CardTransactionEdit',
    component: CardTransactionUpdate,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/card-transaction/:cardTransactionId/view',
    name: 'CardTransactionView',
    component: CardTransactionDetails,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },

  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },
  {
    path: '/category/new',
    name: 'CategoryCreate',
    component: CategoryUpdate,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },
  {
    path: '/category/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryUpdate,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },
  {
    path: '/category/:categoryId/view',
    name: 'CategoryView',
    component: CategoryDetails,
    meta: { authorities: [Authority.ADMIN, Authority.HOSPITAL_ADMIN] },
  },

  {
    path: '/company',
    name: 'Company',
    component: Company,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/company/new',
    name: 'CompanyCreate',
    component: CompanyUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/company/:companyId/edit',
    name: 'CompanyEdit',
    component: CompanyUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/company/:companyId/view',
    name: 'CompanyView',
    component: CompanyDetails,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },

  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/employee/new',
    name: 'EmployeeCreate',
    component: EmployeeUpdate,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/employee/:employeeId/edit',
    name: 'EmployeeEdit',
    component: EmployeeUpdate,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },
  {
    path: '/employee/:employeeId/view',
    name: 'EmployeeView',
    component: EmployeeDetails,
    meta: { authorities: [Authority.COMPANY_ADMIN, Authority.ADMIN] },
  },

  {
    path: '/hospital',
    name: 'Hospital',
    component: Hospital,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/hospital/new',
    name: 'HospitalCreate',
    component: HospitalUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/hospital/:hospitalId/edit',
    name: 'HospitalEdit',
    component: HospitalUpdate,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/hospital/:hospitalId/view',
    name: 'HospitalView',
    component: HospitalDetails,
    meta: { authorities: [Authority.ADMIN] },
  },

  {
    path: '/invoice',
    name: 'Invoice',
    component: Invoice,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice/new',
    name: 'InvoiceCreate',
    component: InvoiceUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice/:invoiceId/edit',
    name: 'InvoiceEdit',
    component: InvoiceUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice/:invoiceId/return',
    name: 'InvoiceReturn',
    component: InvoiceReturn,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice/:invoiceId/view',
    name: 'InvoiceView',
    component: InvoiceDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/invoice-benefits',
    name: 'InvoiceBenefits',
    component: InvoiceBenefits,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice-benefits/new',
    name: 'InvoiceBenefitsCreate',
    component: InvoiceBenefitsUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice-benefits/:invoiceBenefitsId/edit',
    name: 'InvoiceBenefitsEdit',
    component: InvoiceBenefitsUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice-benefits/:invoiceBenefitsId/view',
    name: 'InvoiceBenefitsView',
    component: InvoiceBenefitsDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
