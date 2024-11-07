import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';
import { PdfEntity } from './pdf/entities/pdf.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [PdfEntity],
        synchronize: process.env.NODE_ENV !== 'production', // Disable synchronize in production
        autoLoadEntities: true, // Automatically load entities
        logging: process.env.NODE_ENV !== 'production', // Enable logging in development
      }),
    }),
    TypeOrmModule.forFeature([PdfEntity]),
  ],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService], 
})
export class AppModule {}