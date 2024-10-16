import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";
import { User } from "./User";
import { Place } from "./Place";

@Entity()
export class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @ManyToOne(() => Department, (department) => department.cities)
    @JoinColumn({ name: "id_department" })
    department: Department;

    @OneToMany(() => User, (user) => user.city)
    users: User[];

    @OneToMany(() => Place, (place) => place.city)
    places: Place[];
}