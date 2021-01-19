import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerMiddleware } from "../middleware/logging.middleware";
import { ProductSchema } from "./product.model";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports :[MongooseModule.forFeature([{name: 'Product' , schema : ProductSchema}])],
    controllers: [ProductsController],
    providers : [ProductsService],


})
export class ProductModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
        // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });

    }

}