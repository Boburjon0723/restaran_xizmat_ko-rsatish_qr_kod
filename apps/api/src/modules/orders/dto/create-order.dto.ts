import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";

export class CreateOrderItemDto {
  @IsString()
  @MinLength(2)
  menuItemId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  price?: number;
}

export class CreateOrderDto {
  @IsString()
  @MinLength(3)
  restaurantId!: string;

  @IsString()
  @MinLength(2)
  tableId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];

  @IsOptional()
  @IsString()
  source?: string;
}
