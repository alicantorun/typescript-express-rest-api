import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IUserModel } from '@/components/User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    getUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }
}

export default new AuthValidation();
