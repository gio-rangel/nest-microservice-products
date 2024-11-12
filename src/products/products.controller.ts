import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create-product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'find-products' })
  findAll(@Payload() filters: PaginationDto) {
    return this.productsService.findAll(filters);
  }

  @MessagePattern({ cmd: 'find-product' })
  findOne(@Payload() id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  changeProductsStatus(@Payload() updateProductsDto: UpdateProductDto) {
    return this.productsService.update(updateProductsDto);
  }

  @MessagePattern({ cmd: 'remove-product' })
  remove(@Payload() id: number) {
    return this.productsService.remove(id);
  }
}

