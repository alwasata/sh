import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AttatchmentDTO } from '../src/service/dto/attatchment.dto';
import { AttatchmentService } from '../src/service/attatchment.service';

describe('Attatchment Controller', () => {
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
            .overrideProvider(AttatchmentService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all attatchments ', async () => {
        const getEntities: AttatchmentDTO[] = (
            await request(app.getHttpServer())
                .get('/api/attatchments')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET attatchments by id', async () => {
        const getEntity: AttatchmentDTO = (
            await request(app.getHttpServer())
                .get('/api/attatchments/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create attatchments', async () => {
        const createdEntity: AttatchmentDTO = (
            await request(app.getHttpServer())
                .post('/api/attatchments')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update attatchments', async () => {
        const updatedEntity: AttatchmentDTO = (
            await request(app.getHttpServer())
                .put('/api/attatchments')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE attatchments', async () => {
        const deletedEntity: AttatchmentDTO = (
            await request(app.getHttpServer())
                .delete('/api/attatchments/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
