export class No {
  public dado: number;
  public proximo: No | null = null;
  public anterior: No | null = null;

  constructor(dado: number) {
    this.dado = dado;
  }
}

export class ListaDuplamenteEncadeada {
  private inicio: No | null = null;
  private fim: No | null = null;
  private tamanho: number = 0;

  // Inserção no início
  inserirNoInicio(dado: number): void {
    const novoNo = new No(dado);
    if (this.inicio === null) {
      this.inicio = this.fim = novoNo;
    } else {
      novoNo.proximo = this.inicio;
      this.inicio.anterior = novoNo;
      this.inicio = novoNo;
    }
    this.tamanho++;
  }

  // Inserção no fim
  inserirNoFim(dado: number): void {
    const novoNo = new No(dado);
    if (this.fim === null) {
      this.inicio = this.fim = novoNo;
    } else {
      this.fim.proximo = novoNo;
      novoNo.anterior = this.fim;
      this.fim = novoNo;
    }
    this.tamanho++;
  }

  // Inserção em uma posição específica
  inserirNaPosicao(dado: number, posicao: number): void {
    if (posicao < 0 || posicao > this.tamanho) {
      throw new Error("Posição inválida");
    }
    if (posicao === 0) return this.inserirNoInicio(dado);
    if (posicao === this.tamanho) return this.inserirNoFim(dado);

    const novoNo = new No(dado);
    let atual = this.inicio;
    for (let i = 0; i < posicao - 1; i++) {
      atual = atual!.proximo;
    }
    novoNo.proximo = atual!.proximo;
    novoNo.anterior = atual;
    atual!.proximo!.anterior = novoNo;
    atual!.proximo = novoNo;
    this.tamanho++;
  }

  // Remoção no início
  removerDoInicio(): void {
    if (!this.inicio) return;
    if (this.inicio === this.fim) {
      this.inicio = this.fim = null;
    } else {
      this.inicio = this.inicio.proximo;
      if (this.inicio) this.inicio.anterior = null;
    }
    this.tamanho--;
  }

  // Remoção no fim
  removerDoFim(): void {
    if (!this.fim) return;
    if (this.inicio === this.fim) {
      this.inicio = this.fim = null;
    } else {
      this.fim = this.fim.anterior;
      if (this.fim) this.fim.proximo = null;
    }
    this.tamanho--;
  }

  // Remoção em uma posição específica
  removerDaPosicao(posicao: number): void {
    if (posicao < 0 || posicao >= this.tamanho) {
      throw new Error("Posição inválida");
    }
    if (posicao === 0) return this.removerDoInicio();
    if (posicao === this.tamanho - 1) return this.removerDoFim();

    let atual = this.inicio;
    for (let i = 0; i < posicao; i++) {
      atual = atual!.proximo;
    }
    atual!.anterior!.proximo = atual!.proximo;
    atual!.proximo!.anterior = atual!.anterior;
    this.tamanho--;
  }

  // Exibir a lista na ordem normal
  exibirOrdemNormal(): void {
    let atual = this.inicio;
    const elementos: number[] = [];
    while (atual) {
      elementos.push(atual.dado);
      atual = atual.proximo;
    }
    console.log("Ordem normal:", elementos.join(" <-> "));
  }

  // Exibir a lista na ordem inversa
  exibirOrdemInversa(): void {
    let atual = this.fim;
    const elementos: number[] = [];
    while (atual) {
      elementos.push(atual.dado);
      atual = atual.anterior;
    }
    console.log("Ordem inversa:", elementos.join(" <-> "));
  }

  // Verificar se a lista está vazia
  estaVazia(): boolean {
    return this.tamanho === 0;
  }

  // Esvaziar a lista
  esvaziar(): void {
    this.inicio = this.fim = null;
    this.tamanho = 0;
  }

  // Obter o tamanho da lista
  obterTamanho(): number {
    return this.tamanho;
  }
}
