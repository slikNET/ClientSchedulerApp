import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsAtLeastOnePhone(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'іsAtLeastOnePhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const phone = args.object['phone'];
          const telegram = args.object['telegram'];
          const viber = args.object['viber'];

          return !!(phone || telegram || viber);
        },
      },
    });
  };
}
