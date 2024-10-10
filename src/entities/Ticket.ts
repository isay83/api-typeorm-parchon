import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";
import { Tier } from "./Tier";
import { TicketUser } from "./TicketUser";

@Entity()
export class Ticket extends BaseEntity {
    @PrimaryColumn()
    id_event: number;

    @PrimaryColumn()
    id: number;

    @Column()
    price: string;

    @Column()
    remaining: number;

    @ManyToOne(() => Tier, tier => tier.tickets)
    @JoinColumn({ name: "id_tier" })
    id_tier: Tier;

    @ManyToOne(() => Event, event => event.tickets)
    @JoinColumn({ name: "id_event" })
    event: Event; // is id_event

    @OneToMany(() => TicketUser, ticketUser => ticketUser.ticket) // send id_event and id
    ticketUsers: TicketUser[];
}