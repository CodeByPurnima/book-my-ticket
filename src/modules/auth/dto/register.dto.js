import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });
}

export default RegisterDto;