import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { Role } from "./Role";
import { Event } from "./Event";
import { TicketUser } from "./TicketUser";
import { UserEvent } from "./UserEvent";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birth: Date;

    @Column({ type: 'enum', enum: ['m', 'f', 'o'] })
    gender: string;

    @Column()
    phone: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ManyToOne(() => City, (city) => city.users)
    @JoinColumn({ name: 'id_city' })
    id_city: City;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'id_role' })
    id_role: Role;

    @OneToMany(() => Event, (event) => event.id_user)
    events: Event[];

    @OneToMany(() => TicketUser, (ticketUser) => ticketUser.id_user)
    ticketUsers: TicketUser[];

    @OneToMany(() => UserEvent, (userEvent) => userEvent.id_user)
    userEvents: UserEvent[];
}