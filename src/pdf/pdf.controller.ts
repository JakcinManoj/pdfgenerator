import { Controller, Post, Get, Body, Param, StreamableFile } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('pdf')
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Create a PDF' })
  async createPdf(@Body('htmlContent') htmlContent: string): Promise<{ id: number }> {
    const id = await this.pdfService.createPdf(htmlContent);
    return { id };
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Get a PDF' })
  async getPdf(@Param('id') id: number): Promise<StreamableFile> {
    const pdfData = await this.pdfService.getPdf(id);
    return new StreamableFile(pdfData, {
      disposition: `attachment; filename="document-${id}.pdf"`,
      type: 'application/pdf',
    });
  }
}
