import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    
    
    use(request: any, res: any, next: NextFunction) {
        console.log('Request in middleware'+JSON.stringify(request.body));
        next();
       
    }

    
}