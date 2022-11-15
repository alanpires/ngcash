import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function PasswordValidator(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'PasswordValidator',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const regexNumber = '/([0-9])/g';
                    const regexLetter = '/([A-Z])/g';
                    // Verifica se o valor encontrado na regex é maior ou igual a zero, pois caso não encontre, o valor é -1
                    return typeof value === 'string' && value.length >= 8 && value.search(regexNumber) >= 0 && value.search(regexLetter) >= 0;
                },
            },
        });
    };
}