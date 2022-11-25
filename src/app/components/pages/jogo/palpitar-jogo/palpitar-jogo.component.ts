import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {
  selecao1_nome! : string;
  selecao2_nome! : string;
  gols_1!: number;
  gols_2!: number;
  id! : number;
  selecao1_id! : number;
  selecao2_id! : number;
 
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        let { id } = params;
        if (id !== undefined) {
          this.http.get<Jogo>(`https://localhost:5001/api/jogo/buscar/${id}`).subscribe({
            next: (jogo) => {
              this.id = id;
              this.selecao1_id = jogo.selecaoAId;
              this.selecao2_id = jogo.selecaoBId;
              this.selecao1_nome = jogo.selecaoA?.nome!;
              this.selecao2_nome = jogo.selecaoB?.nome!;
          },
        });
        }
      },
    });
  }

  palpitar(): void {
    let jogo: Jogo = {
      "id": this.id,
      "selecaoAId": this.selecao1_id,
      "selecaoBId": this.selecao2_id,
      "selecaoA_gols" : this.gols_1.toString(),
      "selecaoB_gols" : this.gols_2.toString()
    };

    this.http.post<Jogo>("https://localhost:5001/api/jogo/palpitar", jogo).subscribe({
      next: (funcionario) => {
        this._snackBar.open("Palpite cadastrado", "Ok!", {
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/jogo/listar"]);
      },
    });
  }
}
