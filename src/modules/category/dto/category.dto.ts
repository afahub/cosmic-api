import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductCategoryDto)
  @IsOptional()
  subcategories?: CreateProductCategoryDto[];

  @IsString()
  @IsOptional()
  parentCategoryId?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {}
