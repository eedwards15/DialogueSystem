export class Dialogue
{
  constructor(id:string, x:string, y:string, value:string) {
    this.UniqueId = id;
    this.Xpos =x;
    this.Ypos =y;
    this.Value= value;
    this.ChildrenNodes = [];
  }

  public UniqueId: string
  public Xpos: string
  public Ypos: string
  public Value: string

  public ChildrenNodes: Dialogue[]




}
