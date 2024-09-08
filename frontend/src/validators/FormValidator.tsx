import { FormErrors } from '../interface/FormErrors';



export const validateAddBookForm = (formData: { title: string; author: string; description: string }): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.title.trim()) {
        errors.title = 'Title is required.';
    }

    else if (!formData.author.trim()) {
        errors.author = 'Author is required.';
    }

    else if (!formData.description.trim()) {
        errors.description = 'Description is required.';
    }

    return errors;
};
