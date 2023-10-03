import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LotteryService } from 'src/app/services/lottery.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent  {

  
  constructor(
    private data :LotteryService,
    private http: HttpClient,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminEditComponent>,
    @Inject(MAT_DIALOG_DATA) public lottery: any
  ) {
    
  }
 

  closeDialog(): void {
    this.dialogRef.close();
  }
  openSuccessDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // ไม่ให้ปิด Dialog โดยคลิกภายนอก
    dialogConfig.data = {
      message: 'การแก้ไขสำเร็จ'
    };
  
 
  
  }
  edit(ticket_number: string, price: string, period: string, set_number: number, id: number) {
    let jsonObj = {
      ticket_number: ticket_number,
      price: parseFloat(price), // แปลงเป็นตัวเลข
      period: parseInt(period), // แปลงเป็นตัวเลข
      set_number: set_number
    };
  
    let jsonString = JSON.stringify(jsonObj);
  
    this.http.put<any>(this.data.apiEndpoint + "/lottery/" + id, jsonString).subscribe(
      (response) => {
        console.log("สถานะการอัปเดตข้อมูล: " + response.status);
        console.log("ผลการอัปเดตข้อมูล: " + JSON.stringify(response.body));
        this.openSuccessDialog(); // เมื่อการแก้ไขสำเร็จ แสดง Dialog สำเร็จ
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล: " + JSON.stringify(error));
        // คุณสามารถแสดงข้อความผิดพลาดหรือดำเนินการเพิ่มเติมตามความเหมาะสมที่นี่
      }
    );
    }    
  
  
  
}
