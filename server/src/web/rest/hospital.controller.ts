import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { HospitalDTO } from '../../service/dto/hospital.dto';
import { HospitalService } from '../../service/hospital.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserDTO } from '../../service/dto/user.dto';
import { UserService } from '../../service/user.service';
@Controller('api/hospitals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('hospitals')

export class HospitalController{
  logger = new Logger('HospitalController');

  constructor(private readonly hospitalService: HospitalService, private readonly userService : UserService) {}

  @Get('/:search')
  @Roles(RoleType.ADMIN, RoleType.HOSPITAL_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: HospitalDTO,
  })
  async getAll(@Req() req: Request, @Param('search') search: string): Promise<HospitalDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.hospitalService.findAndCount(search,{
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/active/hospital')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: HospitalDTO,
  })
  async getActive(@Req() req: Request): Promise<HospitalDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.hospitalService.findAndCount("false",{
      // where : {active : 1},
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/find/:id')
  @Roles(RoleType.ADMIN , RoleType.HOSPITAL_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: HospitalDTO,
  })
  async getOne(@Param('id') id: string): Promise<HospitalDTO> {
    return await this.hospitalService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create hospital' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: HospitalDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })

  async post(@Req() req: Request, @Body() hospitalDTO: HospitalDTO): Promise<any> {
    try{
      const userDTO =   new UserDTO();
      userDTO.firstName   = hospitalDTO['nameAr'];
      userDTO.lastName    = hospitalDTO['nameEn'];
      userDTO.email       = hospitalDTO['email'];
      userDTO.login       = hospitalDTO['nameEn'];
      userDTO.password    = hospitalDTO['nameEn'];
      userDTO.activated   = true;
      userDTO.authorities = [RoleType.HOSPITAL_ADMIN, RoleType.USER];

      const createdUser = await this.userService.save(userDTO);
      hospitalDTO.users  = [ createdUser ];
      hospitalDTO.createdBy =req.user["id"];
      const created = await this.hospitalService.save(hospitalDTO);
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Hospital', created.id);
      return created;
    }catch(error){
      console.log(error)
      return error;
    }
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update hospital' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: HospitalDTO,
  })
  async put(@Req() req: Request, @Body() hospitalDTO: HospitalDTO): Promise<any> {
    try{
      var userHospital = await this.hospitalService.findById(hospitalDTO.id);
      var userDto = new UserDTO();
      userDto.id = userHospital.users[0].id;
      userDto.activated = hospitalDTO.active;
      await this.userService.update(userDto);

      hospitalDTO.lastModifiedBy =req.user["id"];
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Hospital', hospitalDTO.id);
      return await this.hospitalService.update(hospitalDTO);
    }catch(error){
      return error;
    }
  }

  @Delete('/:id/:status')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete hospital' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: string,  @Param('status') status: boolean): Promise<HospitalDTO> {
    var hospitalDTO = new HospitalDTO();
    hospitalDTO.id = id;
    hospitalDTO.active = status;
    console.log(hospitalDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Hospital', hospitalDTO.id);
    return await this.hospitalService.update(hospitalDTO);
  }

}
