import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class LoginDto extends BaseDto {
    static schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });
}
export default LoginDto;