const queryToPromise = async (db, sql: string, values: any[]) => new Promise<>((resolve, reject) => {
  db.query(sql, values, (err, val) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(val);
  });
});

export default queryToPromise;
