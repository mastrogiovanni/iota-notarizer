import { IsNotEmpty } from "class-validator";

export class AppendDto {

    @IsNotEmpty()
    index: string;

    @IsNotEmpty()
    data: string;

}

