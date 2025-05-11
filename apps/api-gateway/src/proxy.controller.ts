import { HttpService } from "@nestjs/axios";
import { Controller, Get, Post, Req, Res,  } from "@nestjs/common";
import {Request, Response} from 'express';

@Controller('orders')
export class ProxyController{
  constructor(private httpService: HttpService){}

  @Post()
  async forwardToOrderService(@Req() req: Request, @Res() res: Response){
    const {data} = await this.httpService.post('<http://localhost:3001/orders>', req.body).toPromise();
    res.json(data);
  }
}

