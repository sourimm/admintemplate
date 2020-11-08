import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class SafeHtmlPipe implements PipeTransform {
    private domSanitized;
    constructor(domSanitized: DomSanitizer);
    transform(value: any, ...args: any[]): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SafeHtmlPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<SafeHtmlPipe, "safeHtml">;
}

//# sourceMappingURL=shared.d.ts.map