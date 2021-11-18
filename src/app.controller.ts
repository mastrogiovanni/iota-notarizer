import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppendDto } from './dto/append.dto';
const { ClientBuilder } = require('@iota/client');

@Controller()
export class AppController {

  private client;

  constructor(private readonly appService: AppService) {
    this.client = new ClientBuilder()
      .node('https://chrysalis-nodes.iota.org:443')
      .build()
  }

  @Post("/append")
  async append(@Body() appendDto: AppendDto): Promise<{ hash?: string, error?: string, statusCode: number }> {

    try {

      const message = await this.client.message()
        .index(appendDto.index)
        .data(appendDto.data)
        .submit();

      if (!message?.messageId) {
        throw new Error("Impossible to get IOTA message's hash");
      }

      return {
        hash: message?.messageId,
        statusCode: 200
      }
    }
    catch (e) {
      return {
        error: e.message,
        statusCode: 200
      }
    }
  }
}
