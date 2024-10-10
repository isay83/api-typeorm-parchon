import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Place } from "./Place";
import { Category } from "./Category";
import { Ticket } from "./Ticket";
import { UserEvent } from "./UserEvent";

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column({ type: "time" })
    time: Date;

    @Column()
    birth: Date;

    @Column()
    image: string;

    @Column()
    capacity: number;

    @Column()
    rating: number;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: 'id_user' })
    id_user: User;

    @ManyToOne(() => Place, (place) => place.events)
    @JoinColumn({ name: 'id_place' })
    id_place: Place;

    @ManyToOne(() => Category, (categories) => categories.events)
    @JoinColumn({ name: 'id_category' })
    id_category: Category;

    @OneToMany(() => Ticket, (tickets) => tickets.id_event)
    tickets: Ticket[];

    @OneToMany(() => UserEvent, (userEvent) => userEvent.id_event)
    userEvents: UserEvent[];
}