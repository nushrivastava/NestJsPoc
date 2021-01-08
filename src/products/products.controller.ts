import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { InsertProductDto } from './create-product.dto';
import { CreateProductResponse} from './create-product-response.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {

    }


    @Post()
    async addProduct(@Body('title') prodTitle: string,
        @Body('desc') description: string,
        @Body('price') price: number) { 

       const generatedId =  await this.productService.insertProduct(prodTitle, description, price);
            return generatedId ;  
    }

    @Get()
    getAllProducts(){
       return this.productService.getProducts();
    }


    @Get()
    getAllProductsNew(){
       return true;
    }
    @Get(':id')
    async getProductByName(@Param('id') prodId : string){
        const prod = await this.productService.getSingleProduct(prodId);
        return prod ;
    }

    @Post('/postWithBody' ) //shortcut to convert to JSON
    async addProductWithBody(@Headers('abcd') header ,@Body () createProductDto : InsertProductDto 
    ) { 
        console.log('Headers in request '+header);
        console.log('payload is '+JSON.stringify(createProductDto));
        
       const generatedId =  await this.productService.insertProduct(createProductDto.prodTitle, createProductDto.prodDescription, createProductDto.prodPrice);
       productResponse : CreateProductResponse ;   
       const productResponse = new CreateProductResponse(); 
       productResponse.id = generatedId;
       return JSON.stringify(productResponse) ;  
    }
}