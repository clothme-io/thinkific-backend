import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Course } from "./Course";
import Model from "./Model";

@Entity("badge")
export class Badge extends Model {
  @Column({ name: "id_to_show", unique: true })
  public idToShow: string;

  @Column({ name: "course_name", type: "varchar", length: 255 })
  public courseName: string;

  @Column({ name: "certificate_name", type: "varchar", length: 255 })
  public certificateName: string;

  @Column({ name: "organization_id", type: "varchar", length: 255 })
  public organizationId: string;

  @Column({ name: "organization_name", type: "varchar", length: 255 })
  public organizationName: string;

  @Column({ name: "issue_month_year", type: "varchar", length: 255 })
  public issueMonthOrYear: string;

  @Column({ name: "expiration_month_year", type: "varchar", length: 255 })
  public expirationMonthOrYear: string;

  @Column({ name: "cert_id", type: "varchar", length: 255 })
  public certId: string;

  @OneToOne(() => Course)
  @JoinColumn()
  course: Course;
}
