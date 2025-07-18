import {ArvoreBinariaBusca} from "./arvoreBinariaBusca"

const arvore = new ArvoreBinariaBusca();

arvore.inserir(50);
arvore.inserir(30);
arvore.inserir(70);
arvore.inserir(20);
arvore.inserir(40);
arvore.inserir(60);
arvore.inserir(80);

arvore.exibirEmLargura();     // Busca em largura
arvore.exibirPreOrdem();      // Pré-ordem
arvore.exibirEmOrdem();       // Em-ordem
arvore.exibirPosOrdem();      // Pós-ordem

console.log("Altura:", arvore.altura());
console.log("Total de elementos:", arvore.contarElementos());

arvore.exibirAncestrais(60);     // Ancestrais
arvore.exibirDescendentes(70);   // Descendentes
console.log("Nível do 40:", arvore.nivelDoNo(40));

console.log("É estritamente binária?", arvore.ehEstritamenteBinaria());
console.log("É cheia?", arvore.ehCheia());
