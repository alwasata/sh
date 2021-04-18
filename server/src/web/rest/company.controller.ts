import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request, response } from 'express';
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
  @Roles(RoleType.COMPANY_ADMIN, RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CompanyDTO,
  })
  async getAll(@Req() req: Request): Promise<CompanyDTO[]> {
    if(req.user["authorities"].includes('ROLE_COMPANY_ADMIN') == true) {
      return [];
    }
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
  @Roles(RoleType.ADMIN)
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
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async post(@Req() req: Request, @Body() companyDTO: CompanyDTO): Promise<CompanyDTO> {

    const userDTO =   new UserDTO();
    userDTO.firstName   = companyDTO['nameAr'];
    userDTO.lastName    = companyDTO['nameEn'];
    userDTO.email       = companyDTO['email'];
    userDTO.login       = companyDTO['nameEn'];
    userDTO.password    = companyDTO['nameEn'];
    userDTO.activated   = companyDTO.active;
    userDTO.authorities = [RoleType.COMPANY_ADMIN, RoleType.USER];
    try {
      const createdUser = await this.userService.save(userDTO);
      companyDTO.users  = [ createdUser ];
      companyDTO.createdBy =req.user["id"];
      const created = await this.companyService.save(companyDTO);
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Company', created.id);
      return created;
    } catch (error) {
      return error;
    }
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
    try {

      companyDTO.lastModifiedBy =req.user["id"];
      var userCompany = await this.companyService.findById(companyDTO.id);
      var userDto = new UserDTO();
      userDto.id = userCompany.users[0].id;
      userDto.activated = companyDTO.active;
      await this.userService.update(userDto);
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Company', companyDTO.id);
      return await this.companyService.update(companyDTO);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete('/:id/:status')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete company' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: string,  @Param('status') status: boolean): Promise<CompanyDTO> {
    var companyDTO = new CompanyDTO();
    companyDTO.id = id;
    companyDTO.active = status;
    // await this.userService.save(userDTO);
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Company', id);
    return await this.companyService.update(companyDTO);
  }
}
