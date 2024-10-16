import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";

@Entity()
export class Tier extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tier: string;

    @Column()
    description: string;

    @OneToMany(() => Ticket, (ticket) => ticket.tier)
    tickets: Ticket[];
}