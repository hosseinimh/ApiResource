import * as yup from "yup";
import { validation, usersPage as strings } from "../../../constants/strings";

const userSearchSchema = yup.object().shape({
    username: yup
        .string(validation.stringMessage.replace(":field", strings.username))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.username)
                .replace(":max", "50")
        ),
    nameFamily: yup
        .string(validation.stringMessage.replace(":field", strings.nameFamily))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.nameFamily)
                .replace(":max", "50")
        ),
});

export default userSearchSchema;
