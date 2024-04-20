import { DatabaseTypeEnum } from './dataBase';

describe('DatabaseType', () => {
  it('should have the correct values', () => {
    expect(DatabaseTypeEnum.MySQL).toEqual('mysql');
    expect(DatabaseTypeEnum.Postgres).toEqual('postgres');
    expect(DatabaseTypeEnum.CockroachDB).toEqual('cockroachdb');
    expect(DatabaseTypeEnum.SAP).toEqual('sap');
    expect(DatabaseTypeEnum.MariaDB).toEqual('mariadb');
    expect(DatabaseTypeEnum.SQLite).toEqual('sqlite');
    expect(DatabaseTypeEnum.Cordova).toEqual('cordova');
    expect(DatabaseTypeEnum.ReactNative).toEqual('react-native');
    expect(DatabaseTypeEnum.NativeScript).toEqual('nativescript');
    expect(DatabaseTypeEnum.SQLJS).toEqual('sqljs');
    expect(DatabaseTypeEnum.Oracle).toEqual('oracle');
    expect(DatabaseTypeEnum.MSSQL).toEqual('mssql');
    expect(DatabaseTypeEnum.MongoDB).toEqual('mongodb');
    expect(DatabaseTypeEnum.AuroraMySQL).toEqual('aurora-mysql');
    expect(DatabaseTypeEnum.AuroraPostgres).toEqual('aurora-postgres');
    expect(DatabaseTypeEnum.Expo).toEqual('expo');
    expect(DatabaseTypeEnum.BetterSQLite3).toEqual('better-sqlite3');
    expect(DatabaseTypeEnum.Capacitor).toEqual('capacitor');
    expect(DatabaseTypeEnum.Spanner).toEqual('spanner');
  });
});
