import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();

    this.logger.debug(`Database connected`)
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    })
  }

  async findAll(filters: PaginationDto) {
    const {page, limit} = filters;

    const where = {}

    const [products, total] = await Promise.all([
      this.product.findMany({
        where,
        skip: (page -1 ) * limit,
        take: limit,
      }),
      this.product.count()
    ])

    const pagination = {
      total,
      page,
      limit
    }

    return {products, pagination}
  }

  findOne(id: number) {
    const product = this.product.findFirst({ where: {id} });

    if(!product) {
      throw new RpcException(`Product not found`);
    }

    return product; 
  }

  update(updateProductDto: UpdateProductDto) {
    const {id, ...updateProduct} = updateProductDto; 

    return this.product.update({
      where: { id },
      data: updateProduct
    });
  }

  remove(id: number) {
    return this.product.delete({where: {id}})
  }
}
