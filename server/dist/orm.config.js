"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
        migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: true,
};
let ormconfig = {
    name: 'default',
    type: 'mysql',
    database: 'alwasata_sahati',
    url: 'mysql://alwasata_sahati:1g82PXKb-O;4rb@localhost:3306/alwasata_sahati',
    logging: false,
    synchronize: true,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN
};
exports.ormconfig = ormconfig;
if (process.env.NODE_ENV === 'prod') {
    exports.ormconfig = ormconfig = {
        name: 'default',
        type: 'mysql',
        database: 'alwasata_sahati',
        url: 'mysql://alwasata_sahati:1g82PXKb-O;4rb@localhost:3306/alwasata_sahati',
        logging: false,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}
if (process.env.NODE_ENV === 'test') {
    exports.ormconfig = ormconfig = {
        name: 'default',
        type: 'sqlite',
        database: ':memory:',
        keepConnectionAlive: true,
        logging: true,
        synchronize: true,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}
//# sourceMappingURL=orm.config.js.map