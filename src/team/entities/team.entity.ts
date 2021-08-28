import { Model } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Team extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  img: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
