
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class findAllParamDto {
  @ApiPropertyOptional({ example: 1, description: 'Số trang' })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ example: 10, description: 'Số lượng bản ghi trên mỗi trang' })
  limit?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Từ khóa tìm kiếm' })
  keyword?: string;
}
