import { Column, Entity, Index, ManyToOne } from "typeorm";
import Model from "./Model";
import { Tenant } from "./Tenant";

@Entity("course")
export class Course extends Model {
  @Index()
  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  public name: string;

  @Column({
    type: "text",
    default: null,
  })
  public decription: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.courses)
  tenant: Tenant;
}
