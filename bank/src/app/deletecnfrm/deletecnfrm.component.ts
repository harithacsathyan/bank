import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deletecnfrm',
  templateUrl: './deletecnfrm.component.html',
  styleUrls: ['./deletecnfrm.component.css']
})
export class DeletecnfrmComponent implements OnInit {

  @Input() item:String | undefined //input decorator to conect parent to child

  @Output() onCancel = new EventEmitter()

  @Output() onDelete = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    this.onCancel.emit()
  }
  delete(){
    this.onDelete.emit(this.item)
  }

}
