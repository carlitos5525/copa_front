import { Selecao } from "./selecao.model";

export interface Jogo {
  id?: number;
  selecaoAId: number,
  selecaoA?: Selecao;
  selecaoA_gols?: string,
  selecaoBId: number,
  selecaoB?: Selecao;
  selecaoB_gols?: string,
  criadoEm?: string;
}
