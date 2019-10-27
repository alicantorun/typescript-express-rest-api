import * as Joi from '@hapi/joi';
import { Types } from 'mongoose';

/**
 * @export
 * @class Validation
 */
abstract class Validation {
    // can`t assign to customJoi any type of Joi Schemas - because of custom field objectId. Need to discuss this
    customJoi: any;

    /**
     * @static
     * @type {string}
     * @memberof JoiSchema
     */
    readonly messageObjectId: string = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';

    /**
     * Creates an instance of Schema.
     * @memberof JoiSchema
     */
    constructor() {
        this.customJoi = Joi.extend((joi: Joi.Context) => ({
            type: 'objectId',
            base: joi.string(),
            messages: {
                objectId: this.messageObjectId,
            },
            validate(value: any, helpers: Joi.Context): any {
                if (!Types.ObjectId.isValid(value)) {
                    return { value: Types.ObjectId(value), errors: helpers.error('objectId') };
                }
            },
        }));
    }
}

export default Validation;
