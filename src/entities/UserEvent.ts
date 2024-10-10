import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
export class UserEvent extends BaseEntity {
    @PrimaryColumn()
    id_user: number;

    @PrimaryColumn()
    id_event: number;

    @ManyToOne(() => User, user => user.userEvents)
    @JoinColumn({ name: "id_user" })
    user: User; // is id_user

    @ManyToOne(() => Event, event => event.userEvents)
    @JoinColumn({ name: "id_event" })
    event: Event; // is id_event
}