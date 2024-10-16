import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";
import { Event } from "./Event";

@Entity()
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    place: string;

    @Column()
    address: string;

    @ManyToOne(() => City, (city) => city.places)
    @JoinColumn({ name: "id_city" })
    city: City;

    @OneToMany(() => Event, (event) => event.place)
    events: Event[];
}