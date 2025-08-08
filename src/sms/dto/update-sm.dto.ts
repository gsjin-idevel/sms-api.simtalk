import { PartialType } from '@nestjs/mapped-types';
import {CreateAuthSmsDTO} from "./create-auth-sms.dto";

export class UpdateSmDto extends PartialType(CreateAuthSmsDTO) {}
