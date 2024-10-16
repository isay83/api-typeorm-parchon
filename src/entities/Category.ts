import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @OneToMany(() => Event, (event) => event.category)
    events: Event[];
}