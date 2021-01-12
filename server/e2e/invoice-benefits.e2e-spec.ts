import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { InvoiceBenefitsDTO } from '../src/service/dto/invoice-benefits.dto';
import { InvoiceBenefitsService } from '../src/service/invoice-benefits.service';

describe('InvoiceBenefits Controller', () => {
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
            .overrideProvider(InvoiceBenefitsService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all invoice-benefits ', async () => {
        const getEntities: InvoiceBenefitsDTO[] = (
            await request(app.getHttpServer())
                .get('/api/invoice-benefits')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET invoice-benefits by id', async () => {
        const getEntity: InvoiceBenefitsDTO = (
            await request(app.getHttpServer())
                .get('/api/invoice-benefits/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create invoice-benefits', async () => {
        const createdEntity: InvoiceBenefitsDTO = (
            await request(app.getHttpServer())
                .post('/api/invoice-benefits')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update invoice-benefits', async () => {
        const updatedEntity: InvoiceBenefitsDTO = (
            await request(app.getHttpServer())
                .put('/api/invoice-benefits')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE invoice-benefits', async () => {
        const deletedEntity: InvoiceBenefitsDTO = (
            await request(app.getHttpServer())
                .delete('/api/invoice-benefits/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
