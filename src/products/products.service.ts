import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";

// Repository configuration in Nest
// Interceptor , hooks in Nest JS
@Injectable()
export class ProductsService {
    products: Product[] = [];

    constructor(@InjectModel ('Product') private readonly productModel : Model<Product>){}

    async insertProduct(title: string, description : string, price:number){
        const prodId = Math.random().toString();
        const newProduct =  new this.productModel({title , description , price});
        const result = await newProduct.save();
        console.log(result);
        return result.id;
    }

    async getProducts(){
        const products = await this.productModel.find();
        return products;

    }

    async getSingleProduct(id:string){
        const product = await this.productModel.findById(id);
        if(!product){
            throw new NotFoundException("Product Not found");
        }
        return {...product};
    }
}
