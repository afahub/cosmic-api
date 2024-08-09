import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

enum CartStatus {
  ACTIVE = 'ACTIVE',
  CHECKED_OUT = 'CHECKED_OUT',
  ABANDONED = 'ABANDONED',
}

class CartItem {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CartDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => CartItem)
  @IsArray()
  items: CartItem[];

  @IsNumber()
  totalPrice: number;

  @IsEnum(CartStatus)
  @IsOptional()
  status: CartStatus = CartStatus.ACTIVE;
}
