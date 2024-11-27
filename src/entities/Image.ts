import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    url: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @ManyToOne(() => Event, (event) => event.images)
    @JoinColumn({ name: 'id_event' })
    event: Event;

    @ManyToOne(() => User, (user) => user.images)
    @JoinColumn({ name: 'id_user' })
    user: User;
}