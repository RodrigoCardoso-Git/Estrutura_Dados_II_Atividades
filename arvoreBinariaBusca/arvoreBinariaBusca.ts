export class NoArvore {
  valor: number;
  esquerda: NoArvore | null = null;
  direita: NoArvore | null = null;

  constructor(valor: number) {
    this.valor = valor;
  }
}

export class ArvoreBinariaBusca {
  private raiz: NoArvore | null = null;

  // Inserção
  inserir(valor: number): void {
    this.raiz = this._inserir(this.raiz, valor);
  }

  private _inserir(no: NoArvore | null, valor: number): NoArvore {
    if (no === null) return new NoArvore(valor);
    if (valor < no.valor) {
      no.esquerda = this._inserir(no.esquerda, valor);
    } else if (valor > no.valor) {
      no.direita = this._inserir(no.direita, valor);
    }
    return no;
  }

  // Buscar elemento
  buscar(valor: number): boolean {
    return this._buscar(this.raiz, valor);
  }

  private _buscar(no: NoArvore | null, valor: number): boolean {
    if (no === null) return false;
    if (valor === no.valor) return true;
    return valor < no.valor
      ? this._buscar(no.esquerda, valor)
      : this._buscar(no.direita, valor);
  }

  // Busca em largura (nível)
  exibirEmLargura(): void {
    if (!this.raiz) return;

    const fila: NoArvore[] = [this.raiz];
    const resultado: number[] = [];

    while (fila.length > 0) {
      const no = fila.shift()!;
      resultado.push(no.valor);
      if (no.esquerda) fila.push(no.esquerda);
      if (no.direita) fila.push(no.direita);
    }

    console.log("Busca em largura:", resultado.join(" "));
  }

  // Pré-ordem
  exibirPreOrdem(): void {
    const resultado: number[] = [];
    this._preOrdem(this.raiz, resultado);
    console.log("Pré-ordem:", resultado.join(" "));
  }

  private _preOrdem(no: NoArvore | null, res: number[]): void {
    if (no) {
      res.push(no.valor);
      this._preOrdem(no.esquerda, res);
      this._preOrdem(no.direita, res);
    }
  }

  // Em-ordem
  exibirEmOrdem(): void {
    const resultado: number[] = [];
    this._emOrdem(this.raiz, resultado);
    console.log("Em-ordem:", resultado.join(" "));
  }

  private _emOrdem(no: NoArvore | null, res: number[]): void {
    if (no) {
      this._emOrdem(no.esquerda, res);
      res.push(no.valor);
      this._emOrdem(no.direita, res);
    }
  }

  // Pós-ordem
  exibirPosOrdem(): void {
    const resultado: number[] = [];
    this._posOrdem(this.raiz, resultado);
    console.log("Pós-ordem:", resultado.join(" "));
  }

  private _posOrdem(no: NoArvore | null, res: number[]): void {
    if (no) {
      this._posOrdem(no.esquerda, res);
      this._posOrdem(no.direita, res);
      res.push(no.valor);
    }
  }

  // Altura da árvore
  altura(): number {
    return this._altura(this.raiz);
  }

  private _altura(no: NoArvore | null): number {
    if (no === null) return -1; // altura de árvore vazia é -1
    return 1 + Math.max(this._altura(no.esquerda), this._altura(no.direita));
  }

  // Contar elementos
  contarElementos(): number {
    return this._contar(this.raiz);
  }

  private _contar(no: NoArvore | null): number {
    if (no === null) return 0;
    return 1 + this._contar(no.esquerda) + this._contar(no.direita);
  }

  // Ancestrais de um nó
  exibirAncestrais(valor: number): void {
    const caminho: number[] = [];
    if (this._buscarAncestrais(this.raiz, valor, caminho)) {
      console.log("Ancestrais de", valor + ":", caminho.join(" "));
    } else {
      console.log("Valor não encontrado.");
    }
  }

  private _buscarAncestrais(no: NoArvore | null, valor: number, caminho: number[]): boolean {
    if (no === null) return false;
    if (no.valor === valor) return true;

    if (
      this._buscarAncestrais(no.esquerda, valor, caminho) ||
      this._buscarAncestrais(no.direita, valor, caminho)
    ) {
      caminho.push(no.valor);
      return true;
    }
    return false;
  }

  // Descendentes de um nó
  exibirDescendentes(valor: number): void {
    const no = this._buscarNo(this.raiz, valor);
    if (!no) {
      console.log("Valor não encontrado.");
      return;
    }

    const resultado: number[] = [];
    this._preOrdem(no.esquerda, resultado);
    this._preOrdem(no.direita, resultado);
    console.log("Descendentes de", valor + ":", resultado.join(" "));
  }

  private _buscarNo(no: NoArvore | null, valor: number): NoArvore | null {
    if (no === null) return null;
    if (valor === no.valor) return no;
    return valor < no.valor
      ? this._buscarNo(no.esquerda, valor)
      : this._buscarNo(no.direita, valor);
  }

  // Nível de um nó
  nivelDoNo(valor: number): number {
    return this._nivel(this.raiz, valor, 0);
  }

  private _nivel(no: NoArvore | null, valor: number, nivel: number): number {
    if (no === null) return -1;
    if (no.valor === valor) return nivel;

    return valor < no.valor
      ? this._nivel(no.esquerda, valor, nivel + 1)
      : this._nivel(no.direita, valor, nivel + 1);
  }

  // Verificar se é estritamente binária (cada nó tem 0 ou 2 filhos)
  ehEstritamenteBinaria(): boolean {
    return this._ehEstritamenteBinaria(this.raiz);
  }

  private _ehEstritamenteBinaria(no: NoArvore | null): boolean {
    if (!no) return true;
    if ((no.esquerda === null && no.direita !== null) ||
        (no.esquerda !== null && no.direita === null)) {
      return false;
    }
    return this._ehEstritamenteBinaria(no.esquerda) &&
           this._ehEstritamenteBinaria(no.direita);
  }

  // Verificar se a árvore é cheia (todos os nós têm 0 ou 2 filhos e todos os níveis estão completos)
  ehCheia(): boolean {
    const altura = this.altura();
    const totalNos = this.contarElementos();
    return totalNos === Math.pow(2, altura + 1) - 1;
  }
}
