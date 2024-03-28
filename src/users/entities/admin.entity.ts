// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AdminEntity implements Admin {
  @ApiProperty()
  adminId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }
}
