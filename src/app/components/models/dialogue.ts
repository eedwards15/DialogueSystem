export class Dialogue
{
  constructor(id:string, x:number, y:number, value:string) {
    this.UniqueId = id;
    this.Xpos =x;
    this.Ypos =y;
    this.Value= value;
    this.ChildrenNodes = [];
  }

  public UniqueId: string
  public Xpos: number
  public Ypos: number
  public Value: string

  public ChildrenNodes: Dialogue[]
}

export class UpdateMovement
{
  constructor(id:string, x:number, y:number) {
    this.UniqueId = id;
    this.Xpos =x;
    this.Ypos =y;
  }
  public UniqueId: string
  public Xpos: number
  public Ypos: number
}
