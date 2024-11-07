import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as puppeteer from 'puppeteer';
import { PdfEntity } from './entities/pdf.entity';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(PdfEntity)
    private readonly pdfRepository: Repository<PdfEntity>,
  ) {}

  async createPdf(htmlContent: string): Promise<number> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.setContent(htmlContent);
      
      const pdfData = Buffer.from(
        await page.pdf({ 
          format: 'A4',
          printBackground: true
        })
      );
      
      await browser.close();

      const pdfEntity = this.pdfRepository.create({
        pdfData
      });

      const savedPdf = await this.pdfRepository.save(pdfEntity);
      return savedPdf.id;

    } catch (error) {
      throw new Error(`Failed to create PDF: ${error.message}`);
    }
  }

  async getPdf(id: number): Promise<Buffer> {
    const pdfEntity = await this.pdfRepository.findOne({ 
      where: { id },
      select: ['pdfData']
    });

    if (!pdfEntity) {
      throw new NotFoundException(`PDF with ID ${id} not found`);
    }
    return pdfEntity.pdfData;
  }
}
