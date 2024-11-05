import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PdfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bytea')
  pdfData: Buffer;
}
