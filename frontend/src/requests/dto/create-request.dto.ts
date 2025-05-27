import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[\d\s\-$$$$]+$/, {
    message: 'Phone number must be a valid format',
  })
  guestPhone: string;

  @IsString()
  @IsNotEmpty()
  requestText: string;
}
