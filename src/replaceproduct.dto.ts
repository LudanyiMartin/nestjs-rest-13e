import { IsDefined, IsNumber, IsString, Min, isNumber} from "class-validator"

export class ReplaceProductDto {
  @IsDefined()
  @IsString()
  name: string

  @IsDefined()
  @IsNumber()
  @Min(1)
  price: number
}
