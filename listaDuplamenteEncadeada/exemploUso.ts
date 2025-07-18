import {ListaDuplamenteEncadeada} from "./ListaDuplamenteEncadeada"

const lista = new ListaDuplamenteEncadeada();

lista.inserirNoInicio(5);
lista.inserirNoFim(10);
lista.inserirNaPosicao(7, 1);

lista.exibirOrdemNormal();   // Ordem normal: 5 <-> 7 <-> 10
lista.exibirOrdemInversa();  // Ordem inversa: 10 <-> 7 <-> 5

console.log("Tamanho:", lista.obterTamanho());  // 3
console.log("Está vazia?", lista.estaVazia());  // false

lista.removerDaPosicao(1);
lista.exibirOrdemNormal();  // Ordem normal: 5 <-> 10

lista.esvaziar();
console.log("Tamanho após esvaziar:", lista.obterTamanho());  // 0
