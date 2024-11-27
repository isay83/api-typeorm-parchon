import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Place } from "./Place";
import { Category } from "./Category";
import { Ticket } from "./Ticket";
import { UserEvent } from "./UserEvent";
import { Image } from "./Image";

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event: string;

    @Column()
    description: string;

    @Column({ type: "text" })
    details: string;

    @Column()
    date: Date;

    @Column({ type: "time" })
    time: Date;

    @Column()
    image: string;

    @Column()
    capacity: number;

    @Column()
    rating: number;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @ManyToOne(() => Place, (place) => place.events)
    @JoinColumn({ name: 'id_place' })
    place: Place;

    @ManyToOne(() => Category, (categories) => categories.events)
    @JoinColumn({ name: 'id_category' })
    category: Category;

    @OneToMany(() => Ticket, (tickets) => tickets.id_event)
    tickets: Ticket[];

    @OneToMany(() => UserEvent, (userEvent) => userEvent.id_event)
    userEvents: UserEvent[];

    @OneToMany(() => Image, (image) => image.event)
    images: Image[];
}