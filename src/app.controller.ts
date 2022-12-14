import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  Post,
  Body,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listCats(@Query('eyeColor')) {
    const [rows] = await db.execute
  }
}
