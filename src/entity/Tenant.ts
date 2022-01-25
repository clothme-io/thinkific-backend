import { Column, Entity, Index, OneToMany } from "typeorm";
import { Course } from "./Course";
import Model from "./Model";

@Entity("tenant")
export class Tenant extends Model {
  @Column({ default: null })
  public name: string;

  @Column({
    default: null,
  })
  public email: string;

  @Column({
    name: "phone_number",
    length: 100,
    default: null,
  })
  public phoneNumber: string;

  @Index()
  @Column({
    default: null,
  })
  public gid: string;

  @Column({
    default: null,
  })
  public subdomain: string;

  @Column({
    default: null,
  })
  public country: string;

  @Column({ type: "jsonb", default: null })
  public notifications: {};

  @Column({ type: "jsonb", default: null })
  public settings: {};

  @Column({ name: "is_suspended", default: false })
  public isSuspended: boolean;

  @OneToMany(() => Course, (course) => course.tenant)
  courses: Course[];
}
