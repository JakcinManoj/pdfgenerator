// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';
import { Pdf, PdfSchema } from './pdf/entities/pdf.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Jack:Ia8216THmfyrKZFq@cluster0.cmzfs0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Update with your MongoDB URI
    MongooseModule.forFeature([{ name: Pdf.name, schema: PdfSchema }]),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class AppModule {}
