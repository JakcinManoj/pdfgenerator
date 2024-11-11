import { Controller, Post, Get, Body, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  async createPdf(@Body('htmlContent') htmlContent: string): Promise<{ id: string }> {
    const id = await this.pdfService.createPdf(htmlContent);
    return { id };
  }

  @Get(':id')
  async getPdf(@Param('id') id: string, @Res() res: Response) {
    try {
      const pdfData = await this.pdfService.getPdf(id);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="document-${id}.pdf"`,
      });
      res.send(pdfData);
    } catch (error) {
      throw new HttpException('PDF not found', HttpStatus.NOT_FOUND);
    }
  }
}
