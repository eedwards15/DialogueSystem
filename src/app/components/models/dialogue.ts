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
  public ChildrenNodes: string[]

  public HasConnection(uniqueId:string):boolean {
    for (let i = 0; i < this.ChildrenNodes.length; i++) {
      let record = this.ChildrenNodes[i];
      if(record == uniqueId){
        return true;
      }
    }
    return false;
  }

  public RemoveConnection(uniqueId:string)
  {
      var index =  this.ChildrenNodes.findIndex(x => x == uniqueId);
      if (index > -1) {
        this.ChildrenNodes.splice(index, 1);
      }
  }
}

export class JsonHelper
{
  public static  JsonToDialogue(record:Dialogue) :Dialogue
  {
     return new Dialogue(record.UniqueId,record.Xpos, record.Ypos, record.Value)
  }

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
