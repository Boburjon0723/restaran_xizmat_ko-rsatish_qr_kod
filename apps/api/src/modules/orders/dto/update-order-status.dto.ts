import { IsEnum, IsOptional, IsString } from "class-validator";

export enum OrderStatusDto {
  PENDING = "PENDING",
  SENT = "SENT",
  PREPARING = "PREPARING",
  COMPLETED = "COMPLETED",
  RETRYING = "RETRYING",
  MANUAL_REQUIRED = "MANUAL_REQUIRED",
  FAILED = "FAILED"
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatusDto)
  status!: OrderStatusDto;

  @IsOptional()
  @IsString()
  failureReason?: string;
}
