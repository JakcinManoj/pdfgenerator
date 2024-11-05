import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';
import { PdfEntity } from './pdf/entities/pdf.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [PdfEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PdfEntity]),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class AppModule {}
