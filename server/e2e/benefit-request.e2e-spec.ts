import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { BenefitRequestDTO } from '../src/service/dto/benefit-request.dto';
import { BenefitRequestService } from '../src/service/benefit-request.service';

describe('BenefitRequest Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(BenefitRequestService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all benefit-requests ', async () => {
        const getEntities: BenefitRequestDTO[] = (
            await request(app.getHttpServer())
                .get('/api/benefit-requests')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET benefit-requests by id', async () => {
        const getEntity: BenefitRequestDTO = (
            await request(app.getHttpServer())
                .get('/api/benefit-requests/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create benefit-requests', async () => {
        const createdEntity: BenefitRequestDTO = (
            await request(app.getHttpServer())
                .post('/api/benefit-requests')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update benefit-requests', async () => {
        const updatedEntity: BenefitRequestDTO = (
            await request(app.getHttpServer())
                .put('/api/benefit-requests')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE benefit-requests', async () => {
        const deletedEntity: BenefitRequestDTO = (
            await request(app.getHttpServer())
                .delete('/api/benefit-requests/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
