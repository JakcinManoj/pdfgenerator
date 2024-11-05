import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as puppeteer from 'puppeteer';
import { PdfEntity } from './entities/pdf.entity';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(PdfEntity)
    private pdfRepository: Repository<PdfEntity>,
  ) {}

  async createPdf(htmlContent: string): Promise<number> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    
    const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4' }));
    await browser.close();

    const pdfEntity = new PdfEntity();
    pdfEntity.pdfData = pdfBuffer;
    const savedPdf = await this.pdfRepository.save(pdfEntity);
    return savedPdf.id;
  }

  async getPdf(id: number): Promise<Buffer> {
    const pdfEntity = await this.pdfRepository.findOne({ where: { id } });
    if (!pdfEntity) {
      throw new Error('PDF not found');
    }
    return pdfEntity.pdfData;
  }
}
