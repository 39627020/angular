import { isPresent } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Map, MapWrapper, Set, SetWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
import { ReflectorReader } from './reflector_reader';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export class ReflectionInfo {
    constructor(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector extends ReflectorReader {
    constructor(reflectionCapabilities) {
        super();
        /** @internal */
        this._injectableInfo = new Map();
        /** @internal */
        this._getters = new Map();
        /** @internal */
        this._setters = new Map();
        /** @internal */
        this._methods = new Map();
        this._usedKeys = null;
        this.reflectionCapabilities = reflectionCapabilities;
    }
    isReflectionEnabled() { return this.reflectionCapabilities.isReflectionEnabled(); }
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage() { this._usedKeys = new Set(); }
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys() {
        if (this._usedKeys == null) {
            throw new BaseException('Usage tracking is disabled');
        }
        var allTypes = MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(key => !SetWrapper.has(this._usedKeys, key));
    }
    registerFunction(func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
    }
    registerType(type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
    }
    registerGetters(getters) { _mergeMaps(this._getters, getters); }
    registerSetters(setters) { _mergeMaps(this._setters, setters); }
    registerMethods(methods) { _mergeMaps(this._methods, methods); }
    factory(type) {
        if (this._containsReflectionInfo(type)) {
            var res = this._getReflectionInfo(type).factory;
            return isPresent(res) ? res : null;
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    }
    parameters(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).parameters;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        }
    }
    annotations(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).annotations;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        }
    }
    propMetadata(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).propMetadata;
            return isPresent(res) ? res : {};
        }
        else {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
    }
    interfaces(type) {
        if (this._injectableInfo.has(type)) {
            var res = this._getReflectionInfo(type).interfaces;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.interfaces(type);
        }
    }
    getter(name) {
        if (this._getters.has(name)) {
            return this._getters.get(name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    }
    setter(name) {
        if (this._setters.has(name)) {
            return this._setters.get(name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    }
    method(name) {
        if (this._methods.has(name)) {
            return this._methods.get(name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    }
    /** @internal */
    _getReflectionInfo(typeOrFunc) {
        if (isPresent(this._usedKeys)) {
            this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
    }
    /** @internal */
    _containsReflectionInfo(typeOrFunc) { return this._injectableInfo.has(typeOrFunc); }
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
}
function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, (v, k) => target.set(k, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1sREhXOEExRy50bXAvYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBTyxTQUFTLEVBQVksTUFBTSwwQkFBMEI7T0FDNUQsRUFBQyxhQUFhLEVBQW1CLE1BQU0sZ0NBQWdDO09BQ3ZFLEVBRUwsR0FBRyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsVUFBVSxFQUNWLGdCQUFnQixFQUNqQixNQUFNLGdDQUFnQztPQUVoQyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQjtBQUtsRDs7R0FFRztBQUNIO0lBQ0UsWUFBbUIsV0FBbUIsRUFBUyxVQUFvQixFQUFTLE9BQWtCLEVBQzNFLFVBQWtCLEVBQVMsWUFBcUM7UUFEaEUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUMzRSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQXlCO0lBQUcsQ0FBQztBQUN6RixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsK0JBQStCLGVBQWU7SUFhNUMsWUFBWSxzQkFBc0Q7UUFDaEUsT0FBTyxDQUFDO1FBYlYsZ0JBQWdCO1FBQ2hCLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQXVCLENBQUM7UUFDakQsZ0JBQWdCO1FBQ2hCLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUN2QyxnQkFBZ0I7UUFDaEIsYUFBUSxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQ3ZDLGdCQUFnQjtRQUNoQixhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFPckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLHNC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LENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLHVCQUF1QixDQUFDLFVBQWUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpGLFNBQVMsQ0FBQyxJQUFVLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZGLENBQUM7QUFFRCxvQkFBb0IsTUFBNkIsRUFBRSxNQUFpQztJQUNsRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBVyxFQUFFLENBQVMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtcbiAgTGlzdFdyYXBwZXIsXG4gIE1hcCxcbiAgTWFwV3JhcHBlcixcbiAgU2V0LFxuICBTZXRXcmFwcGVyLFxuICBTdHJpbmdNYXBXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1NldHRlckZuLCBHZXR0ZXJGbiwgTWV0aG9kRm59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtSZWZsZWN0b3JSZWFkZXJ9IGZyb20gJy4vcmVmbGVjdG9yX3JlYWRlcic7XG5pbXBvcnQge1BsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9wbGF0Zm9ybV9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5leHBvcnQge1NldHRlckZuLCBHZXR0ZXJGbiwgTWV0aG9kRm59IGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IHtQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXN9IGZyb20gJy4vcGxhdGZvcm1fcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMnO1xuXG4vKipcbiAqIFJlZmxlY3RpdmUgaW5mb3JtYXRpb24gYWJvdXQgYSBzeW1ib2wsIGluY2x1ZGluZyBhbm5vdGF0aW9ucywgaW50ZXJmYWNlcywgYW5kIG90aGVyIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY2xhc3MgUmVmbGVjdGlvbkluZm8ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYW5ub3RhdGlvbnM/OiBhbnlbXSwgcHVibGljIHBhcmFtZXRlcnM/OiBhbnlbXVtdLCBwdWJsaWMgZmFjdG9yeT86IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICBwdWJsaWMgaW50ZXJmYWNlcz86IGFueVtdLCBwdWJsaWMgcHJvcE1ldGFkYXRhPzoge1trZXk6IHN0cmluZ106IGFueVtdfSkge31cbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhY2Nlc3MgdG8gcmVmbGVjdGlvbiBkYXRhIGFib3V0IHN5bWJvbHMuIFVzZWQgaW50ZXJuYWxseSBieSBBbmd1bGFyXG4gKiB0byBwb3dlciBkZXBlbmRlbmN5IGluamVjdGlvbiBhbmQgY29tcGlsYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZsZWN0b3IgZXh0ZW5kcyBSZWZsZWN0b3JSZWFkZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9pbmplY3RhYmxlSW5mbyA9IG5ldyBNYXA8YW55LCBSZWZsZWN0aW9uSW5mbz4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0dGVycyA9IG5ldyBNYXA8c3RyaW5nLCBHZXR0ZXJGbj4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0dGVycyA9IG5ldyBNYXA8c3RyaW5nLCBTZXR0ZXJGbj4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbWV0aG9kcyA9IG5ldyBNYXA8c3RyaW5nLCBNZXRob2RGbj4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXNlZEtleXM6IFNldDxhbnk+O1xuICByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzOiBQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXM7XG5cbiAgY29uc3RydWN0b3IocmVmbGVjdGlvbkNhcGFiaWxpdGllczogUGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl91c2VkS2V5cyA9IG51bGw7XG4gICAgdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gcmVmbGVjdGlvbkNhcGFiaWxpdGllcztcbiAgfVxuXG4gIGlzUmVmbGVjdGlvbkVuYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaXNSZWZsZWN0aW9uRW5hYmxlZCgpOyB9XG5cbiAgLyoqXG4gICAqIENhdXNlcyBgdGhpc2AgcmVmbGVjdG9yIHRvIHRyYWNrIGtleXMgdXNlZCB0byBhY2Nlc3NcbiAgICoge0BsaW5rIFJlZmxlY3Rpb25JbmZvfSBvYmplY3RzLlxuICAgKi9cbiAgdHJhY2tVc2FnZSgpOiB2b2lkIHsgdGhpcy5fdXNlZEtleXMgPSBuZXcgU2V0KCk7IH1cblxuICAvKipcbiAgICogTGlzdHMgdHlwZXMgZm9yIHdoaWNoIHJlZmxlY3Rpb24gaW5mb3JtYXRpb24gd2FzIG5vdCByZXF1ZXN0ZWQgc2luY2VcbiAgICoge0BsaW5rICN0cmFja1VzYWdlfSB3YXMgY2FsbGVkLiBUaGlzIGxpc3QgY291bGQgbGF0ZXIgYmUgYXVkaXRlZCBhc1xuICAgKiBwb3RlbnRpYWwgZGVhZCBjb2RlLlxuICAgKi9cbiAgbGlzdFVudXNlZEtleXMoKTogYW55W10ge1xuICAgIGlmICh0aGlzLl91c2VkS2V5cyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignVXNhZ2UgdHJhY2tpbmcgaXMgZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgdmFyIGFsbFR5cGVzID0gTWFwV3JhcHBlci5rZXlzKHRoaXMuX2luamVjdGFibGVJbmZvKTtcbiAgICByZXR1cm4gYWxsVHlwZXMuZmlsdGVyKGtleSA9PiAhU2V0V3JhcHBlci5oYXModGhpcy5fdXNlZEtleXMsIGtleSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJGdW5jdGlvbihmdW5jOiBGdW5jdGlvbiwgZnVuY0luZm86IFJlZmxlY3Rpb25JbmZvKTogdm9pZCB7XG4gICAgdGhpcy5faW5qZWN0YWJsZUluZm8uc2V0KGZ1bmMsIGZ1bmNJbmZvKTtcbiAgfVxuXG4gIHJlZ2lzdGVyVHlwZSh0eXBlOiBUeXBlLCB0eXBlSW5mbzogUmVmbGVjdGlvbkluZm8pOiB2b2lkIHtcbiAgICB0aGlzLl9pbmplY3RhYmxlSW5mby5zZXQodHlwZSwgdHlwZUluZm8pO1xuICB9XG5cbiAgcmVnaXN0ZXJHZXR0ZXJzKGdldHRlcnM6IHtba2V5OiBzdHJpbmddOiBHZXR0ZXJGbn0pOiB2b2lkIHsgX21lcmdlTWFwcyh0aGlzLl9nZXR0ZXJzLCBnZXR0ZXJzKTsgfVxuXG4gIHJlZ2lzdGVyU2V0dGVycyhzZXR0ZXJzOiB7W2tleTogc3RyaW5nXTogU2V0dGVyRm59KTogdm9pZCB7IF9tZXJnZU1hcHModGhpcy5fc2V0dGVycywgc2V0dGVycyk7IH1cblxuICByZWdpc3Rlck1ldGhvZHMobWV0aG9kczoge1trZXk6IHN0cmluZ106IE1ldGhvZEZufSk6IHZvaWQgeyBfbWVyZ2VNYXBzKHRoaXMuX21ldGhvZHMsIG1ldGhvZHMpOyB9XG5cbiAgZmFjdG9yeSh0eXBlOiBUeXBlKTogRnVuY3Rpb24ge1xuICAgIGlmICh0aGlzLl9jb250YWluc1JlZmxlY3Rpb25JbmZvKHR5cGUpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZSkuZmFjdG9yeTtcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuZmFjdG9yeSh0eXBlKTtcbiAgICB9XG4gIH1cblxuICBwYXJhbWV0ZXJzKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IGFueVtdW10ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYykpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jKS5wYXJhbWV0ZXJzO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlT3JGdW5jKTtcbiAgICB9XG4gIH1cblxuICBhbm5vdGF0aW9ucyh0eXBlT3JGdW5jOiAvKlR5cGUqLyBhbnkpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmMpLmFubm90YXRpb25zO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuYW5ub3RhdGlvbnModHlwZU9yRnVuYyk7XG4gICAgfVxuICB9XG5cbiAgcHJvcE1ldGFkYXRhKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IHtba2V5OiBzdHJpbmddOiBhbnlbXX0ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYykpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jKS5wcm9wTWV0YWRhdGE7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wcm9wTWV0YWRhdGEodHlwZU9yRnVuYyk7XG4gICAgfVxuICB9XG5cbiAgaW50ZXJmYWNlcyh0eXBlOiBUeXBlKTogYW55W10ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZSkpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlKS5pbnRlcmZhY2VzO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaW50ZXJmYWNlcyh0eXBlKTtcbiAgICB9XG4gIH1cblxuICBnZXR0ZXIobmFtZTogc3RyaW5nKTogR2V0dGVyRm4ge1xuICAgIGlmICh0aGlzLl9nZXR0ZXJzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldHRlcnMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmdldHRlcihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZXR0ZXIobmFtZTogc3RyaW5nKTogU2V0dGVyRm4ge1xuICAgIGlmICh0aGlzLl9zZXR0ZXJzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldHRlcnMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnNldHRlcihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBtZXRob2QobmFtZTogc3RyaW5nKTogTWV0aG9kRm4ge1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZHMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLm1ldGhvZChuYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jOiBhbnkpOiBSZWZsZWN0aW9uSW5mbyB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl91c2VkS2V5cykpIHtcbiAgICAgIHRoaXMuX3VzZWRLZXlzLmFkZCh0eXBlT3JGdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2luamVjdGFibGVJbmZvLmdldCh0eXBlT3JGdW5jKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRhaW5zUmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYzogYW55KSB7IHJldHVybiB0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYyk7IH1cblxuICBpbXBvcnRVcmkodHlwZTogVHlwZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaW1wb3J0VXJpKHR5cGUpOyB9XG59XG5cbmZ1bmN0aW9uIF9tZXJnZU1hcHModGFyZ2V0OiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4sIGNvbmZpZzoge1trZXk6IHN0cmluZ106IEZ1bmN0aW9ufSk6IHZvaWQge1xuICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goY29uZmlnLCAodjogRnVuY3Rpb24sIGs6IHN0cmluZykgPT4gdGFyZ2V0LnNldChrLCB2KSk7XG59XG4iXX0=