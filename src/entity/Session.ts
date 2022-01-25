import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import Model from "./Model";
import { Tenant } from "./Tenant";

@Entity()
export class Session extends Model {
  @Column({ name: "access_token" })
  public accesToken: string;

  @Column({ name: "refresh_token" })
  public refreshToken: string;

  @Column({ name: "expires_at" })
  public expiresAt: string;

  @OneToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant;
}
