import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Conductor } from 'src/app/_model/Conductor';
import { ConductorService } from 'src/app/_service/conductor.service';

@Component({
  selector: 'app-confirma-dialog',
  templateUrl: './confirma-dialog.component.html',
  styleUrls: ['./confirma-dialog.component.css']
})
export class ConfirmaDialogComponent implements OnInit {

  idUser: number;

  constructor(
    public dialogRef: MatDialogRef<ConfirmaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Conductor,
    private conductorService: ConductorService,
    private snackBar: MatSnackBar
  ) {  }

  ngOnInit(): void {
    this.idUser = this.data.idUsuario;
  }

  cerrarDialogo(){
    this.dialogRef.close({event: 'Cancelo'});
  }

  eliminarConductor(idUser) {
    this.conductorService.eliminar(idUser).subscribe(() => {
      this.openSnackBar('Eliminado correctamente');
      this.cerrarDialogo();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

}
