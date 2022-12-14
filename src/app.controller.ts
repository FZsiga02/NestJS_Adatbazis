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
import { resourceLimits } from 'worker_threads';
import { brotliDecompressSync } from 'zlib';
import { AppService } from './app.service';
import db from './db';
import { MacskaDto } from './macskak.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async macskaListazas(@Query('szem_szin') szem_szin = '') {
    if (szem_szin != '') {
      const [rows] = await db.execute(
        'SELECT szem_szin, suly FROM macskak WHERE szem_szin LIKE ?',
        [szem_szin],
      );
      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC',
      );

      return {
        macskak: rows,
      };
    }
  }

  @Get('macskak/new')
  @Render('form')
  newMacskaForm() {
    return {};
  }

  @Post('macskak/new')
  @Redirect()
  async newMacska(@Body() macska: MacskaDto) {
    const []: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macska.szemSzin, macska.suly],
    );
    return {
      url: '/',
    };
  }
}
