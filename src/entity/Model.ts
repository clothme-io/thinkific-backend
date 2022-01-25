import {
  BaseEntity,
  // BeforeInsert,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
// import { v4 as uuid } from "uuid";

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  uuid: string;

  @Index()
  @Column({ type: "text", name: "short_id" })
  shortId: string;

  @Column({ name: "is_active", nullable: false, default: true })
  isActive!: boolean;

  @Column({ name: "created_at", nullable: false })
  @CreateDateColumn()
  public createdAt: Date;

  @Column({ name: "updated_at", nullable: false })
  @UpdateDateColumn()
  public updatedAt: Date;

  // @BeforeInsert()
  // createUuid() {
  //   this.uuid = uuid();
  // }

  constructor(model?: Partial<any>) {
    super();
    Object.assign(this, model);
  }

  toJSON() {
    return { ...this, id: undefined };
  }
}


export abstract class JoinModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "text" })
  public uuid: string;

  @Index()
  @Column({ type: "text", name: "short_id" })
  public shortId: string;

  @Column({ name: "is_active", nullable: false, default: true })
  public isActive: boolean;

  @Column({ name: "created_at", nullable: false })
  @CreateDateColumn()
  public createdAt: Date;

  @Column({ name: "updated_at", nullable: false })
  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(model?: Partial<any>) {
    super();
    Object.assign(this, model);
  }

  toJSON() {
    return { ...this };
  }
}


export abstract class SimpleModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: "text", name: "sort_id" })
  public sortId: string;

  @Column({ name: "created_at", nullable: false })
  @CreateDateColumn()
  public createdAt: Date;

  @Column({ name: "updated_at", nullable: false })
  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(model?: Partial<any>) {
    super();
    Object.assign(this, model);
  }

  toJSON() {
    return { ...this };
  }
}