import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private dbcon!: SQLiteDBConnection;
  private students! : any;
  
  constructor() { }

  async initDB(){
    this.dbcon = await this.sqlite.createConnection(
      'db1', 
      false,
      'no-encryption',
      1,
      false
    );
    await this.dbcon.open();
  }

  async initTable(){
    const query = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL)`;
    await this.dbcon.execute(query);
  }

  async create(name:any, email:any){
    const query = `INSERT INTO students (name , email) VALUES ('${name}', '${email}')`;
    await this.dbcon.execute(query);
  }

  async read(){
    const query = `SELECT * FROM students ORDER by id DESC`;
    const result = await this.dbcon.query(query);
    this.students = result.values;
    return this.students;
  }

  async delete(id:any){
    const query = `DELETE FROM students WHERE id = '${id}'`;
    await this.dbcon.execute(query);
  }

  async update(id:any, newName:any, newEmail:any){
    const query = `UPDATE students SET name = '${newName}', email = '${newEmail}' WHERE id = '${id}'`;
    await this.dbcon.execute(query);
  }


}
