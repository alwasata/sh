import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BenefitDTO } from '../../service/dto/benefit.dto';
import { BenefitService } from '../../service/benefit.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { HospitalService } from '../../service/hospital.service';
import { BenefitRequestService } from '../../service/benefit-request.service';
import { BenefitRequestDTO } from '../../service/dto/benefit-request.dto';
import { BenefitStatus } from '../../domain/enumeration/benefit-status';

@Controller('api/benefits')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('benefits')
export class BenefitController {
  logger = new Logger('BenefitController');

  constructor(
    private readonly benefitService: BenefitService,
    private readonly hospitalService: HospitalService,
    private readonly benefitRequestService: BenefitRequestService
    ) {}

    @Get('/:search')
    @Roles(RoleType.HOSPITAL_ADMIN, RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: BenefitDTO,
    })
    async getAll(@Req() req: Request, @Param('search') search: string): Promise<BenefitDTO[]> {

      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital;
      if(req.user["authorities"].includes('ROLE_ADMIN') == true) {
        hospital = "all";
      } else {
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        hospital = hospital["hospital_id"];
      }
      const [results, count] = await this.benefitService.findAndCount(search,hospital,{
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });

      HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
      return results;
    }

    @Get('/find/:id')
    @Roles(RoleType.HOSPITAL_ADMIN, RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: BenefitDTO,
    })
    async getOne(@Param('id') id: string): Promise<BenefitDTO> {
      console.log(id)
      return await this.benefitService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.HOSPITAL_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Create benefit' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: BenefitDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() benefitDTO: BenefitDTO): Promise<any> {

      try {
      if (req.user["authorities"].includes('ROLE_HOSPITAL_ADMIN') === true) {
        var hospital_id = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        var hospital = await this.hospitalService.findById(hospital_id["hospital_id"]);
        benefitDTO.hospital = hospital;
      }
        benefitDTO.createdBy = req.user["id"];
        const created = await this.benefitService.save(benefitDTO);
        const benefitRequestDTO = new BenefitRequestDTO();
        benefitRequestDTO.nameAr = benefitDTO.nameAr;
        benefitRequestDTO.nameEn = benefitDTO.nameEn;
        benefitRequestDTO.createdBy = req.user["id"];
        benefitRequestDTO.cost = benefitDTO.cost;
        benefitRequestDTO.hospital = benefitDTO.hospital;
        benefitRequestDTO.category = benefitDTO.category;
        benefitRequestDTO.notes = "تم اضافة هده المنفعة";
        benefitRequestDTO.benefit = created;
        await this.benefitRequestService.save(benefitRequestDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', created.id);
        return created;
      }catch(error){
        return error;
      }
    }

    @Put('/')
    @Roles(RoleType.HOSPITAL_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Update benefit' })
    @ApiResponse({
      status: 200,
      description: 'The record has been successfully updated.',
      type: BenefitDTO,
    })
    async put(@Req() req: Request, @Body() benefitDTO: BenefitDTO): Promise<BenefitDTO> {
      // benefitDTO.pointsCost = benefitDTO.cost*1.1;

      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var benefitRequestDTO = new BenefitRequestDTO();
      benefitRequestDTO.benefit = benefitDTO;
      const [results, count] = await this.benefitRequestService.findAndCount("false","all",{
        where: {benefit : benefitDTO},
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder(),
      });
      try{
        benefitRequestDTO = results[0];
        if(benefitRequestDTO.cost != benefitDTO.cost) {
          benefitRequestDTO.lastModifiedBy = req.user["id"];
          benefitRequestDTO.notes = "تم تعديل المنفعة من"+benefitRequestDTO.cost+"الى "+benefitDTO.cost;
          benefitRequestDTO.cost = benefitDTO.cost;
          benefitRequestDTO.benefitStatus = BenefitStatus.PENDING;
          await this.benefitRequestService.update(benefitRequestDTO);
        }
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', benefitDTO.id);
        return await this.benefitService.update(benefitDTO);
      }catch(error){
        return error;
      }
    }

    @Delete('/:id')
    @Roles(RoleType.HOSPITAL_ADMIN, RoleType.ADMIN)
    @ApiOperation({ title: 'Delete benefit' })
    @ApiResponse({
      status: 204,
      description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
      HeaderUtil.addEntityDeletedHeaders(req.res, 'Benefit', id);
      return await this.benefitService.deleteById(id);
    }
  }
