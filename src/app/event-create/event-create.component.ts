import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EvtService } from 'src/services/evt.service';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  form!:FormGroup
  
  constructor(private dialogRef:MatDialogRef<EventCreateComponent>,@Inject(MAT_DIALOG_DATA) data:any,private Es:EvtService){
if(data){
  this.Es.getEventById(data).subscribe((res)=>{this.form=new FormGroup({    intitule:new FormControl(res.intitule,Validators.required),
    dateEvenement:new FormControl(res.dateEvenement,Validators.required),
    lieu:new FormControl(res.lieu,Validators.required),})})
}
else{
  this.form=new FormGroup({
    intitule:new FormControl(null,Validators.required),
    dateEvenement:new FormControl(null,Validators.required),
    lieu:new FormControl(null,Validators.required), 
  })
}
   

  }
  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}

}
