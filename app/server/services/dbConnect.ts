import mysql, { Connection } from 'mysql';
import CON from 'server/CORE/db-config';
import queryToPromise from 'server/utils/queryToPromise';

const db = <Connection & { queryPromised: (sql: string, values: any[]) => Promise<any> }>
  mysql.createConnection({
    host: CON.host,
    user: CON.user,
    password: CON.password,
    database: CON.database,
  });

db.queryPromised = (sql: string, values: any[]) => queryToPromise(db, sql, values);

export default db;
