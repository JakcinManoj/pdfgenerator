import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';
import { Pdf, PdfSchema } from './pdf/entities/pdf.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Pdf.name, schema: PdfSchema }]),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class AppModule {}
