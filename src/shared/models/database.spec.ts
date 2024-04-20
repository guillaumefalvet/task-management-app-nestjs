import { DatabaseTypesEnum } from './dataBase';

describe('DatabaseType', () => {
  it('should have the correct values', () => {
    expect(DatabaseTypesEnum.MySQL).toEqual('mysql');
    expect(DatabaseTypesEnum.Postgres).toEqual('postgres');
    expect(DatabaseTypesEnum.CockroachDB).toEqual('cockroachdb');
    expect(DatabaseTypesEnum.SAP).toEqual('sap');
    expect(DatabaseTypesEnum.MariaDB).toEqual('mariadb');
    expect(DatabaseTypesEnum.SQLite).toEqual('sqlite');
    expect(DatabaseTypesEnum.Cordova).toEqual('cordova');
    expect(DatabaseTypesEnum.ReactNative).toEqual('react-native');
    expect(DatabaseTypesEnum.NativeScript).toEqual('nativescript');
    expect(DatabaseTypesEnum.SQLJS).toEqual('sqljs');
    expect(DatabaseTypesEnum.Oracle).toEqual('oracle');
    expect(DatabaseTypesEnum.MSSQL).toEqual('mssql');
    expect(DatabaseTypesEnum.MongoDB).toEqual('mongodb');
    expect(DatabaseTypesEnum.AuroraMySQL).toEqual('aurora-mysql');
    expect(DatabaseTypesEnum.AuroraPostgres).toEqual('aurora-postgres');
    expect(DatabaseTypesEnum.Expo).toEqual('expo');
    expect(DatabaseTypesEnum.BetterSQLite3).toEqual('better-sqlite3');
    expect(DatabaseTypesEnum.Capacitor).toEqual('capacitor');
    expect(DatabaseTypesEnum.Spanner).toEqual('spanner');
  });
});
