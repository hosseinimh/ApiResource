import * as yup from "yup";
import { validation, loginPage as strings } from "../../../constants/strings";

const loginSchema = yup.object().shape({
    username: yup
        .string(validation.stringMessage.replace(":field", strings.username))
        .min(
            6,
            validation.minMessage
                .replace(":field", strings.username)
                .replace(":min", "6")
        )
        .max(
            6,
            validation.maxMessage
                .replace(":field", strings.username)
                .replace(":max", "6")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.username)
        ),
    password: yup
        .string(validation.stringMessage.replace(":field", strings.password))
        .min(
            4,
            validation.minMessage
                .replace(":field", strings.password)
                .replace(":min", "4")
        )
        .max(
            4,
            validation.maxMessage
                .replace(":field", strings.password)
                .replace(":max", "4")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.password)
        ),
});

export default loginSchema;
