import { Component } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EvtService } from 'src/services/evt.service';
import { EventCreateComponent } from '../event-create/event-create.component';
import { MatDialog, } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-evt',
  templateUrl: './evt.component.html',
  styleUrls: ['./evt.component.css']
})

export class EvtComponent implements AfterViewInit{

displayedColumns: string[] = [
  'id',
  'intitule',
  'dateEvenement',
  'lieu',
  'action'
];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES:EvtService,private dialog:MatDialog) {

  this.dataSource = new MatTableDataSource();

  // ✅ AJOUT OBLIGATOIRE (POUR LE FILTRE)
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    const date = data.dateEvenement
      ? new Date(data.dateEvenement).toLocaleDateString()
      : '';

    const dataStr =
      data.id +
      data.intitule +
      data.lieu +
      date;

    return dataStr.toLowerCase().includes(filter);
  };
}


  open(){
   const dialogRef= this.dialog.open(EventCreateComponent);
   dialogRef.afterClosed().subscribe((data)=>{

    this.ES.addEvent(data).subscribe(()=>{this.ES.getAllEvents().subscribe((x)=>{this.dataSource.data=x})
   })})
  }

  openEdit(id:string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data =id;
    const dialogRef= this.dialog.open(EventCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data)=>{

      this.ES.updateEvent(data,id).subscribe(()=>{this.ES.getAllEvents().subscribe((x)=>{this.dataSource.data=x})
     })})

  }
 
  ngAfterViewInit() {
    this.ES.getAllEvents().subscribe((res) => {
  console.log('EVENTS = ', res); // 🔎 debug
  this.dataSource.data = res;
  this.dataSource._updateChangeSubscription(); // ⭐ LIGNE CLÉ
});

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id: string) {
  if (!id) return;

  // Si tu veux juste supprimer directement :
  this.ES.deleteEvent(id).subscribe(() => {
    // Recharger la liste
    this.ES.getAllEvents().subscribe((x) => {
      this.dataSource.data = x;
    });
  });
}

}



