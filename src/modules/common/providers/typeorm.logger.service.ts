/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console, @typescript-eslint/no-unused-expressions */
import { Logger, Injectable, Scope } from '@nestjs/common';
import { timestamp } from 'node_modules/rxjs/dist/types';
import { Logger as LoggerOrm, QueryRunner } from 'typeorm';
import { format } from 'winston';

/**
 * https://docs.nestjs.com/techniques/logger
 */
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerCustom extends Logger implements LoggerOrm {
  constructor() {
    super('ORM');
  }

  public logQuery(query: string, _parameters?: any[], _queryRunner?: QueryRunner): void {
    super.log(query, 'query');
  }

  public logQueryError(error: string | Error, _query: string, _parameters?: any[], _queryRunner?: QueryRunner): void {
    super.log(error, 'error');
  }

  public logQuerySlow(time: number, _query: string, _parameters?: any[], _queryRunner?: QueryRunner): void {
    super.log(time, 'slow-query');
  }

  public logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
    super.log(message, 'orm');
  }

  public logMigration(message: string, _queryRunner?: QueryRunner): void {
    super.log(message, 'orm');
  }
}
