import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { CompanyDTO } from '../../service/dto/company.dto';
import { CompanyService } from '../../service/company.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserDTO } from '../../service/dto/user.dto';
import { UserService } from '../../service/user.service';
@Controller('api/companies')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('companies')
export class CompanyController {
    logger = new Logger('CompanyController');

    constructor(private readonly companyService: CompanyService, private readonly userService : UserService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CompanyDTO,
    })
    async getAll(@Req() req: Request): Promise<CompanyDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.companyService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: CompanyDTO,
    })
    async getOne(@Param('id') id: string): Promise<CompanyDTO> {
        return await this.companyService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create company' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CompanyDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() companyDTO: CompanyDTO): Promise<CompanyDTO> {

      const userDTO =   new UserDTO();
      userDTO.firstName   = companyDTO['nameAr'];
      userDTO.lastName    = companyDTO['nameEn'];
      userDTO.email       = companyDTO['nameEn']+'@hospital.com';
      userDTO.login       = companyDTO['nameEn'];
      userDTO.password    = companyDTO['nameEn'];
      userDTO.authorities = ["ROLE_COMPANY_ADMIN"];

      const createduser     = await this.userService.save(userDTO);
      companyDTO["users"]  = [ createduser ];

        const created = await this.companyService.save(companyDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Company', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update company' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CompanyDTO,
    })
    async put(@Req() req: Request, @Body() companyDTO: CompanyDTO): Promise<CompanyDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Company', companyDTO.id);
        return await this.companyService.update(companyDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete company' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Company', id);
        return await this.companyService.deleteById(id);
    }
}
