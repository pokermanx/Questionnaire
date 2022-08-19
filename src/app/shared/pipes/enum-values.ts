import { Pipe, PipeTransform } from '@angular/core';

interface Result {
    key: string;
    value: string;
}

@Pipe({
    name: 'extractValues',
    pure: true
})
export class EnumValuesPipe implements PipeTransform {
    transform(value: any, toExclude: any[] = []): Result[] {
        return Object.values(value)
            .filter(k => (typeof value[k as any] !== 'number') && !toExclude.includes(k))
            .map((el: any) => {
                return {
                    value: el,
                    key: value[el] || '-- --'
                };
            });
    }
}
