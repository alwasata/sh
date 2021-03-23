import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { BenefitRequestDTO } from '../../service/dto/benefit-request.dto';
import { BenefitRequestService } from '../../service/benefit-request.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { BenefitStatus } from '../../domain/enumeration/benefit-status';
import { HospitalService } from '../../service/hospital.service';

@Controller('api/benefit-requests')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('benefit-requests')
export class BenefitRequestController {
  logger = new Logger('BenefitRequestController');

  constructor(
    private readonly benefitRequestService: BenefitRequestService,
    private readonly hospitalService: HospitalService
    ) {}

    @Get('/')
    @Roles(RoleType.ADMIN)
    @ApiResponse({
      status: 200,
      description: 'List all records',
      type: BenefitRequestDTO,
    })
    async getAll(@Req() req: Request): Promise<BenefitRequestDTO[]> {
      const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
      var hospital;
      if(req.user["authorities"].includes('ROLE_ADMIN') == true) {
        hospital = "all";
      } else {
        hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        hospital = hospital["hospital_id"];
      }
      const [results, count] = await this.benefitRequestService.findAndCount(hospital,{
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
      type: BenefitRequestDTO,
    })
    async getOne(@Param('id') id: string): Promise<BenefitRequestDTO> {
      return await this.benefitRequestService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create benefitRequest' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: BenefitRequestDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() benefitRequestDTO: BenefitRequestDTO): Promise<BenefitRequestDTO> {
      const value = process.env.POINT_COST;
      // benefitRequestDTO.pointsCost = (benefitRequestDTO.cost * value);
      benefitRequestDTO.benefitStatus = BenefitStatus.PENDING;

      if(req.user["authorities"].includes('ROLE_HOSPITAL_ADMIN') == true) {
        var hospital_id = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
        var hospital = await this.hospitalService.findById(hospital_id["hospital_id"]);
        benefitRequestDTO.hospital = hospital;
      }
      const created = await this.benefitRequestService.save(benefitRequestDTO);
      HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', created.id);
      return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update benefitRequest' })
    @ApiResponse({
      status: 200,
      description: 'The record has been successfully updated.',
      type: BenefitRequestDTO,
    })
    @ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: "Benefit Request Can't be modified.",
      type: {
        statusCode: HttpStatus.FORBIDDEN,
        Message: "Benefit Request Can't be modified."
      },
    })
    async put(@Req() req: Request, @Body() benefitRequestDTO: BenefitRequestDTO): Promise<BenefitRequestDTO> {
      // you can't modify Benefit Request if its not in PENDING status
      // if (benefitRequestDTO.benefitStatus == BenefitStatus.PENDING) {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', benefitRequestDTO.id);

        const value = process.env.POINT_COST;
        // benefitRequestDTO.pointsCost = (benefitRequestDTO.cost * value);
        // benefitRequestDTO.benefitStatus = BenefitStatus.PENDING;

        return await this.benefitRequestService.update(benefitRequestDTO);
      // }
      throw new HttpException("Benefit Request Can't be modified.", HttpStatus.FORBIDDEN);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete benefitRequest' })
    @ApiResponse({
      status: 204,
      description: 'The record has been successfully deleted.',
    })
    @ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: "Benefit Request Can't be deleted.",
      type: {
        statusCode: HttpStatus.FORBIDDEN,
        Message: "Benefit Request Can't be deleted."
      },
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
      const benefitRequestDTO: BenefitRequestDTO = await this.benefitRequestService.findById(id);

      // you can't modify Benefit Request if its not in PENDING status
      if (benefitRequestDTO.benefitStatus == BenefitStatus.PENDING) {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'BenefitRequest', id);
        return await this.benefitRequestService.deleteById(id);
      }
      throw new HttpException("Benefit Request Can't be deleted.", HttpStatus.FORBIDDEN);
    }
  }
