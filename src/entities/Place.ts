import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity()
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    place: string;

    @OneToMany(() => Event, (event) => event.place)
    events: Event[];
}