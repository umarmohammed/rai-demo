import { environment } from 'src/environments/environment';
import { mockBoostrap } from './mock-bootstrap';
import { mockBaseline } from './mock-baseline';
import { mockAttacks } from './mock-attacks';
import { of } from 'rxjs';

export const bootstrapMock = `${environment.baseUrl}api/bootstrap`;
export const baselineMock = `${environment.baseUrl}api/baseline`;
export const attackMock = `${environment.baseUrl}api/attacks`;

export const mock = {
  [bootstrapMock]: mockBoostrap,
  [baselineMock]: mockBaseline,
  [attackMock]: mockAttacks,
};

export function UseMock(key: string) {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): any => {
    if (environment.useMocks) {
      descriptor.value = () => of(mock[key]);
    }

    return descriptor;
  };
}
