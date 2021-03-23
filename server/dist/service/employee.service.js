"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_mapper_1 = require("../service/mapper/employee.mapper");
const employee_repository_1 = require("../repository/employee.repository");
const relationshipNames = [];
relationshipNames.push('company');
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.logger = new common_1.Logger('EmployeeService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.employeeRepository.findOne(id, options);
        return employee_mapper_1.EmployeeMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.employeeRepository.findOne(options);
        return employee_mapper_1.EmployeeMapper.fromEntityToDTO(result);
    }
    async findAndCount(company_id, options) {
        options.relations = relationshipNames;
        var resultList = [][0];
        if (company_id == "all") {
            resultList = await this.employeeRepository.findAndCount(options);
        }
        else {
            resultList = await this.employeeRepository.createQueryBuilder('employee')
                .innerJoinAndSelect('employee.company', 'company')
                .where('company.id = :id', { id: company_id })
                .getManyAndCount();
        }
        const employeeDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(employee => employeeDTO.push(employee_mapper_1.EmployeeMapper.fromEntityToDTO(employee)));
            resultList[0] = employeeDTO;
        }
        return resultList;
    }
    async save(employeeDTO) {
        const entity = employee_mapper_1.EmployeeMapper.fromDTOtoEntity(employeeDTO);
        const result = await this.employeeRepository.save(entity);
        return employee_mapper_1.EmployeeMapper.fromEntityToDTO(result);
    }
    async update(employeeDTO) {
        const entity = employee_mapper_1.EmployeeMapper.fromDTOtoEntity(employeeDTO);
        const result = await this.employeeRepository.save(entity);
        return employee_mapper_1.EmployeeMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.employeeRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
EmployeeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(employee_repository_1.EmployeeRepository)),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map