import * as yup from "yup";
import { validation, addBookPage as strings } from "../../../constants/strings";

const addBookSchema = yup.object().shape({
    name: yup
        .string(validation.stringMessage.replace(":field", strings.name))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.name)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.name)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.name)),
    image: yup
        .string(validation.stringMessage.replace(":field", strings.image))
        .max(
            100,
            validation.maxMessage
                .replace(":field", strings.image)
                .replace(":max", "100")
        ),
    description: yup
        .string(validation.stringMessage.replace(":field", strings.description))
        .max(
            1000,
            validation.maxMessage
                .replace(":field", strings.description)
                .replace(":max", "1000")
        ),
    extraInfo: yup
        .string(validation.stringMessage.replace(":field", strings.extraInfo))
        .max(
            1000,
            validation.maxMessage
                .replace(":field", strings.extraInfo)
                .replace(":max", "1000")
        ),
    categoryId: yup
        .number()
        .typeError(
            validation.numberMessage.replace(":field", strings.categoryId)
        )
        .required(
            validation.requiredMessage.replace(":field", strings.categoryId)
        ),
    tags: yup
        .string(validation.stringMessage.replace(":field", strings.tags))
        .max(
            1000,
            validation.maxMessage
                .replace(":field", strings.tags)
                .replace(":max", "1000")
        ),
});

export default addBookSchema;
