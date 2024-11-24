import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public students?:any;  
  public myName: any = '';
  public myEmail: any = '';
  public default: boolean = true;
  constructor(private database: DatabaseService) {}

  async ngOnInit() {
      await this.callInit();
      await this.callRead();
  }

  async callInit(){
    await this.database.initDB();
    await this.database.initTable();
  }

  async callCreate(name:any, email:any){

    if(name !== '' || email !== ''){
      await this.database.create(name, email);
      alert("success");
      await this.callRead();
  
    }else {
      alert('input please');
    }


  }

  async callRead(){
    this.students = await this.database.read();
    this.reset();

  }
  
  async callDelete(id:any){
    await this.database.delete(id);
    alert('deleted');
    await this.callRead();
  }

  async callUpdate(id:any, newName:any, newEmail:any){
    await this.database.update(id,newName,newEmail);
    alert('updated');
    await this.callRead();
    
  }

  public reset(){
    this.myName = '';
    this.myEmail = '';
    this.default = true;


  }

  public selected(id:any , name:any, email:any){
    this.myName = name;
    this.myEmail = email;
    this.default = false;
  }



}
