import * as yup from "yup";
import { validation, booksPage as strings } from "../../../constants/strings";

const bookSearchSchema = yup.object().shape({
    title: yup
        .string(validation.stringMessage.replace(":field", strings.title))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.title)
                .replace(":max", "50")
        ),
});

export default bookSearchSchema;
