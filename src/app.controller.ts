import { Body, Controller, Delete, Get, NotFoundException, Param, Put, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ReplaceProductDto } from './replaceproduct.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  #productList = [
    {
      name: 'Alma',
      price: 1000
    },
    {
      name: 'Kósárlabda',
      price: 16549
    },
    {
      name: '40kg-s súlyzó',
      price: 234555
    }
  ];

  @Get('products')
  listProducts(){
    return this.#productList;
  }

  @Get('products/:id')
  getProduct(@Param('id') id:string){
    return JSON.stringify(this.#productList[id]);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id:string){
    if(!this.#productList[id]){
      throw new NotFoundException("No product with ID");
    }
    this.#productList.splice(Number(id), 1);
  }

  @Put('products/:id')
  replaceProduct(@Param('id') id:string, @Body() data: ReplaceProductDto){
    if(!this.#productList[id]){
      throw new NotFoundException("No product with ID");
    }
    this.#productList[id].name = data.name;
    this.#productList[id].price = data.price;
  }
}
