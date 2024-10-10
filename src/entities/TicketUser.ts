import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Ticket } from "./Ticket";

@Entity()
export class TicketUser extends BaseEntity {
    @PrimaryColumn()
    id_user: number;

    @PrimaryColumn()
    id_event: number;

    @PrimaryColumn()
    id_ticket: number;

    @Column()
    quantity: number;

    @ManyToOne(() => User, user => user.ticketUsers)
    @JoinColumn({ name: "id_user" })
    user: User; // is id_user

    @ManyToOne(() => Ticket, ticket => ticket.ticketUsers)
    @JoinColumn([{ name: "id_event" }, { name: "id_ticket" }])
    ticket: Ticket; // is id_event and id_ticket
}