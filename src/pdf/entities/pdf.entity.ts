import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pdf extends Document {
  @Prop({ required: true, type: Buffer })
  pdfData: Buffer;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf);
