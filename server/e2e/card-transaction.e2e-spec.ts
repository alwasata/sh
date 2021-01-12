import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CardTransactionDTO } from '../src/service/dto/card-transaction.dto';
import { CardTransactionService } from '../src/service/card-transaction.service';

describe('CardTransaction Controller', () => {
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
            .overrideProvider(CardTransactionService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all card-transactions ', async () => {
        const getEntities: CardTransactionDTO[] = (
            await request(app.getHttpServer())
                .get('/api/card-transactions')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET card-transactions by id', async () => {
        const getEntity: CardTransactionDTO = (
            await request(app.getHttpServer())
                .get('/api/card-transactions/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create card-transactions', async () => {
        const createdEntity: CardTransactionDTO = (
            await request(app.getHttpServer())
                .post('/api/card-transactions')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update card-transactions', async () => {
        const updatedEntity: CardTransactionDTO = (
            await request(app.getHttpServer())
                .put('/api/card-transactions')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE card-transactions', async () => {
        const deletedEntity: CardTransactionDTO = (
            await request(app.getHttpServer())
                .delete('/api/card-transactions/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
