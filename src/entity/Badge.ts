import { Column, Entity } from "typeorm";
import Model from "./Model";

@Entity("badge")
export class Badge extends Model {
  @Column({ name: "id_to_show", unique: true })
  public idToShow: string;

  @Column({ type: "varchar", length: 255 })
  public name: string;
}
