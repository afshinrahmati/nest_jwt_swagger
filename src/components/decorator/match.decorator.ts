import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyKey: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}
@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): Promise<boolean> | boolean {
    // value ==> confirmPass
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName]; // relatedPropertyName is  property password
    return value === relatedValue;
  }
  defaultMessage(args: ValidationArguments) {
    return args.property + ' must match ' + args.constraints[0];
  }
}
