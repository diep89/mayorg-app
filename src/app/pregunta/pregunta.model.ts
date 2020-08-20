export class Pregunta {
  constructor(
    public categoria: string,
    public foto: string,
    public id: number,
    public nivel: number,
    public pregunta: string,
    public prescripcion: string,
    public respuestaCorrecta: number,
    public respuestas: string[],
    public tema: string
  ) {}
}
