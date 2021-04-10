import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { EmployeeDTO } from '../../service/dto/employee.dto';
import { EmployeeService } from '../../service/employee.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { CompanyService } from '../../service/company.service';
@Controller('api/employees')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('employees')
export class EmployeeController {
  logger = new Logger('EmployeeController');

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService
    ) {}

    @Get('/')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: EmployeeDTO,
    })
    async getAll(@Req() req: Request): Promise<EmployeeDTO[]> {
      var company;
      if(req.user["authorities"].includes('ROLE_ADMIN') == true) {
        company = "all";
      } else {
        company = await this.companyService.getCompanyIdForUser(req.user["id"]);
        company = company["company_id"];
      }
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      const [results, count] = await this.employeeService.findAndCount(company,{
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
      return results;
    }

    @Get('/:id')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: EmployeeDTO,
    })
    async getOne(@Param('id') id: string): Promise<EmployeeDTO> {
      return await this.employeeService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Create employee' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: EmployeeDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
      employeeDTO.createdBy =req.user["id"];
      if(req.user["authorities"].includes('ROLE_COMPANY_ADMIN') == true) {
        var company = await this.companyService.getCompanyIdForUser(req.user["id"]);
        var company_id = await this.companyService.findById(company["company_id"]);
        employeeDTO.company = company_id;
      }
      const created = await this.employeeService.save(employeeDTO);
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Employee', created.id);
      return created;
    }

    @Put('/')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Update employee'})
    @ApiResponse({
      status: 200,
      description: 'The record has been successfully updated.',
      type: EmployeeDTO,
    })
    async put(@Req() req: Request, @Body() employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
      employeeDTO.lastModifiedBy =req.user["id"];
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Employee', employeeDTO.id);
      return await this.employeeService.update(employeeDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Delete employee' })
    @ApiResponse({
      status: 204,
      description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
      HeaderUtil.addEntityDeletedHeaders(req.res, 'Employee', id);
      return await this.employeeService.deleteById(id);
    }
  }
