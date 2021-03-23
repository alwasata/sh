"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class SeedUsersRoles1570200490072 {
    constructor() {
        this.role1 = { name: 'ROLE_ADMIN' };
        this.role2 = { name: 'ROLE_USER' };
        this.role3 = { name: 'ROLE_HOSPITAL_ADMIN' };
        this.role4 = { name: 'ROLE_COMPANY_ADMIN' };
        this.user1 = {
            login: 'system',
            password: 'system',
            firstName: 'System',
            lastName: 'System',
            email: 'system@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: null,
            lastModifiedBy: 'system',
        };
        this.user2 = {
            login: 'anonymoususer',
            password: 'anonymoususer',
            firstName: 'Anonymous',
            lastName: 'User',
            email: 'anonymoususer@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: null,
            lastModifiedBy: 'system',
        };
        this.user3 = {
            login: 'admin',
            password: 'admin',
            firstName: 'Administrator',
            lastName: 'Administrator',
            email: 'admin@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: null,
            lastModifiedBy: 'system',
        };
        this.user4 = {
            login: 'user',
            password: 'user',
            firstName: 'User',
            lastName: 'User',
            email: 'user@localhost.it',
            imageUrl: '',
            activated: true,
            langKey: 'en',
            createdBy: null,
            lastModifiedBy: 'system',
        };
    }
    // eslint-disable-next-line
    async up(queryRunner) {
        const authorityRepository = typeorm_1.getRepository('nhi_authority');
        const adminRole = await authorityRepository.save(this.role1);
        const userRole = await authorityRepository.save(this.role2);
        const hospitalAdminRole = await authorityRepository.save(this.role3);
        const companyAdminRole = await authorityRepository.save(this.role4);
        const userRepository = typeorm_1.getRepository('nhi_user');
        this.user1.authorities = [adminRole, userRole];
        this.user3.authorities = [adminRole, userRole];
        this.user4.authorities = [userRole, hospitalAdminRole, companyAdminRole];
        await userRepository.save([this.user1, this.user2, this.user3, this.user4]);
    }
    // eslint-disable-next-line
    async down(queryRunner) { }
}
exports.SeedUsersRoles1570200490072 = SeedUsersRoles1570200490072;
//# sourceMappingURL=1570200490072-SeedUsersRoles.js.map