import { global } from 'angular2/src/facade/lang';
import { AngularTools } from './common_tools';
var context = global;
/**
 * Enabled Angular 2 debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 */
export function enableDebugTools(ref) {
    context.ng = new AngularTools(ref);
}
/**
 * Disables Angular 2 tools.
 */
export function disableDebugTools() {
    delete context.ng;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWxESFc4QTFHLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90b29scy90b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDBCQUEwQjtPQUV4QyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQjtBQUUzQyxJQUFJLE9BQU8sR0FBUSxNQUFNLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7R0FVRztBQUNILGlDQUFpQyxHQUFpQjtJQUNoRCxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFFRDs7R0FFRztBQUNIO0lBQ0UsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyJztcbmltcG9ydCB7QW5ndWxhclRvb2xzfSBmcm9tICcuL2NvbW1vbl90b29scyc7XG5cbnZhciBjb250ZXh0ID0gPGFueT5nbG9iYWw7XG5cbi8qKlxuICogRW5hYmxlZCBBbmd1bGFyIDIgZGVidWcgdG9vbHMgdGhhdCBhcmUgYWNjZXNzaWJsZSB2aWEgeW91ciBicm93c2VyJ3NcbiAqIGRldmVsb3BlciBjb25zb2xlLlxuICpcbiAqIFVzYWdlOlxuICpcbiAqIDEuIE9wZW4gZGV2ZWxvcGVyIGNvbnNvbGUgKGUuZy4gaW4gQ2hyb21lIEN0cmwgKyBTaGlmdCArIGopXG4gKiAxLiBUeXBlIGBuZy5gICh1c3VhbGx5IHRoZSBjb25zb2xlIHdpbGwgc2hvdyBhdXRvLWNvbXBsZXRlIHN1Z2dlc3Rpb24pXG4gKiAxLiBUcnkgdGhlIGNoYW5nZSBkZXRlY3Rpb24gcHJvZmlsZXIgYG5nLnByb2ZpbGVyLnRpbWVDaGFuZ2VEZXRlY3Rpb24oKWBcbiAqICAgIHRoZW4gaGl0IEVudGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlRGVidWdUb29scyhyZWY6IENvbXBvbmVudFJlZik6IHZvaWQge1xuICBjb250ZXh0Lm5nID0gbmV3IEFuZ3VsYXJUb29scyhyZWYpO1xufVxuXG4vKipcbiAqIERpc2FibGVzIEFuZ3VsYXIgMiB0b29scy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVEZWJ1Z1Rvb2xzKCk6IHZvaWQge1xuICBkZWxldGUgY29udGV4dC5uZztcbn1cbiJdfQ==