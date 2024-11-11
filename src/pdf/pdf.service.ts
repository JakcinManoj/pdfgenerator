// src/pdf.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as puppeteer from 'puppeteer';
import { Pdf } from './entities/pdf.entity';

@Injectable()
export class PdfService {
  constructor(
    @InjectModel(Pdf.name) private pdfModel: Model<Pdf>,
  ) {}

  async createPdf(htmlContent: string): Promise<string> {
    // Launch Puppeteer to create the PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    
    // Generate the PDF as a Buffer
    const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4' }));
    await browser.close();

    // Save PDF buffer to MongoDB
    const pdfDocument = new this.pdfModel({ pdfData: pdfBuffer });
    const savedPdf = await pdfDocument.save();
    return savedPdf._id as string;
  }

  async getPdf(id: string): Promise<Buffer> {
    const pdfDocument = await this.pdfModel.findById(id).exec();
    if (!pdfDocument) {
      throw new Error('PDF not found');
    }
    return pdfDocument.pdfData;
  }
}
