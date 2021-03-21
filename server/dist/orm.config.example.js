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
    database: 'sahati',
    url: 'mysql://YOUR_USER:YOUR_PWD@localhost:3306/DB_NAME',
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
        database: 'sahati',
        url: 'mysql://YOUR_USER:YOUR_PWD@localhost:27017/DB_NAME',
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
//# sourceMappingURL=orm.config.example.js.map