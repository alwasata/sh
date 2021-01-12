import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CardDTO } from '../src/service/dto/card.dto';
import { CardService } from '../src/service/card.service';

describe('Card Controller', () => {
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
            .overrideProvider(CardService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all cards ', async () => {
        const getEntities: CardDTO[] = (
            await request(app.getHttpServer())
                .get('/api/cards')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET cards by id', async () => {
        const getEntity: CardDTO = (
            await request(app.getHttpServer())
                .get('/api/cards/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create cards', async () => {
        const createdEntity: CardDTO = (
            await request(app.getHttpServer())
                .post('/api/cards')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update cards', async () => {
        const updatedEntity: CardDTO = (
            await request(app.getHttpServer())
                .put('/api/cards')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE cards', async () => {
        const deletedEntity: CardDTO = (
            await request(app.getHttpServer())
                .delete('/api/cards/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
