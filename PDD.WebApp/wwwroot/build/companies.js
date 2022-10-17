var companies = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run$1(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run$1);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                else
                    this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Schedules a callback to run immediately before the component is updated after any state change.
     *
     * The first time the callback runs will be before the initial `onMount`
     *
     * https://svelte.dev/docs#run-time-svelte-beforeupdate
     */
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run$1).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.52.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function getAugmentedNamespace(n) {
      var f = n.default;
    	if (typeof f == "function") {
    		var a = function () {
    			return f.apply(this, arguments);
    		};
    		a.prototype = f.prototype;
      } else a = {};
      Object.defineProperty(a, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    var tooltip = {exports: {}};

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    function getUAString() {
      var uaData = navigator.userAgentData;

      if (uaData != null && uaData.brands) {
        return uaData.brands.map(function (item) {
          return item.brand + "/" + item.version;
        }).join(' ');
      }

      return navigator.userAgent;
    }

    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }

    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }

      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }

      var clientRect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;

      if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
      }

      var _ref = isElement(element) ? getWindow(element) : window,
          visualViewport = _ref.visualViewport;

      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width: width,
        height: height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x: x,
        y: y
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min, value, max) {
      var v = within(min, value, max);
      return v > max ? max : v;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      {
        if (!isHTMLElement(arrowElement)) {
          console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {
        {
          console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
        }

        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets,
          isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x,
          x = _offsets$x === void 0 ? 0 : _offsets$x,
          _offsets$y = offsets.y,
          y = _offsets$y === void 0 ? 0 : _offsets$y;

      var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
          offsetParent[heightProp];
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
          offsetParent[widthProp];
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref4.x;
      y = _ref4.y;

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref5) {
      var state = _ref5.state,
          options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

      {
        var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

        if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
          return transitionProperty.indexOf(property) >= 0;
        })) {
          console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
        }
      }

      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getViewportRect(element, strategy) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();

        if (layoutViewport || !layoutViewport && strategy === 'fixed') {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element, strategy) {
      var rect = getBoundingClientRect(element, false, strategy === 'fixed');
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$strategy = _options.strategy,
          strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;

        {
          console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
        }
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis) {
        var _offsetModifierState$;

        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = offset + overflow[mainSide];
        var max$1 = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _offsetModifierState$2;

        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _len = altAxis === 'y' ? 'height' : 'width';

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round(rect.width) / element.offsetWidth || 1;
      var scaleY = round(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function format(str) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return [].concat(args).reduce(function (p, c) {
        return p.replace(/%s/, c);
      }, str);
    }

    var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
    function validateModifiers(modifiers) {
      modifiers.forEach(function (modifier) {
        [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
        .filter(function (value, index, self) {
          return self.indexOf(value) === index;
        }).forEach(function (key) {
          switch (key) {
            case 'name':
              if (typeof modifier.name !== 'string') {
                console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
              }

              break;

            case 'enabled':
              if (typeof modifier.enabled !== 'boolean') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
              }

              break;

            case 'phase':
              if (modifierPhases.indexOf(modifier.phase) < 0) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
              }

              break;

            case 'fn':
              if (typeof modifier.fn !== 'function') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
              }

              break;

            case 'effect':
              if (modifier.effect != null && typeof modifier.effect !== 'function') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
              }

              break;

            case 'requires':
              if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
              }

              break;

            case 'requiresIfExists':
              if (!Array.isArray(modifier.requiresIfExists)) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
              }

              break;

            case 'options':
            case 'data':
              break;

            default:
              console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
                return "\"" + s + "\"";
              }).join(', ') + "; but \"" + key + "\" was provided.");
          }

          modifier.requires && modifier.requires.forEach(function (requirement) {
            if (modifiers.find(function (mod) {
              return mod.name === requirement;
            }) == null) {
              console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
            }
          });
        });
      });
    }

    function uniqueBy(arr, fn) {
      var identifiers = new Set();
      return arr.filter(function (item) {
        var identifier = fn(item);

        if (!identifiers.has(identifier)) {
          identifiers.add(identifier);
          return true;
        }
      });
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
    var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned
            // if one of the modifiers is invalid for any reason

            {
              var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
                var name = _ref.name;
                return name;
              });
              validateModifiers(modifiers);

              if (getBasePlacement(state.options.placement) === auto) {
                var flipModifier = state.orderedModifiers.find(function (_ref2) {
                  var name = _ref2.name;
                  return name === 'flip';
                });

                if (!flipModifier) {
                  console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
                }
              }

              var _getComputedStyle = getComputedStyle$1(popper),
                  marginTop = _getComputedStyle.marginTop,
                  marginRight = _getComputedStyle.marginRight,
                  marginBottom = _getComputedStyle.marginBottom,
                  marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
              // cause bugs with positioning, so we'll warn the consumer


              if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
                return parseFloat(margin);
              })) {
                console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
              }
            }

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {
              {
                console.error(INVALID_ELEMENT_ERROR);
              }

              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });
            var __debug_loops__ = 0;

            for (var index = 0; index < state.orderedModifiers.length; index++) {
              {
                __debug_loops__ += 1;

                if (__debug_loops__ > 100) {
                  console.error(INFINITE_LOOP_ERROR);
                  break;
                }
              }

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {
          {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
                _ref3$options = _ref3.options,
                options = _ref3$options === void 0 ? {} : _ref3$options,
                effect = _ref3.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }
    var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers$1
    }); // eslint-disable-next-line import/no-unused-modules

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    var lib = /*#__PURE__*/Object.freeze({
        __proto__: null,
        popperGenerator: popperGenerator,
        detectOverflow: detectOverflow,
        createPopperBase: createPopper$2,
        createPopper: createPopper,
        createPopperLite: createPopper$1,
        top: top,
        bottom: bottom,
        right: right,
        left: left,
        auto: auto,
        basePlacements: basePlacements,
        start: start,
        end: end,
        clippingParents: clippingParents,
        viewport: viewport,
        popper: popper,
        reference: reference,
        variationPlacements: variationPlacements,
        placements: placements,
        beforeRead: beforeRead,
        read: read,
        afterRead: afterRead,
        beforeMain: beforeMain,
        main: main,
        afterMain: afterMain,
        beforeWrite: beforeWrite,
        write: write,
        afterWrite: afterWrite,
        modifierPhases: modifierPhases,
        applyStyles: applyStyles$1,
        arrow: arrow$1,
        computeStyles: computeStyles$1,
        eventListeners: eventListeners,
        flip: flip$1,
        hide: hide$1,
        offset: offset$1,
        popperOffsets: popperOffsets$1,
        preventOverflow: preventOverflow$1
    });

    var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

    var util = {exports: {}};

    /*!
      * Bootstrap index.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredUtil;

    function requireUtil () {
    	if (hasRequiredUtil) return util.exports;
    	hasRequiredUtil = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  factory(exports) ;
    		})(commonjsGlobal, (function (exports) {
    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/index.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  const MAX_UID = 1000000;
    		  const MILLISECONDS_MULTIPLIER = 1000;
    		  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

    		  const toType = object => {
    		    if (object === null || object === undefined) {
    		      return `${object}`;
    		    }

    		    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
    		  };
    		  /**
    		   * Public Util API
    		   */


    		  const getUID = prefix => {
    		    do {
    		      prefix += Math.floor(Math.random() * MAX_UID);
    		    } while (document.getElementById(prefix));

    		    return prefix;
    		  };

    		  const getSelector = element => {
    		    let selector = element.getAttribute('data-bs-target');

    		    if (!selector || selector === '#') {
    		      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
    		      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    		      // `document.querySelector` will rightfully complain it is invalid.
    		      // See https://github.com/twbs/bootstrap/issues/32273

    		      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
    		        return null;
    		      } // Just in case some CMS puts out a full URL with the anchor appended


    		      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
    		        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
    		      }

    		      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    		    }

    		    return selector;
    		  };

    		  const getSelectorFromElement = element => {
    		    const selector = getSelector(element);

    		    if (selector) {
    		      return document.querySelector(selector) ? selector : null;
    		    }

    		    return null;
    		  };

    		  const getElementFromSelector = element => {
    		    const selector = getSelector(element);
    		    return selector ? document.querySelector(selector) : null;
    		  };

    		  const getTransitionDurationFromElement = element => {
    		    if (!element) {
    		      return 0;
    		    } // Get transition-duration of the element


    		    let {
    		      transitionDuration,
    		      transitionDelay
    		    } = window.getComputedStyle(element);
    		    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    		    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    		    if (!floatTransitionDuration && !floatTransitionDelay) {
    		      return 0;
    		    } // If multiple durations are defined, take the first


    		    transitionDuration = transitionDuration.split(',')[0];
    		    transitionDelay = transitionDelay.split(',')[0];
    		    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    		  };

    		  const triggerTransitionEnd = element => {
    		    element.dispatchEvent(new Event(TRANSITION_END));
    		  };

    		  const isElement = object => {
    		    if (!object || typeof object !== 'object') {
    		      return false;
    		    }

    		    if (typeof object.jquery !== 'undefined') {
    		      object = object[0];
    		    }

    		    return typeof object.nodeType !== 'undefined';
    		  };

    		  const getElement = object => {
    		    // it's a jQuery object or a node element
    		    if (isElement(object)) {
    		      return object.jquery ? object[0] : object;
    		    }

    		    if (typeof object === 'string' && object.length > 0) {
    		      return document.querySelector(object);
    		    }

    		    return null;
    		  };

    		  const isVisible = element => {
    		    if (!isElement(element) || element.getClientRects().length === 0) {
    		      return false;
    		    }

    		    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

    		    const closedDetails = element.closest('details:not([open])');

    		    if (!closedDetails) {
    		      return elementIsVisible;
    		    }

    		    if (closedDetails !== element) {
    		      const summary = element.closest('summary');

    		      if (summary && summary.parentNode !== closedDetails) {
    		        return false;
    		      }

    		      if (summary === null) {
    		        return false;
    		      }
    		    }

    		    return elementIsVisible;
    		  };

    		  const isDisabled = element => {
    		    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    		      return true;
    		    }

    		    if (element.classList.contains('disabled')) {
    		      return true;
    		    }

    		    if (typeof element.disabled !== 'undefined') {
    		      return element.disabled;
    		    }

    		    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
    		  };

    		  const findShadowRoot = element => {
    		    if (!document.documentElement.attachShadow) {
    		      return null;
    		    } // Can find the shadow root otherwise it'll return the document


    		    if (typeof element.getRootNode === 'function') {
    		      const root = element.getRootNode();
    		      return root instanceof ShadowRoot ? root : null;
    		    }

    		    if (element instanceof ShadowRoot) {
    		      return element;
    		    } // when we don't find a shadow root


    		    if (!element.parentNode) {
    		      return null;
    		    }

    		    return findShadowRoot(element.parentNode);
    		  };

    		  const noop = () => {};
    		  /**
    		   * Trick to restart an element's animation
    		   *
    		   * @param {HTMLElement} element
    		   * @return void
    		   *
    		   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
    		   */


    		  const reflow = element => {
    		    element.offsetHeight; // eslint-disable-line no-unused-expressions
    		  };

    		  const getjQuery = () => {
    		    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    		      return window.jQuery;
    		    }

    		    return null;
    		  };

    		  const DOMContentLoadedCallbacks = [];

    		  const onDOMContentLoaded = callback => {
    		    if (document.readyState === 'loading') {
    		      // add listener on the first call when the document is in loading state
    		      if (!DOMContentLoadedCallbacks.length) {
    		        document.addEventListener('DOMContentLoaded', () => {
    		          for (const callback of DOMContentLoadedCallbacks) {
    		            callback();
    		          }
    		        });
    		      }

    		      DOMContentLoadedCallbacks.push(callback);
    		    } else {
    		      callback();
    		    }
    		  };

    		  const isRTL = () => document.documentElement.dir === 'rtl';

    		  const defineJQueryPlugin = plugin => {
    		    onDOMContentLoaded(() => {
    		      const $ = getjQuery();
    		      /* istanbul ignore if */

    		      if ($) {
    		        const name = plugin.NAME;
    		        const JQUERY_NO_CONFLICT = $.fn[name];
    		        $.fn[name] = plugin.jQueryInterface;
    		        $.fn[name].Constructor = plugin;

    		        $.fn[name].noConflict = () => {
    		          $.fn[name] = JQUERY_NO_CONFLICT;
    		          return plugin.jQueryInterface;
    		        };
    		      }
    		    });
    		  };

    		  const execute = callback => {
    		    if (typeof callback === 'function') {
    		      callback();
    		    }
    		  };

    		  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    		    if (!waitForTransition) {
    		      execute(callback);
    		      return;
    		    }

    		    const durationPadding = 5;
    		    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    		    let called = false;

    		    const handler = ({
    		      target
    		    }) => {
    		      if (target !== transitionElement) {
    		        return;
    		      }

    		      called = true;
    		      transitionElement.removeEventListener(TRANSITION_END, handler);
    		      execute(callback);
    		    };

    		    transitionElement.addEventListener(TRANSITION_END, handler);
    		    setTimeout(() => {
    		      if (!called) {
    		        triggerTransitionEnd(transitionElement);
    		      }
    		    }, emulatedDuration);
    		  };
    		  /**
    		   * Return the previous/next element of a list.
    		   *
    		   * @param {array} list    The list of elements
    		   * @param activeElement   The active element
    		   * @param shouldGetNext   Choose to get next or previous element
    		   * @param isCycleAllowed
    		   * @return {Element|elem} The proper element
    		   */


    		  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    		    const listLength = list.length;
    		    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
    		    // depending on the direction and if cycle is allowed

    		    if (index === -1) {
    		      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    		    }

    		    index += shouldGetNext ? 1 : -1;

    		    if (isCycleAllowed) {
    		      index = (index + listLength) % listLength;
    		    }

    		    return list[Math.max(0, Math.min(index, listLength - 1))];
    		  };

    		  exports.defineJQueryPlugin = defineJQueryPlugin;
    		  exports.execute = execute;
    		  exports.executeAfterTransition = executeAfterTransition;
    		  exports.findShadowRoot = findShadowRoot;
    		  exports.getElement = getElement;
    		  exports.getElementFromSelector = getElementFromSelector;
    		  exports.getNextActiveElement = getNextActiveElement;
    		  exports.getSelectorFromElement = getSelectorFromElement;
    		  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
    		  exports.getUID = getUID;
    		  exports.getjQuery = getjQuery;
    		  exports.isDisabled = isDisabled;
    		  exports.isElement = isElement;
    		  exports.isRTL = isRTL;
    		  exports.isVisible = isVisible;
    		  exports.noop = noop;
    		  exports.onDOMContentLoaded = onDOMContentLoaded;
    		  exports.reflow = reflow;
    		  exports.toType = toType;
    		  exports.triggerTransitionEnd = triggerTransitionEnd;

    		  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

    		}));
    		
    } (util, util.exports));
    	return util.exports;
    }

    var sanitizer = {exports: {}};

    /*!
      * Bootstrap sanitizer.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredSanitizer;

    function requireSanitizer () {
    	if (hasRequiredSanitizer) return sanitizer.exports;
    	hasRequiredSanitizer = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  factory(exports) ;
    		})(commonjsGlobal, (function (exports) {
    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/sanitizer.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
    		  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    		  /**
    		   * A pattern that recognizes a commonly useful subset of URLs that are safe.
    		   *
    		   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
    		   */

    		  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
    		  /**
    		   * A pattern that matches safe data URLs. Only matches image, video and audio types.
    		   *
    		   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
    		   */

    		  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

    		  const allowedAttribute = (attribute, allowedAttributeList) => {
    		    const attributeName = attribute.nodeName.toLowerCase();

    		    if (allowedAttributeList.includes(attributeName)) {
    		      if (uriAttributes.has(attributeName)) {
    		        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
    		      }

    		      return true;
    		    } // Check if a regular expression validates the attribute.


    		    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
    		  };

    		  const DefaultAllowlist = {
    		    // Global attributes allowed on any supplied element below.
    		    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    		    a: ['target', 'href', 'title', 'rel'],
    		    area: [],
    		    b: [],
    		    br: [],
    		    col: [],
    		    code: [],
    		    div: [],
    		    em: [],
    		    hr: [],
    		    h1: [],
    		    h2: [],
    		    h3: [],
    		    h4: [],
    		    h5: [],
    		    h6: [],
    		    i: [],
    		    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    		    li: [],
    		    ol: [],
    		    p: [],
    		    pre: [],
    		    s: [],
    		    small: [],
    		    span: [],
    		    sub: [],
    		    sup: [],
    		    strong: [],
    		    u: [],
    		    ul: []
    		  };
    		  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    		    if (!unsafeHtml.length) {
    		      return unsafeHtml;
    		    }

    		    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    		      return sanitizeFunction(unsafeHtml);
    		    }

    		    const domParser = new window.DOMParser();
    		    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    		    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

    		    for (const element of elements) {
    		      const elementName = element.nodeName.toLowerCase();

    		      if (!Object.keys(allowList).includes(elementName)) {
    		        element.remove();
    		        continue;
    		      }

    		      const attributeList = [].concat(...element.attributes);
    		      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);

    		      for (const attribute of attributeList) {
    		        if (!allowedAttribute(attribute, allowedAttributes)) {
    		          element.removeAttribute(attribute.nodeName);
    		        }
    		      }
    		    }

    		    return createdDocument.body.innerHTML;
    		  }

    		  exports.DefaultAllowlist = DefaultAllowlist;
    		  exports.sanitizeHtml = sanitizeHtml;

    		  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

    		}));
    		
    } (sanitizer, sanitizer.exports));
    	return sanitizer.exports;
    }

    var eventHandler = {exports: {}};

    /*!
      * Bootstrap event-handler.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredEventHandler;

    function requireEventHandler () {
    	if (hasRequiredEventHandler) return eventHandler.exports;
    	hasRequiredEventHandler = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireUtil()) ;
    		})(commonjsGlobal, (function (index) {
    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): dom/event-handler.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Constants
    		   */

    		  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    		  const stripNameRegex = /\..*/;
    		  const stripUidRegex = /::\d+$/;
    		  const eventRegistry = {}; // Events storage

    		  let uidEvent = 1;
    		  const customEvents = {
    		    mouseenter: 'mouseover',
    		    mouseleave: 'mouseout'
    		  };
    		  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
    		  /**
    		   * Private methods
    		   */

    		  function makeEventUid(element, uid) {
    		    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
    		  }

    		  function getElementEvents(element) {
    		    const uid = makeEventUid(element);
    		    element.uidEvent = uid;
    		    eventRegistry[uid] = eventRegistry[uid] || {};
    		    return eventRegistry[uid];
    		  }

    		  function bootstrapHandler(element, fn) {
    		    return function handler(event) {
    		      hydrateObj(event, {
    		        delegateTarget: element
    		      });

    		      if (handler.oneOff) {
    		        EventHandler.off(element, event.type, fn);
    		      }

    		      return fn.apply(element, [event]);
    		    };
    		  }

    		  function bootstrapDelegationHandler(element, selector, fn) {
    		    return function handler(event) {
    		      const domElements = element.querySelectorAll(selector);

    		      for (let {
    		        target
    		      } = event; target && target !== this; target = target.parentNode) {
    		        for (const domElement of domElements) {
    		          if (domElement !== target) {
    		            continue;
    		          }

    		          hydrateObj(event, {
    		            delegateTarget: target
    		          });

    		          if (handler.oneOff) {
    		            EventHandler.off(element, event.type, selector, fn);
    		          }

    		          return fn.apply(target, [event]);
    		        }
    		      }
    		    };
    		  }

    		  function findHandler(events, callable, delegationSelector = null) {
    		    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
    		  }

    		  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    		    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

    		    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    		    let typeEvent = getTypeEvent(originalTypeEvent);

    		    if (!nativeEvents.has(typeEvent)) {
    		      typeEvent = originalTypeEvent;
    		    }

    		    return [isDelegated, callable, typeEvent];
    		  }

    		  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    		    if (typeof originalTypeEvent !== 'string' || !element) {
    		      return;
    		    }

    		    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    		    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

    		    if (originalTypeEvent in customEvents) {
    		      const wrapFunction = fn => {
    		        return function (event) {
    		          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
    		            return fn.call(this, event);
    		          }
    		        };
    		      };

    		      callable = wrapFunction(callable);
    		    }

    		    const events = getElementEvents(element);
    		    const handlers = events[typeEvent] || (events[typeEvent] = {});
    		    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

    		    if (previousFunction) {
    		      previousFunction.oneOff = previousFunction.oneOff && oneOff;
    		      return;
    		    }

    		    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    		    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    		    fn.delegationSelector = isDelegated ? handler : null;
    		    fn.callable = callable;
    		    fn.oneOff = oneOff;
    		    fn.uidEvent = uid;
    		    handlers[uid] = fn;
    		    element.addEventListener(typeEvent, fn, isDelegated);
    		  }

    		  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    		    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    		    if (!fn) {
    		      return;
    		    }

    		    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    		    delete events[typeEvent][fn.uidEvent];
    		  }

    		  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    		    const storeElementEvent = events[typeEvent] || {};

    		    for (const handlerKey of Object.keys(storeElementEvent)) {
    		      if (handlerKey.includes(namespace)) {
    		        const event = storeElementEvent[handlerKey];
    		        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    		      }
    		    }
    		  }

    		  function getTypeEvent(event) {
    		    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    		    event = event.replace(stripNameRegex, '');
    		    return customEvents[event] || event;
    		  }

    		  const EventHandler = {
    		    on(element, event, handler, delegationFunction) {
    		      addHandler(element, event, handler, delegationFunction, false);
    		    },

    		    one(element, event, handler, delegationFunction) {
    		      addHandler(element, event, handler, delegationFunction, true);
    		    },

    		    off(element, originalTypeEvent, handler, delegationFunction) {
    		      if (typeof originalTypeEvent !== 'string' || !element) {
    		        return;
    		      }

    		      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    		      const inNamespace = typeEvent !== originalTypeEvent;
    		      const events = getElementEvents(element);
    		      const storeElementEvent = events[typeEvent] || {};
    		      const isNamespace = originalTypeEvent.startsWith('.');

    		      if (typeof callable !== 'undefined') {
    		        // Simplest case: handler is passed, remove that listener ONLY.
    		        if (!Object.keys(storeElementEvent).length) {
    		          return;
    		        }

    		        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
    		        return;
    		      }

    		      if (isNamespace) {
    		        for (const elementEvent of Object.keys(events)) {
    		          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
    		        }
    		      }

    		      for (const keyHandlers of Object.keys(storeElementEvent)) {
    		        const handlerKey = keyHandlers.replace(stripUidRegex, '');

    		        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
    		          const event = storeElementEvent[keyHandlers];
    		          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    		        }
    		      }
    		    },

    		    trigger(element, event, args) {
    		      if (typeof event !== 'string' || !element) {
    		        return null;
    		      }

    		      const $ = index.getjQuery();
    		      const typeEvent = getTypeEvent(event);
    		      const inNamespace = event !== typeEvent;
    		      let jQueryEvent = null;
    		      let bubbles = true;
    		      let nativeDispatch = true;
    		      let defaultPrevented = false;

    		      if (inNamespace && $) {
    		        jQueryEvent = $.Event(event, args);
    		        $(element).trigger(jQueryEvent);
    		        bubbles = !jQueryEvent.isPropagationStopped();
    		        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
    		        defaultPrevented = jQueryEvent.isDefaultPrevented();
    		      }

    		      let evt = new Event(event, {
    		        bubbles,
    		        cancelable: true
    		      });
    		      evt = hydrateObj(evt, args);

    		      if (defaultPrevented) {
    		        evt.preventDefault();
    		      }

    		      if (nativeDispatch) {
    		        element.dispatchEvent(evt);
    		      }

    		      if (evt.defaultPrevented && jQueryEvent) {
    		        jQueryEvent.preventDefault();
    		      }

    		      return evt;
    		    }

    		  };

    		  function hydrateObj(obj, meta) {
    		    for (const [key, value] of Object.entries(meta || {})) {
    		      try {
    		        obj[key] = value;
    		      } catch (_unused) {
    		        Object.defineProperty(obj, key, {
    		          configurable: true,

    		          get() {
    		            return value;
    		          }

    		        });
    		      }
    		    }

    		    return obj;
    		  }

    		  return EventHandler;

    		}));
    		
    } (eventHandler));
    	return eventHandler.exports;
    }

    var manipulator = {exports: {}};

    /*!
      * Bootstrap manipulator.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredManipulator;

    function requireManipulator () {
    	if (hasRequiredManipulator) return manipulator.exports;
    	hasRequiredManipulator = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory() ;
    		})(commonjsGlobal, (function () {
    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): dom/manipulator.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  function normalizeData(value) {
    		    if (value === 'true') {
    		      return true;
    		    }

    		    if (value === 'false') {
    		      return false;
    		    }

    		    if (value === Number(value).toString()) {
    		      return Number(value);
    		    }

    		    if (value === '' || value === 'null') {
    		      return null;
    		    }

    		    if (typeof value !== 'string') {
    		      return value;
    		    }

    		    try {
    		      return JSON.parse(decodeURIComponent(value));
    		    } catch (_unused) {
    		      return value;
    		    }
    		  }

    		  function normalizeDataKey(key) {
    		    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
    		  }

    		  const Manipulator = {
    		    setDataAttribute(element, key, value) {
    		      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    		    },

    		    removeDataAttribute(element, key) {
    		      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    		    },

    		    getDataAttributes(element) {
    		      if (!element) {
    		        return {};
    		      }

    		      const attributes = {};
    		      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

    		      for (const key of bsKeys) {
    		        let pureKey = key.replace(/^bs/, '');
    		        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
    		        attributes[pureKey] = normalizeData(element.dataset[key]);
    		      }

    		      return attributes;
    		    },

    		    getDataAttribute(element, key) {
    		      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    		    }

    		  };

    		  return Manipulator;

    		}));
    		
    } (manipulator));
    	return manipulator.exports;
    }

    var baseComponent = {exports: {}};

    var data = {exports: {}};

    /*!
      * Bootstrap data.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredData;

    function requireData () {
    	if (hasRequiredData) return data.exports;
    	hasRequiredData = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory() ;
    		})(commonjsGlobal, (function () {
    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): dom/data.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */

    		  /**
    		   * Constants
    		   */
    		  const elementMap = new Map();
    		  const data = {
    		    set(element, key, instance) {
    		      if (!elementMap.has(element)) {
    		        elementMap.set(element, new Map());
    		      }

    		      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
    		      // can be removed later when multiple key/instances are fine to be used

    		      if (!instanceMap.has(key) && instanceMap.size !== 0) {
    		        // eslint-disable-next-line no-console
    		        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
    		        return;
    		      }

    		      instanceMap.set(key, instance);
    		    },

    		    get(element, key) {
    		      if (elementMap.has(element)) {
    		        return elementMap.get(element).get(key) || null;
    		      }

    		      return null;
    		    },

    		    remove(element, key) {
    		      if (!elementMap.has(element)) {
    		        return;
    		      }

    		      const instanceMap = elementMap.get(element);
    		      instanceMap.delete(key); // free up element references if there are no instances left for an element

    		      if (instanceMap.size === 0) {
    		        elementMap.delete(element);
    		      }
    		    }

    		  };

    		  return data;

    		}));
    		
    } (data));
    	return data.exports;
    }

    var config = {exports: {}};

    /*!
      * Bootstrap config.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredConfig;

    function requireConfig () {
    	if (hasRequiredConfig) return config.exports;
    	hasRequiredConfig = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireUtil(), requireManipulator()) ;
    		})(commonjsGlobal, (function (index, Manipulator) {
    		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/config.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Class definition
    		   */

    		  class Config {
    		    // Getters
    		    static get Default() {
    		      return {};
    		    }

    		    static get DefaultType() {
    		      return {};
    		    }

    		    static get NAME() {
    		      throw new Error('You have to implement the static method "NAME", for each component!');
    		    }

    		    _getConfig(config) {
    		      config = this._mergeConfigObj(config);
    		      config = this._configAfterMerge(config);

    		      this._typeCheckConfig(config);

    		      return config;
    		    }

    		    _configAfterMerge(config) {
    		      return config;
    		    }

    		    _mergeConfigObj(config, element) {
    		      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

    		      return { ...this.constructor.Default,
    		        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
    		        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
    		        ...(typeof config === 'object' ? config : {})
    		      };
    		    }

    		    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    		      for (const property of Object.keys(configTypes)) {
    		        const expectedTypes = configTypes[property];
    		        const value = config[property];
    		        const valueType = index.isElement(value) ? 'element' : index.toType(value);

    		        if (!new RegExp(expectedTypes).test(valueType)) {
    		          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
    		        }
    		      }
    		    }

    		  }

    		  return Config;

    		}));
    		
    } (config));
    	return config.exports;
    }

    /*!
      * Bootstrap base-component.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredBaseComponent;

    function requireBaseComponent () {
    	if (hasRequiredBaseComponent) return baseComponent.exports;
    	hasRequiredBaseComponent = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig()) ;
    		})(commonjsGlobal, (function (Data, index, EventHandler, Config) {
    		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    		  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
    		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
    		  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): base-component.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Constants
    		   */

    		  const VERSION = '5.2.2';
    		  /**
    		   * Class definition
    		   */

    		  class BaseComponent extends Config__default.default {
    		    constructor(element, config) {
    		      super();
    		      element = index.getElement(element);

    		      if (!element) {
    		        return;
    		      }

    		      this._element = element;
    		      this._config = this._getConfig(config);
    		      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
    		    } // Public


    		    dispose() {
    		      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
    		      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);

    		      for (const propertyName of Object.getOwnPropertyNames(this)) {
    		        this[propertyName] = null;
    		      }
    		    }

    		    _queueCallback(callback, element, isAnimated = true) {
    		      index.executeAfterTransition(callback, element, isAnimated);
    		    }

    		    _getConfig(config) {
    		      config = this._mergeConfigObj(config, this._element);
    		      config = this._configAfterMerge(config);

    		      this._typeCheckConfig(config);

    		      return config;
    		    } // Static


    		    static getInstance(element) {
    		      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
    		    }

    		    static getOrCreateInstance(element, config = {}) {
    		      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    		    }

    		    static get VERSION() {
    		      return VERSION;
    		    }

    		    static get DATA_KEY() {
    		      return `bs.${this.NAME}`;
    		    }

    		    static get EVENT_KEY() {
    		      return `.${this.DATA_KEY}`;
    		    }

    		    static eventName(name) {
    		      return `${name}${this.EVENT_KEY}`;
    		    }

    		  }

    		  return BaseComponent;

    		}));
    		
    } (baseComponent));
    	return baseComponent.exports;
    }

    var templateFactory = {exports: {}};

    var selectorEngine = {exports: {}};

    /*!
      * Bootstrap selector-engine.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredSelectorEngine;

    function requireSelectorEngine () {
    	if (hasRequiredSelectorEngine) return selectorEngine.exports;
    	hasRequiredSelectorEngine = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireUtil()) ;
    		})(commonjsGlobal, (function (index) {
    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): dom/selector-engine.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Constants
    		   */

    		  const SelectorEngine = {
    		    find(selector, element = document.documentElement) {
    		      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    		    },

    		    findOne(selector, element = document.documentElement) {
    		      return Element.prototype.querySelector.call(element, selector);
    		    },

    		    children(element, selector) {
    		      return [].concat(...element.children).filter(child => child.matches(selector));
    		    },

    		    parents(element, selector) {
    		      const parents = [];
    		      let ancestor = element.parentNode.closest(selector);

    		      while (ancestor) {
    		        parents.push(ancestor);
    		        ancestor = ancestor.parentNode.closest(selector);
    		      }

    		      return parents;
    		    },

    		    prev(element, selector) {
    		      let previous = element.previousElementSibling;

    		      while (previous) {
    		        if (previous.matches(selector)) {
    		          return [previous];
    		        }

    		        previous = previous.previousElementSibling;
    		      }

    		      return [];
    		    },

    		    // TODO: this is now unused; remove later along with prev()
    		    next(element, selector) {
    		      let next = element.nextElementSibling;

    		      while (next) {
    		        if (next.matches(selector)) {
    		          return [next];
    		        }

    		        next = next.nextElementSibling;
    		      }

    		      return [];
    		    },

    		    focusableChildren(element) {
    		      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
    		      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
    		    }

    		  };

    		  return SelectorEngine;

    		}));
    		
    } (selectorEngine));
    	return selectorEngine.exports;
    }

    /*!
      * Bootstrap template-factory.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredTemplateFactory;

    function requireTemplateFactory () {
    	if (hasRequiredTemplateFactory) return templateFactory.exports;
    	hasRequiredTemplateFactory = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireSanitizer(), requireUtil(), requireSelectorEngine(), requireConfig()) ;
    		})(commonjsGlobal, (function (sanitizer, index, SelectorEngine, Config) {
    		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
    		  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/template-factory.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Constants
    		   */

    		  const NAME = 'TemplateFactory';
    		  const Default = {
    		    allowList: sanitizer.DefaultAllowlist,
    		    content: {},
    		    // { selector : text ,  selector2 : text2 , }
    		    extraClass: '',
    		    html: false,
    		    sanitize: true,
    		    sanitizeFn: null,
    		    template: '<div></div>'
    		  };
    		  const DefaultType = {
    		    allowList: 'object',
    		    content: 'object',
    		    extraClass: '(string|function)',
    		    html: 'boolean',
    		    sanitize: 'boolean',
    		    sanitizeFn: '(null|function)',
    		    template: 'string'
    		  };
    		  const DefaultContentType = {
    		    entry: '(string|element|function|null)',
    		    selector: '(string|element)'
    		  };
    		  /**
    		   * Class definition
    		   */

    		  class TemplateFactory extends Config__default.default {
    		    constructor(config) {
    		      super();
    		      this._config = this._getConfig(config);
    		    } // Getters


    		    static get Default() {
    		      return Default;
    		    }

    		    static get DefaultType() {
    		      return DefaultType;
    		    }

    		    static get NAME() {
    		      return NAME;
    		    } // Public


    		    getContent() {
    		      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    		    }

    		    hasContent() {
    		      return this.getContent().length > 0;
    		    }

    		    changeContent(content) {
    		      this._checkContent(content);

    		      this._config.content = { ...this._config.content,
    		        ...content
    		      };
    		      return this;
    		    }

    		    toHtml() {
    		      const templateWrapper = document.createElement('div');
    		      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);

    		      for (const [selector, text] of Object.entries(this._config.content)) {
    		        this._setContent(templateWrapper, text, selector);
    		      }

    		      const template = templateWrapper.children[0];

    		      const extraClass = this._resolvePossibleFunction(this._config.extraClass);

    		      if (extraClass) {
    		        template.classList.add(...extraClass.split(' '));
    		      }

    		      return template;
    		    } // Private


    		    _typeCheckConfig(config) {
    		      super._typeCheckConfig(config);

    		      this._checkContent(config.content);
    		    }

    		    _checkContent(arg) {
    		      for (const [selector, content] of Object.entries(arg)) {
    		        super._typeCheckConfig({
    		          selector,
    		          entry: content
    		        }, DefaultContentType);
    		      }
    		    }

    		    _setContent(template, content, selector) {
    		      const templateElement = SelectorEngine__default.default.findOne(selector, template);

    		      if (!templateElement) {
    		        return;
    		      }

    		      content = this._resolvePossibleFunction(content);

    		      if (!content) {
    		        templateElement.remove();
    		        return;
    		      }

    		      if (index.isElement(content)) {
    		        this._putElementInTemplate(index.getElement(content), templateElement);

    		        return;
    		      }

    		      if (this._config.html) {
    		        templateElement.innerHTML = this._maybeSanitize(content);
    		        return;
    		      }

    		      templateElement.textContent = content;
    		    }

    		    _maybeSanitize(arg) {
    		      return this._config.sanitize ? sanitizer.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    		    }

    		    _resolvePossibleFunction(arg) {
    		      return typeof arg === 'function' ? arg(this) : arg;
    		    }

    		    _putElementInTemplate(element, templateElement) {
    		      if (this._config.html) {
    		        templateElement.innerHTML = '';
    		        templateElement.append(element);
    		        return;
    		      }

    		      templateElement.textContent = element.textContent;
    		    }

    		  }

    		  return TemplateFactory;

    		}));
    		
    } (templateFactory));
    	return templateFactory.exports;
    }

    /*!
      * Bootstrap tooltip.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    (function (module, exports) {
    	(function (global, factory) {
    	  module.exports = factory(require$$0, requireUtil(), requireSanitizer(), requireEventHandler(), requireManipulator(), requireBaseComponent(), requireTemplateFactory()) ;
    	})(commonjsGlobal, (function (Popper, index, sanitizer, EventHandler, Manipulator, BaseComponent, TemplateFactory) {
    	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    	  function _interopNamespace(e) {
    	    if (e && e.__esModule) return e;
    	    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    	    if (e) {
    	      for (const k in e) {
    	        if (k !== 'default') {
    	          const d = Object.getOwnPropertyDescriptor(e, k);
    	          Object.defineProperty(n, k, d.get ? d : {
    	            enumerable: true,
    	            get: () => e[k]
    	          });
    	        }
    	      }
    	    }
    	    n.default = e;
    	    return Object.freeze(n);
    	  }

    	  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
    	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
    	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
    	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    	  const TemplateFactory__default = /*#__PURE__*/_interopDefaultLegacy(TemplateFactory);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap (v5.2.2): tooltip.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */
    	  /**
    	   * Constants
    	   */

    	  const NAME = 'tooltip';
    	  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
    	  const CLASS_NAME_FADE = 'fade';
    	  const CLASS_NAME_MODAL = 'modal';
    	  const CLASS_NAME_SHOW = 'show';
    	  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
    	  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
    	  const EVENT_MODAL_HIDE = 'hide.bs.modal';
    	  const TRIGGER_HOVER = 'hover';
    	  const TRIGGER_FOCUS = 'focus';
    	  const TRIGGER_CLICK = 'click';
    	  const TRIGGER_MANUAL = 'manual';
    	  const EVENT_HIDE = 'hide';
    	  const EVENT_HIDDEN = 'hidden';
    	  const EVENT_SHOW = 'show';
    	  const EVENT_SHOWN = 'shown';
    	  const EVENT_INSERTED = 'inserted';
    	  const EVENT_CLICK = 'click';
    	  const EVENT_FOCUSIN = 'focusin';
    	  const EVENT_FOCUSOUT = 'focusout';
    	  const EVENT_MOUSEENTER = 'mouseenter';
    	  const EVENT_MOUSELEAVE = 'mouseleave';
    	  const AttachmentMap = {
    	    AUTO: 'auto',
    	    TOP: 'top',
    	    RIGHT: index.isRTL() ? 'left' : 'right',
    	    BOTTOM: 'bottom',
    	    LEFT: index.isRTL() ? 'right' : 'left'
    	  };
    	  const Default = {
    	    allowList: sanitizer.DefaultAllowlist,
    	    animation: true,
    	    boundary: 'clippingParents',
    	    container: false,
    	    customClass: '',
    	    delay: 0,
    	    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    	    html: false,
    	    offset: [0, 0],
    	    placement: 'top',
    	    popperConfig: null,
    	    sanitize: true,
    	    sanitizeFn: null,
    	    selector: false,
    	    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    	    title: '',
    	    trigger: 'hover focus'
    	  };
    	  const DefaultType = {
    	    allowList: 'object',
    	    animation: 'boolean',
    	    boundary: '(string|element)',
    	    container: '(string|element|boolean)',
    	    customClass: '(string|function)',
    	    delay: '(number|object)',
    	    fallbackPlacements: 'array',
    	    html: 'boolean',
    	    offset: '(array|string|function)',
    	    placement: '(string|function)',
    	    popperConfig: '(null|object|function)',
    	    sanitize: 'boolean',
    	    sanitizeFn: '(null|function)',
    	    selector: '(string|boolean)',
    	    template: 'string',
    	    title: '(string|element|function)',
    	    trigger: 'string'
    	  };
    	  /**
    	   * Class definition
    	   */

    	  class Tooltip extends BaseComponent__default.default {
    	    constructor(element, config) {
    	      if (typeof Popper__namespace === 'undefined') {
    	        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    	      }

    	      super(element, config); // Private

    	      this._isEnabled = true;
    	      this._timeout = 0;
    	      this._isHovered = null;
    	      this._activeTrigger = {};
    	      this._popper = null;
    	      this._templateFactory = null;
    	      this._newContent = null; // Protected

    	      this.tip = null;

    	      this._setListeners();

    	      if (!this._config.selector) {
    	        this._fixTitle();
    	      }
    	    } // Getters


    	    static get Default() {
    	      return Default;
    	    }

    	    static get DefaultType() {
    	      return DefaultType;
    	    }

    	    static get NAME() {
    	      return NAME;
    	    } // Public


    	    enable() {
    	      this._isEnabled = true;
    	    }

    	    disable() {
    	      this._isEnabled = false;
    	    }

    	    toggleEnabled() {
    	      this._isEnabled = !this._isEnabled;
    	    }

    	    toggle() {
    	      if (!this._isEnabled) {
    	        return;
    	      }

    	      this._activeTrigger.click = !this._activeTrigger.click;

    	      if (this._isShown()) {
    	        this._leave();

    	        return;
    	      }

    	      this._enter();
    	    }

    	    dispose() {
    	      clearTimeout(this._timeout);
    	      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

    	      if (this.tip) {
    	        this.tip.remove();
    	      }

    	      if (this._element.getAttribute('data-bs-original-title')) {
    	        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
    	      }

    	      this._disposePopper();

    	      super.dispose();
    	    }

    	    show() {
    	      if (this._element.style.display === 'none') {
    	        throw new Error('Please use show on visible elements');
    	      }

    	      if (!(this._isWithContent() && this._isEnabled)) {
    	        return;
    	      }

    	      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
    	      const shadowRoot = index.findShadowRoot(this._element);

    	      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);

    	      if (showEvent.defaultPrevented || !isInTheDom) {
    	        return;
    	      } // todo v6 remove this OR make it optional


    	      if (this.tip) {
    	        this.tip.remove();
    	        this.tip = null;
    	      }

    	      const tip = this._getTipElement();

    	      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));

    	      const {
    	        container
    	      } = this._config;

    	      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
    	        container.append(tip);
    	        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    	      }

    	      if (this._popper) {
    	        this._popper.update();
    	      } else {
    	        this._popper = this._createPopper(tip);
    	      }

    	      tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
    	      // empty mouseover listeners to the body's immediate children;
    	      // only needed because of broken event delegation on iOS
    	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

    	      if ('ontouchstart' in document.documentElement) {
    	        for (const element of [].concat(...document.body.children)) {
    	          EventHandler__default.default.on(element, 'mouseover', index.noop);
    	        }
    	      }

    	      const complete = () => {
    	        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));

    	        if (this._isHovered === false) {
    	          this._leave();
    	        }

    	        this._isHovered = false;
    	      };

    	      this._queueCallback(complete, this.tip, this._isAnimated());
    	    }

    	    hide() {
    	      if (!this._isShown()) {
    	        return;
    	      }

    	      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDE));

    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }

    	      const tip = this._getTipElement();

    	      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
    	      // empty mouseover listeners we added for iOS support

    	      if ('ontouchstart' in document.documentElement) {
    	        for (const element of [].concat(...document.body.children)) {
    	          EventHandler__default.default.off(element, 'mouseover', index.noop);
    	        }
    	      }

    	      this._activeTrigger[TRIGGER_CLICK] = false;
    	      this._activeTrigger[TRIGGER_FOCUS] = false;
    	      this._activeTrigger[TRIGGER_HOVER] = false;
    	      this._isHovered = null; // it is a trick to support manual triggering

    	      const complete = () => {
    	        if (this._isWithActiveTrigger()) {
    	          return;
    	        }

    	        if (!this._isHovered) {
    	          tip.remove();
    	        }

    	        this._element.removeAttribute('aria-describedby');

    	        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));

    	        this._disposePopper();
    	      };

    	      this._queueCallback(complete, this.tip, this._isAnimated());
    	    }

    	    update() {
    	      if (this._popper) {
    	        this._popper.update();
    	      }
    	    } // Protected


    	    _isWithContent() {
    	      return Boolean(this._getTitle());
    	    }

    	    _getTipElement() {
    	      if (!this.tip) {
    	        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    	      }

    	      return this.tip;
    	    }

    	    _createTipElement(content) {
    	      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6


    	      if (!tip) {
    	        return null;
    	      }

    	      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW); // todo: on v6 the following can be achieved with CSS only

    	      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    	      const tipId = index.getUID(this.constructor.NAME).toString();
    	      tip.setAttribute('id', tipId);

    	      if (this._isAnimated()) {
    	        tip.classList.add(CLASS_NAME_FADE);
    	      }

    	      return tip;
    	    }

    	    setContent(content) {
    	      this._newContent = content;

    	      if (this._isShown()) {
    	        this._disposePopper();

    	        this.show();
    	      }
    	    }

    	    _getTemplateFactory(content) {
    	      if (this._templateFactory) {
    	        this._templateFactory.changeContent(content);
    	      } else {
    	        this._templateFactory = new TemplateFactory__default.default({ ...this._config,
    	          // the `content` var has to be after `this._config`
    	          // to override config.content in case of popover
    	          content,
    	          extraClass: this._resolvePossibleFunction(this._config.customClass)
    	        });
    	      }

    	      return this._templateFactory;
    	    }

    	    _getContentForTemplate() {
    	      return {
    	        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    	      };
    	    }

    	    _getTitle() {
    	      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    	    } // Private


    	    _initializeOnDelegatedTarget(event) {
    	      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    	    }

    	    _isAnimated() {
    	      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
    	    }

    	    _isShown() {
    	      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
    	    }

    	    _createPopper(tip) {
    	      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
    	      const attachment = AttachmentMap[placement.toUpperCase()];
    	      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
    	    }

    	    _getOffset() {
    	      const {
    	        offset
    	      } = this._config;

    	      if (typeof offset === 'string') {
    	        return offset.split(',').map(value => Number.parseInt(value, 10));
    	      }

    	      if (typeof offset === 'function') {
    	        return popperData => offset(popperData, this._element);
    	      }

    	      return offset;
    	    }

    	    _resolvePossibleFunction(arg) {
    	      return typeof arg === 'function' ? arg.call(this._element) : arg;
    	    }

    	    _getPopperConfig(attachment) {
    	      const defaultBsPopperConfig = {
    	        placement: attachment,
    	        modifiers: [{
    	          name: 'flip',
    	          options: {
    	            fallbackPlacements: this._config.fallbackPlacements
    	          }
    	        }, {
    	          name: 'offset',
    	          options: {
    	            offset: this._getOffset()
    	          }
    	        }, {
    	          name: 'preventOverflow',
    	          options: {
    	            boundary: this._config.boundary
    	          }
    	        }, {
    	          name: 'arrow',
    	          options: {
    	            element: `.${this.constructor.NAME}-arrow`
    	          }
    	        }, {
    	          name: 'preSetPlacement',
    	          enabled: true,
    	          phase: 'beforeMain',
    	          fn: data => {
    	            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
    	            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
    	            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
    	          }
    	        }]
    	      };
    	      return { ...defaultBsPopperConfig,
    	        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
    	      };
    	    }

    	    _setListeners() {
    	      const triggers = this._config.trigger.split(' ');

    	      for (const trigger of triggers) {
    	        if (trigger === 'click') {
    	          EventHandler__default.default.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
    	            const context = this._initializeOnDelegatedTarget(event);

    	            context.toggle();
    	          });
    	        } else if (trigger !== TRIGGER_MANUAL) {
    	          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
    	          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
    	          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => {
    	            const context = this._initializeOnDelegatedTarget(event);

    	            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

    	            context._enter();
    	          });
    	          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => {
    	            const context = this._initializeOnDelegatedTarget(event);

    	            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);

    	            context._leave();
    	          });
    	        }
    	      }

    	      this._hideModalHandler = () => {
    	        if (this._element) {
    	          this.hide();
    	        }
    	      };

    	      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    	    }

    	    _fixTitle() {
    	      const title = this._element.getAttribute('title');

    	      if (!title) {
    	        return;
    	      }

    	      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
    	        this._element.setAttribute('aria-label', title);
    	      }

    	      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility


    	      this._element.removeAttribute('title');
    	    }

    	    _enter() {
    	      if (this._isShown() || this._isHovered) {
    	        this._isHovered = true;
    	        return;
    	      }

    	      this._isHovered = true;

    	      this._setTimeout(() => {
    	        if (this._isHovered) {
    	          this.show();
    	        }
    	      }, this._config.delay.show);
    	    }

    	    _leave() {
    	      if (this._isWithActiveTrigger()) {
    	        return;
    	      }

    	      this._isHovered = false;

    	      this._setTimeout(() => {
    	        if (!this._isHovered) {
    	          this.hide();
    	        }
    	      }, this._config.delay.hide);
    	    }

    	    _setTimeout(handler, timeout) {
    	      clearTimeout(this._timeout);
    	      this._timeout = setTimeout(handler, timeout);
    	    }

    	    _isWithActiveTrigger() {
    	      return Object.values(this._activeTrigger).includes(true);
    	    }

    	    _getConfig(config) {
    	      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);

    	      for (const dataAttribute of Object.keys(dataAttributes)) {
    	        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
    	          delete dataAttributes[dataAttribute];
    	        }
    	      }

    	      config = { ...dataAttributes,
    	        ...(typeof config === 'object' && config ? config : {})
    	      };
    	      config = this._mergeConfigObj(config);
    	      config = this._configAfterMerge(config);

    	      this._typeCheckConfig(config);

    	      return config;
    	    }

    	    _configAfterMerge(config) {
    	      config.container = config.container === false ? document.body : index.getElement(config.container);

    	      if (typeof config.delay === 'number') {
    	        config.delay = {
    	          show: config.delay,
    	          hide: config.delay
    	        };
    	      }

    	      if (typeof config.title === 'number') {
    	        config.title = config.title.toString();
    	      }

    	      if (typeof config.content === 'number') {
    	        config.content = config.content.toString();
    	      }

    	      return config;
    	    }

    	    _getDelegateConfig() {
    	      const config = {};

    	      for (const key in this._config) {
    	        if (this.constructor.Default[key] !== this._config[key]) {
    	          config[key] = this._config[key];
    	        }
    	      }

    	      config.selector = false;
    	      config.trigger = 'manual'; // In the future can be replaced with:
    	      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
    	      // `Object.fromEntries(keysWithDifferentValues)`

    	      return config;
    	    }

    	    _disposePopper() {
    	      if (this._popper) {
    	        this._popper.destroy();

    	        this._popper = null;
    	      }
    	    } // Static


    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Tooltip.getOrCreateInstance(this, config);

    	        if (typeof config !== 'string') {
    	          return;
    	        }

    	        if (typeof data[config] === 'undefined') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }

    	        data[config]();
    	      });
    	    }

    	  }
    	  /**
    	   * jQuery
    	   */


    	  index.defineJQueryPlugin(Tooltip);

    	  return Tooltip;

    	}));
    	
    } (tooltip));

    var Tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip.exports);

    function run(callback) {
        for (let e of document.querySelectorAll("[data-bs-toggle='tooltip']")) {
            callback(Tooltip.getInstance(e), e);
        }
    }
    const hideTooltips = () => {
        run((instance, e) => {
            if (instance) {
                instance.hide();
            }
        });
    };
    const createTooltips = () => {
        run((instance, e) => {
            if (!instance || (instance && e.hasAttribute("title"))) {
                new Tooltip(e);
            }
        });
    };

    var offcanvas$1 = {exports: {}};

    var scrollbar = {exports: {}};

    /*!
      * Bootstrap scrollbar.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredScrollbar;

    function requireScrollbar () {
    	if (hasRequiredScrollbar) return scrollbar.exports;
    	hasRequiredScrollbar = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil()) ;
    		})(commonjsGlobal, (function (SelectorEngine, Manipulator, index) {
    		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
    		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/scrollBar.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Constants
    		   */

    		  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
    		  const SELECTOR_STICKY_CONTENT = '.sticky-top';
    		  const PROPERTY_PADDING = 'padding-right';
    		  const PROPERTY_MARGIN = 'margin-right';
    		  /**
    		   * Class definition
    		   */

    		  class ScrollBarHelper {
    		    constructor() {
    		      this._element = document.body;
    		    } // Public


    		    getWidth() {
    		      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    		      const documentWidth = document.documentElement.clientWidth;
    		      return Math.abs(window.innerWidth - documentWidth);
    		    }

    		    hide() {
    		      const width = this.getWidth();

    		      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


    		      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


    		      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);

    		      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    		    }

    		    reset() {
    		      this._resetElementAttributes(this._element, 'overflow');

    		      this._resetElementAttributes(this._element, PROPERTY_PADDING);

    		      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

    		      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    		    }

    		    isOverflowing() {
    		      return this.getWidth() > 0;
    		    } // Private


    		    _disableOverFlow() {
    		      this._saveInitialAttribute(this._element, 'overflow');

    		      this._element.style.overflow = 'hidden';
    		    }

    		    _setElementAttributes(selector, styleProperty, callback) {
    		      const scrollbarWidth = this.getWidth();

    		      const manipulationCallBack = element => {
    		        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
    		          return;
    		        }

    		        this._saveInitialAttribute(element, styleProperty);

    		        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
    		        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    		      };

    		      this._applyManipulationCallback(selector, manipulationCallBack);
    		    }

    		    _saveInitialAttribute(element, styleProperty) {
    		      const actualValue = element.style.getPropertyValue(styleProperty);

    		      if (actualValue) {
    		        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
    		      }
    		    }

    		    _resetElementAttributes(selector, styleProperty) {
    		      const manipulationCallBack = element => {
    		        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

    		        if (value === null) {
    		          element.style.removeProperty(styleProperty);
    		          return;
    		        }

    		        Manipulator__default.default.removeDataAttribute(element, styleProperty);
    		        element.style.setProperty(styleProperty, value);
    		      };

    		      this._applyManipulationCallback(selector, manipulationCallBack);
    		    }

    		    _applyManipulationCallback(selector, callBack) {
    		      if (index.isElement(selector)) {
    		        callBack(selector);
    		        return;
    		      }

    		      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
    		        callBack(sel);
    		      }
    		    }

    		  }

    		  return ScrollBarHelper;

    		}));
    		
    } (scrollbar));
    	return scrollbar.exports;
    }

    var backdrop = {exports: {}};

    /*!
      * Bootstrap backdrop.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredBackdrop;

    function requireBackdrop () {
    	if (hasRequiredBackdrop) return backdrop.exports;
    	hasRequiredBackdrop = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireEventHandler(), requireUtil(), requireConfig()) ;
    		})(commonjsGlobal, (function (EventHandler, index, Config) {
    		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
    		  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/backdrop.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Constants
    		   */

    		  const NAME = 'backdrop';
    		  const CLASS_NAME_FADE = 'fade';
    		  const CLASS_NAME_SHOW = 'show';
    		  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
    		  const Default = {
    		    className: 'modal-backdrop',
    		    clickCallback: null,
    		    isAnimated: false,
    		    isVisible: true,
    		    // if false, we use the backdrop helper without adding any element to the dom
    		    rootElement: 'body' // give the choice to place backdrop under different elements

    		  };
    		  const DefaultType = {
    		    className: 'string',
    		    clickCallback: '(function|null)',
    		    isAnimated: 'boolean',
    		    isVisible: 'boolean',
    		    rootElement: '(element|string)'
    		  };
    		  /**
    		   * Class definition
    		   */

    		  class Backdrop extends Config__default.default {
    		    constructor(config) {
    		      super();
    		      this._config = this._getConfig(config);
    		      this._isAppended = false;
    		      this._element = null;
    		    } // Getters


    		    static get Default() {
    		      return Default;
    		    }

    		    static get DefaultType() {
    		      return DefaultType;
    		    }

    		    static get NAME() {
    		      return NAME;
    		    } // Public


    		    show(callback) {
    		      if (!this._config.isVisible) {
    		        index.execute(callback);
    		        return;
    		      }

    		      this._append();

    		      const element = this._getElement();

    		      if (this._config.isAnimated) {
    		        index.reflow(element);
    		      }

    		      element.classList.add(CLASS_NAME_SHOW);

    		      this._emulateAnimation(() => {
    		        index.execute(callback);
    		      });
    		    }

    		    hide(callback) {
    		      if (!this._config.isVisible) {
    		        index.execute(callback);
    		        return;
    		      }

    		      this._getElement().classList.remove(CLASS_NAME_SHOW);

    		      this._emulateAnimation(() => {
    		        this.dispose();
    		        index.execute(callback);
    		      });
    		    }

    		    dispose() {
    		      if (!this._isAppended) {
    		        return;
    		      }

    		      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

    		      this._element.remove();

    		      this._isAppended = false;
    		    } // Private


    		    _getElement() {
    		      if (!this._element) {
    		        const backdrop = document.createElement('div');
    		        backdrop.className = this._config.className;

    		        if (this._config.isAnimated) {
    		          backdrop.classList.add(CLASS_NAME_FADE);
    		        }

    		        this._element = backdrop;
    		      }

    		      return this._element;
    		    }

    		    _configAfterMerge(config) {
    		      // use getElement() with the default "body" to get a fresh Element on each instantiation
    		      config.rootElement = index.getElement(config.rootElement);
    		      return config;
    		    }

    		    _append() {
    		      if (this._isAppended) {
    		        return;
    		      }

    		      const element = this._getElement();

    		      this._config.rootElement.append(element);

    		      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
    		        index.execute(this._config.clickCallback);
    		      });
    		      this._isAppended = true;
    		    }

    		    _emulateAnimation(callback) {
    		      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    		    }

    		  }

    		  return Backdrop;

    		}));
    		
    } (backdrop));
    	return backdrop.exports;
    }

    var focustrap = {exports: {}};

    /*!
      * Bootstrap focustrap.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredFocustrap;

    function requireFocustrap () {
    	if (hasRequiredFocustrap) return focustrap.exports;
    	hasRequiredFocustrap = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) ;
    		})(commonjsGlobal, (function (EventHandler, SelectorEngine, Config) {
    		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
    		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
    		  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/focustrap.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */
    		  /**
    		   * Constants
    		   */

    		  const NAME = 'focustrap';
    		  const DATA_KEY = 'bs.focustrap';
    		  const EVENT_KEY = `.${DATA_KEY}`;
    		  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
    		  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
    		  const TAB_KEY = 'Tab';
    		  const TAB_NAV_FORWARD = 'forward';
    		  const TAB_NAV_BACKWARD = 'backward';
    		  const Default = {
    		    autofocus: true,
    		    trapElement: null // The element to trap focus inside of

    		  };
    		  const DefaultType = {
    		    autofocus: 'boolean',
    		    trapElement: 'element'
    		  };
    		  /**
    		   * Class definition
    		   */

    		  class FocusTrap extends Config__default.default {
    		    constructor(config) {
    		      super();
    		      this._config = this._getConfig(config);
    		      this._isActive = false;
    		      this._lastTabNavDirection = null;
    		    } // Getters


    		    static get Default() {
    		      return Default;
    		    }

    		    static get DefaultType() {
    		      return DefaultType;
    		    }

    		    static get NAME() {
    		      return NAME;
    		    } // Public


    		    activate() {
    		      if (this._isActive) {
    		        return;
    		      }

    		      if (this._config.autofocus) {
    		        this._config.trapElement.focus();
    		      }

    		      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

    		      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
    		      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
    		      this._isActive = true;
    		    }

    		    deactivate() {
    		      if (!this._isActive) {
    		        return;
    		      }

    		      this._isActive = false;
    		      EventHandler__default.default.off(document, EVENT_KEY);
    		    } // Private


    		    _handleFocusin(event) {
    		      const {
    		        trapElement
    		      } = this._config;

    		      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
    		        return;
    		      }

    		      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

    		      if (elements.length === 0) {
    		        trapElement.focus();
    		      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
    		        elements[elements.length - 1].focus();
    		      } else {
    		        elements[0].focus();
    		      }
    		    }

    		    _handleKeydown(event) {
    		      if (event.key !== TAB_KEY) {
    		        return;
    		      }

    		      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    		    }

    		  }

    		  return FocusTrap;

    		}));
    		
    } (focustrap));
    	return focustrap.exports;
    }

    var componentFunctions = {exports: {}};

    /*!
      * Bootstrap component-functions.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    var hasRequiredComponentFunctions;

    function requireComponentFunctions () {
    	if (hasRequiredComponentFunctions) return componentFunctions.exports;
    	hasRequiredComponentFunctions = 1;
    	(function (module, exports) {
    		(function (global, factory) {
    		  factory(exports, requireEventHandler(), requireUtil()) ;
    		})(commonjsGlobal, (function (exports, EventHandler, index) {
    		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

    		  /**
    		   * --------------------------------------------------------------------------
    		   * Bootstrap (v5.2.2): util/component-functions.js
    		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    		   * --------------------------------------------------------------------------
    		   */

    		  const enableDismissTrigger = (component, method = 'hide') => {
    		    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    		    const name = component.NAME;
    		    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
    		      if (['A', 'AREA'].includes(this.tagName)) {
    		        event.preventDefault();
    		      }

    		      if (index.isDisabled(this)) {
    		        return;
    		      }

    		      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
    		      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

    		      instance[method]();
    		    });
    		  };

    		  exports.enableDismissTrigger = enableDismissTrigger;

    		  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

    		}));
    		
    } (componentFunctions, componentFunctions.exports));
    	return componentFunctions.exports;
    }

    /*!
      * Bootstrap offcanvas.js v5.2.2 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    (function (module, exports) {
    	(function (global, factory) {
    	  module.exports = factory(requireUtil(), requireScrollbar(), requireEventHandler(), requireBaseComponent(), requireSelectorEngine(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
    	})(commonjsGlobal, (function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) {
    	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

    	  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
    	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
    	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
    	  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
    	  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap (v5.2.2): offcanvas.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */
    	  /**
    	   * Constants
    	   */

    	  const NAME = 'offcanvas';
    	  const DATA_KEY = 'bs.offcanvas';
    	  const EVENT_KEY = `.${DATA_KEY}`;
    	  const DATA_API_KEY = '.data-api';
    	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
    	  const ESCAPE_KEY = 'Escape';
    	  const CLASS_NAME_SHOW = 'show';
    	  const CLASS_NAME_SHOWING = 'showing';
    	  const CLASS_NAME_HIDING = 'hiding';
    	  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
    	  const OPEN_SELECTOR = '.offcanvas.show';
    	  const EVENT_SHOW = `show${EVENT_KEY}`;
    	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
    	  const EVENT_HIDE = `hide${EVENT_KEY}`;
    	  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
    	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
    	  const EVENT_RESIZE = `resize${EVENT_KEY}`;
    	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
    	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
    	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
    	  const Default = {
    	    backdrop: true,
    	    keyboard: true,
    	    scroll: false
    	  };
    	  const DefaultType = {
    	    backdrop: '(boolean|string)',
    	    keyboard: 'boolean',
    	    scroll: 'boolean'
    	  };
    	  /**
    	   * Class definition
    	   */

    	  class Offcanvas extends BaseComponent__default.default {
    	    constructor(element, config) {
    	      super(element, config);
    	      this._isShown = false;
    	      this._backdrop = this._initializeBackDrop();
    	      this._focustrap = this._initializeFocusTrap();

    	      this._addEventListeners();
    	    } // Getters


    	    static get Default() {
    	      return Default;
    	    }

    	    static get DefaultType() {
    	      return DefaultType;
    	    }

    	    static get NAME() {
    	      return NAME;
    	    } // Public


    	    toggle(relatedTarget) {
    	      return this._isShown ? this.hide() : this.show(relatedTarget);
    	    }

    	    show(relatedTarget) {
    	      if (this._isShown) {
    	        return;
    	      }

    	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
    	        relatedTarget
    	      });

    	      if (showEvent.defaultPrevented) {
    	        return;
    	      }

    	      this._isShown = true;

    	      this._backdrop.show();

    	      if (!this._config.scroll) {
    	        new ScrollBarHelper__default.default().hide();
    	      }

    	      this._element.setAttribute('aria-modal', true);

    	      this._element.setAttribute('role', 'dialog');

    	      this._element.classList.add(CLASS_NAME_SHOWING);

    	      const completeCallBack = () => {
    	        if (!this._config.scroll || this._config.backdrop) {
    	          this._focustrap.activate();
    	        }

    	        this._element.classList.add(CLASS_NAME_SHOW);

    	        this._element.classList.remove(CLASS_NAME_SHOWING);

    	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
    	          relatedTarget
    	        });
    	      };

    	      this._queueCallback(completeCallBack, this._element, true);
    	    }

    	    hide() {
    	      if (!this._isShown) {
    	        return;
    	      }

    	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }

    	      this._focustrap.deactivate();

    	      this._element.blur();

    	      this._isShown = false;

    	      this._element.classList.add(CLASS_NAME_HIDING);

    	      this._backdrop.hide();

    	      const completeCallback = () => {
    	        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);

    	        this._element.removeAttribute('aria-modal');

    	        this._element.removeAttribute('role');

    	        if (!this._config.scroll) {
    	          new ScrollBarHelper__default.default().reset();
    	        }

    	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
    	      };

    	      this._queueCallback(completeCallback, this._element, true);
    	    }

    	    dispose() {
    	      this._backdrop.dispose();

    	      this._focustrap.deactivate();

    	      super.dispose();
    	    } // Private


    	    _initializeBackDrop() {
    	      const clickCallback = () => {
    	        if (this._config.backdrop === 'static') {
    	          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
    	          return;
    	        }

    	        this.hide();
    	      }; // 'static' option will be translated to true, and booleans will keep their value


    	      const isVisible = Boolean(this._config.backdrop);
    	      return new Backdrop__default.default({
    	        className: CLASS_NAME_BACKDROP,
    	        isVisible,
    	        isAnimated: true,
    	        rootElement: this._element.parentNode,
    	        clickCallback: isVisible ? clickCallback : null
    	      });
    	    }

    	    _initializeFocusTrap() {
    	      return new FocusTrap__default.default({
    	        trapElement: this._element
    	      });
    	    }

    	    _addEventListeners() {
    	      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
    	        if (event.key !== ESCAPE_KEY) {
    	          return;
    	        }

    	        if (!this._config.keyboard) {
    	          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
    	          return;
    	        }

    	        this.hide();
    	      });
    	    } // Static


    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Offcanvas.getOrCreateInstance(this, config);

    	        if (typeof config !== 'string') {
    	          return;
    	        }

    	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }

    	        data[config](this);
    	      });
    	    }

    	  }
    	  /**
    	   * Data API implementation
    	   */


    	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    	    const target = index.getElementFromSelector(this);

    	    if (['A', 'AREA'].includes(this.tagName)) {
    	      event.preventDefault();
    	    }

    	    if (index.isDisabled(this)) {
    	      return;
    	    }

    	    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
    	      // focus on trigger when it is closed
    	      if (index.isVisible(this)) {
    	        this.focus();
    	      }
    	    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    	    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

    	    if (alreadyOpen && alreadyOpen !== target) {
    	      Offcanvas.getInstance(alreadyOpen).hide();
    	    }

    	    const data = Offcanvas.getOrCreateInstance(target);
    	    data.toggle(this);
    	  });
    	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
    	    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
    	      Offcanvas.getOrCreateInstance(selector).show();
    	    }
    	  });
    	  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
    	    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
    	      if (getComputedStyle(element).position !== 'fixed') {
    	        Offcanvas.getOrCreateInstance(element).hide();
    	      }
    	    }
    	  });
    	  componentFunctions.enableDismissTrigger(Offcanvas);
    	  /**
    	   * jQuery
    	   */

    	  index.defineJQueryPlugin(Offcanvas);

    	  return Offcanvas;

    	}));
    	
    } (offcanvas$1));

    var offcanvas = offcanvas$1.exports;

    /* App\shared\components\offcanvas.svelte generated by Svelte v3.52.0 */
    const file$5 = "App\\shared\\components\\offcanvas.svelte";
    const get_title_slot_changes = dirty => ({});
    const get_title_slot_context = ctx => ({});

    // (134:4) {#if title || titleCloseButton || $$slots.title}
    function create_if_block_3$1(ctx) {
    	let div;
    	let h5;
    	let t0;
    	let t1;
    	let current;
    	let if_block0 = /*title*/ ctx[4] && create_if_block_5(ctx);
    	const title_slot_template = /*#slots*/ ctx[18].title;
    	const title_slot = create_slot(title_slot_template, ctx, /*$$scope*/ ctx[17], get_title_slot_context);
    	let if_block1 = /*titleCloseButton*/ ctx[5] && create_if_block_4$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h5 = element("h5");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (title_slot) title_slot.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(h5, "class", "offcanvas-title");
    			add_location(h5, file$5, 135, 12, 3755);
    			attr_dev(div, "class", "offcanvas-header");
    			add_location(div, file$5, 134, 8, 3711);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h5);
    			if (if_block0) if_block0.m(h5, null);
    			append_dev(h5, t0);

    			if (title_slot) {
    				title_slot.m(h5, null);
    			}

    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*title*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					if_block0.m(h5, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (title_slot) {
    				if (title_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						title_slot,
    						title_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(title_slot_template, /*$$scope*/ ctx[17], dirty, get_title_slot_changes),
    						get_title_slot_context
    					);
    				}
    			}

    			if (/*titleCloseButton*/ ctx[5]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_4$1(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(title_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(title_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (title_slot) title_slot.d(detaching);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(134:4) {#if title || titleCloseButton || $$slots.title}",
    		ctx
    	});

    	return block;
    }

    // (137:16) {#if title}
    function create_if_block_5(ctx) {
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(/*title*/ ctx[4], target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 16) html_tag.p(/*title*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(137:16) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (142:12) {#if titleCloseButton}
    function create_if_block_4$1(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn-close text-reset");
    			add_location(button, file$5, 142, 12, 3983);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*close*/ ctx[9], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(142:12) {#if titleCloseButton}",
    		ctx
    	});

    	return block;
    }

    // (148:8) {#if state.open}
    function create_if_block$2(ctx) {
    	let t0;
    	let t1;
    	let current;
    	let if_block0 = /*promise*/ ctx[6] && create_if_block_2$2(ctx);
    	let if_block1 = /*content*/ ctx[7] && create_if_block_1$2(ctx);
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*promise*/ ctx[6]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2$2(ctx);
    					if_block0.c();
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*content*/ ctx[7]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$2(ctx);
    					if_block1.c();
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(148:8) {#if state.open}",
    		ctx
    	});

    	return block;
    }

    // (149:12) {#if promise}
    function create_if_block_2$2(ctx) {
    	let await_block_anchor;
    	let promise_1;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: false,
    		pending: create_pending_block$1,
    		then: create_then_block$1,
    		catch: create_catch_block$1,
    		value: 7
    	};

    	handle_promise(promise_1 = /*promise*/ ctx[6](), info);

    	const block = {
    		c: function create() {
    			await_block_anchor = empty();
    			info.block.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, await_block_anchor, anchor);
    			info.block.m(target, info.anchor = anchor);
    			info.mount = () => await_block_anchor.parentNode;
    			info.anchor = await_block_anchor;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*promise*/ 64 && promise_1 !== (promise_1 = /*promise*/ ctx[6]()) && handle_promise(promise_1, info)) ; else {
    				update_await_block_branch(info, ctx, dirty);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(await_block_anchor);
    			info.block.d(detaching);
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(149:12) {#if promise}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script lang="ts">import { onDestroy, createEventDispatcher }
    function create_catch_block$1(ctx) {
    	const block = { c: noop, m: noop, p: noop, d: noop };

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$1.name,
    		type: "catch",
    		source: "(1:0) <script lang=\\\"ts\\\">import { onDestroy, createEventDispatcher }",
    		ctx
    	});

    	return block;
    }

    // (154:16) {:then content}
    function create_then_block$1(ctx) {
    	let html_tag;
    	let raw_value = /*content*/ ctx[7] + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*promise*/ 64 && raw_value !== (raw_value = /*content*/ ctx[7] + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$1.name,
    		type: "then",
    		source: "(154:16) {:then content}",
    		ctx
    	});

    	return block;
    }

    // (150:34)                       <div class="text-center">                          <i class="spinner-border" style="width: 3rem; height: 3rem;"></i>                      </div>                  {:then content}
    function create_pending_block$1(ctx) {
    	let div;
    	let i;

    	const block = {
    		c: function create() {
    			div = element("div");
    			i = element("i");
    			attr_dev(i, "class", "spinner-border");
    			set_style(i, "width", "3rem");
    			set_style(i, "height", "3rem");
    			add_location(i, file$5, 151, 24, 4302);
    			attr_dev(div, "class", "text-center");
    			add_location(div, file$5, 150, 20, 4251);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, i);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$1.name,
    		type: "pending",
    		source: "(150:34)                       <div class=\\\"text-center\\\">                          <i class=\\\"spinner-border\\\" style=\\\"width: 3rem; height: 3rem;\\\"></i>                      </div>                  {:then content}",
    		ctx
    	});

    	return block;
    }

    // (158:12) {#if content}
    function create_if_block_1$2(ctx) {
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(/*content*/ ctx[7], target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 128) html_tag.p(/*content*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(158:12) {#if content}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div1;
    	let t;
    	let div0;
    	let div1_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = (/*title*/ ctx[4] || /*titleCloseButton*/ ctx[5] || /*$$slots*/ ctx[10].title) && create_if_block_3$1(ctx);
    	let if_block1 = /*state*/ ctx[0].open && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t = space();
    			div0 = element("div");
    			if (if_block1) if_block1.c();
    			attr_dev(div0, "class", "offcanvas-body");
    			add_location(div0, file$5, 146, 4, 4112);

    			attr_dev(div1, "class", div1_class_value = "" + ((/*responsiveSize*/ ctx[2]
    			? `offcanvas-${/*responsiveSize*/ ctx[2]}`
    			: "offcanvas") + " offcanvas-" + /*orientation*/ ctx[1] + " " + (/*classes*/ ctx[3] ? /*classes*/ ctx[3] : "")));

    			attr_dev(div1, "tabindex", "-1");
    			add_location(div1, file$5, 132, 0, 3493);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t);
    			append_dev(div1, div0);
    			if (if_block1) if_block1.m(div0, null);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*useElement*/ ctx[8].call(null, div1));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[4] || /*titleCloseButton*/ ctx[5] || /*$$slots*/ ctx[10].title) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*title, titleCloseButton, $$slots*/ 1072) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div1, t);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*state*/ ctx[0].open) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*state*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div0, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*responsiveSize, orientation, classes*/ 14 && div1_class_value !== (div1_class_value = "" + ((/*responsiveSize*/ ctx[2]
    			? `offcanvas-${/*responsiveSize*/ ctx[2]}`
    			: "offcanvas") + " offcanvas-" + /*orientation*/ ctx[1] + " " + (/*classes*/ ctx[3] ? /*classes*/ ctx[3] : "")))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance_1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Offcanvas', slots, ['title','default']);
    	const $$slots = compute_slots(slots);
    	let { backdrop = true } = $$props;
    	let { keyboard = true } = $$props;
    	let { scroll = true } = $$props;
    	let { state = { open: false } } = $$props;
    	let { orientation = "start" } = $$props;
    	let { responsiveSize = undefined } = $$props;
    	let { classes = undefined } = $$props;
    	let { title = undefined } = $$props;
    	let { titleCloseButton = false } = $$props;
    	let { promise = undefined } = $$props;
    	let { content = undefined } = $$props;
    	let { use = undefined } = $$props;
    	const dispatch = createEventDispatcher();
    	const show = event => dispatch("show", event);
    	const shown = event => dispatch("shown", event);
    	const hide = event => dispatch("hide", event);

    	const hidden = event => {
    		$$invalidate(0, state.open = false, state);
    		dispatch("hidden", event);
    	};

    	let instance;
    	let element;

    	const destroy = () => {
    		if (instance) {
    			element.removeEventListener("show.bs.offcanvas", show, true);
    			element.removeEventListener("shown.bs.offcanvas", shown, true);
    			element.removeEventListener("hide.bs.offcanvas", hide, true);
    			element.removeEventListener("hidden.bs.offcanvas", hidden, true);
    			instance.dispose();
    			$$invalidate(15, instance = null);
    		}
    	};

    	onDestroy(destroy);

    	function useElement(e) {
    		$$invalidate(16, element = e);
    		$$invalidate(15, instance = new offcanvas(e, { backdrop, keyboard, scroll }));
    		element.addEventListener("show.bs.offcanvas", show, true);
    		element.addEventListener("shown.bs.offcanvas", shown, true);
    		element.addEventListener("hide.bs.offcanvas", hide, true);
    		element.addEventListener("hidden.bs.offcanvas", hidden, true);
    		let result;

    		if (use) {
    			result = use(e);
    		}

    		return {
    			destroy() {
    				destroy();

    				result === null || result === void 0
    				? void 0
    				: result.destroy();
    			},
    			update() {
    				result === null || result === void 0
    				? void 0
    				: result.update();
    			}
    		};
    	}

    	function close() {
    		$$invalidate(0, state.open = false, state);
    	}

    	const writable_props = [
    		'backdrop',
    		'keyboard',
    		'scroll',
    		'state',
    		'orientation',
    		'responsiveSize',
    		'classes',
    		'title',
    		'titleCloseButton',
    		'promise',
    		'content',
    		'use'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Offcanvas> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('backdrop' in $$props) $$invalidate(11, backdrop = $$props.backdrop);
    		if ('keyboard' in $$props) $$invalidate(12, keyboard = $$props.keyboard);
    		if ('scroll' in $$props) $$invalidate(13, scroll = $$props.scroll);
    		if ('state' in $$props) $$invalidate(0, state = $$props.state);
    		if ('orientation' in $$props) $$invalidate(1, orientation = $$props.orientation);
    		if ('responsiveSize' in $$props) $$invalidate(2, responsiveSize = $$props.responsiveSize);
    		if ('classes' in $$props) $$invalidate(3, classes = $$props.classes);
    		if ('title' in $$props) $$invalidate(4, title = $$props.title);
    		if ('titleCloseButton' in $$props) $$invalidate(5, titleCloseButton = $$props.titleCloseButton);
    		if ('promise' in $$props) $$invalidate(6, promise = $$props.promise);
    		if ('content' in $$props) $$invalidate(7, content = $$props.content);
    		if ('use' in $$props) $$invalidate(14, use = $$props.use);
    		if ('$$scope' in $$props) $$invalidate(17, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		createEventDispatcher,
    		offcanvas,
    		backdrop,
    		keyboard,
    		scroll,
    		state,
    		orientation,
    		responsiveSize,
    		classes,
    		title,
    		titleCloseButton,
    		promise,
    		content,
    		use,
    		dispatch,
    		show,
    		shown,
    		hide,
    		hidden,
    		instance,
    		element,
    		destroy,
    		useElement,
    		close
    	});

    	$$self.$inject_state = $$props => {
    		if ('backdrop' in $$props) $$invalidate(11, backdrop = $$props.backdrop);
    		if ('keyboard' in $$props) $$invalidate(12, keyboard = $$props.keyboard);
    		if ('scroll' in $$props) $$invalidate(13, scroll = $$props.scroll);
    		if ('state' in $$props) $$invalidate(0, state = $$props.state);
    		if ('orientation' in $$props) $$invalidate(1, orientation = $$props.orientation);
    		if ('responsiveSize' in $$props) $$invalidate(2, responsiveSize = $$props.responsiveSize);
    		if ('classes' in $$props) $$invalidate(3, classes = $$props.classes);
    		if ('title' in $$props) $$invalidate(4, title = $$props.title);
    		if ('titleCloseButton' in $$props) $$invalidate(5, titleCloseButton = $$props.titleCloseButton);
    		if ('promise' in $$props) $$invalidate(6, promise = $$props.promise);
    		if ('content' in $$props) $$invalidate(7, content = $$props.content);
    		if ('use' in $$props) $$invalidate(14, use = $$props.use);
    		if ('instance' in $$props) $$invalidate(15, instance = $$props.instance);
    		if ('element' in $$props) $$invalidate(16, element = $$props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*instance, state, element*/ 98305) {
    			{
    				if (instance) {
    					if (state.open) {
    						instance.show();
    						element.focus();
    					} else {
    						instance.hide();
    					}
    				}
    			}
    		}
    	};

    	return [
    		state,
    		orientation,
    		responsiveSize,
    		classes,
    		title,
    		titleCloseButton,
    		promise,
    		content,
    		useElement,
    		close,
    		$$slots,
    		backdrop,
    		keyboard,
    		scroll,
    		use,
    		instance,
    		element,
    		$$scope,
    		slots
    	];
    }

    class Offcanvas extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1, create_fragment$5, safe_not_equal, {
    			backdrop: 11,
    			keyboard: 12,
    			scroll: 13,
    			state: 0,
    			orientation: 1,
    			responsiveSize: 2,
    			classes: 3,
    			title: 4,
    			titleCloseButton: 5,
    			promise: 6,
    			content: 7,
    			use: 14
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Offcanvas",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get backdrop() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backdrop(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get keyboard() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set keyboard(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scroll() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scroll(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get orientation() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set orientation(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsiveSize() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsiveSize(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classes() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get titleCloseButton() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set titleCloseButton(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get promise() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set promise(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get use() {
    		throw new Error("<Offcanvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Offcanvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const getValue = (id) => {
        let e = document.querySelector(`input#${id}[type=hidden]`);
        if (!e) {
            return "";
        }
        let value = e.value;
        e.remove();
        return value;
    };
    const getValueFromJson = (id) => JSON.parse(getValue(id));
    let user = getValueFromJson("user");
    const errorKey = getValue("error-key");
    const themeKey = getValue("theme-key");
    const title = getValue("title");
    const urls = getValueFromJson("urls");

    /* App\shared\layout\link-list-items.svelte generated by Svelte v3.52.0 */
    const file$4 = "App\\shared\\layout\\link-list-items.svelte";

    function create_fragment$4(ctx) {
    	let t0;
    	let li0;
    	let a0;
    	let t1;
    	let t2;
    	let li1;
    	let a1;
    	let t3;

    	const block = {
    		c: function create() {
    			t0 = space();
    			li0 = element("li");
    			a0 = element("a");
    			t1 = text("Dashboard");
    			t2 = space();
    			li1 = element("li");
    			a1 = element("a");
    			t3 = text("Companies");
    			attr_dev(a0, "class", "nav-link ");
    			attr_dev(a0, "href", urls.indexUrl);
    			toggle_class(a0, "active", document.location.pathname == urls.indexUrl);
    			add_location(a0, file$4, 4, 4, 99);
    			attr_dev(li0, "class", "nav-item py-0");
    			add_location(li0, file$4, 3, 0, 67);
    			attr_dev(a1, "class", "nav-link ");
    			attr_dev(a1, "href", urls.companiesUrl);
    			toggle_class(a1, "active", document.location.pathname == urls.companiesUrl);
    			add_location(a1, file$4, 7, 4, 256);
    			attr_dev(li1, "class", "nav-item py-0");
    			add_location(li1, file$4, 6, 0, 224);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, li0, anchor);
    			append_dev(li0, a0);
    			append_dev(a0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, li1, anchor);
    			append_dev(li1, a1);
    			append_dev(a1, t3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*document, urls*/ 0) {
    				toggle_class(a0, "active", document.location.pathname == urls.indexUrl);
    			}

    			if (dirty & /*document, urls*/ 0) {
    				toggle_class(a1, "active", document.location.pathname == urls.companiesUrl);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(li0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(li1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link_list_items', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Link_list_items> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ urls });
    	return [];
    }

    class Link_list_items extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link_list_items",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    var _a;
    const link = document.head.querySelector(`#${themeKey}`);
    const defaultTheme = (_a = link === null || link === void 0 ? void 0 : link.dataset) === null || _a === void 0 ? void 0 : _a.theme;
    const isDarkTheme = writable(defaultTheme == "dark");
    if (link) {
        isDarkTheme.subscribe(isDark => {
            let d = new Date();
            d.setFullYear(d.getFullYear() + 10);
            if (!isDark) {
                link.dataset.theme = "light";
                link.href = link.href.replace("dark", "light");
                document.cookie = `${themeKey}=light; expires=${d.toUTCString()}`;
            }
            else {
                link.dataset.theme = "dark";
                link.href = link.href.replace("light", "dark");
                document.cookie = `${themeKey}=dark; expires=${d.toUTCString()}`;
            }
        });
    }

    /* App\shared\layout\offcanvas-layout.svelte generated by Svelte v3.52.0 */

    const { document: document_1 } = globals;
    const file$3 = "App\\shared\\layout\\offcanvas-layout.svelte";

    // (82:0) {#if !pinned}
    function create_if_block_1$1(ctx) {
    	let t;
    	let offcanvas_1;
    	let current;
    	let if_block = !/*offcanvas*/ ctx[2].open && create_if_block_2$1(ctx);

    	offcanvas_1 = new Offcanvas({
    			props: {
    				state: /*offcanvas*/ ctx[2],
    				classes: "offcanvas-nav navbar-dark bg-primary",
    				use: /*useOffcanvas*/ ctx[4],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	offcanvas_1.$on("hidden", /*hidden_handler*/ ctx[11]);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			create_component(offcanvas_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(offcanvas_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!/*offcanvas*/ ctx[2].open) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const offcanvas_1_changes = {};
    			if (dirty & /*offcanvas*/ 4) offcanvas_1_changes.state = /*offcanvas*/ ctx[2];

    			if (dirty & /*$$scope*/ 16384) {
    				offcanvas_1_changes.$$scope = { dirty, ctx };
    			}

    			offcanvas_1.$set(offcanvas_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(offcanvas_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(offcanvas_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(offcanvas_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(82:0) {#if !pinned}",
    		ctx
    	});

    	return block;
    }

    // (84:4) {#if !offcanvas.open}
    function create_if_block_2$1(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "gutter svelte-34qebo");
    			add_location(div, file$3, 83, 25, 2348);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mouseover", /*gutterMouseover*/ ctx[6], false, false, false),
    					listen_dev(div, "click", /*click_handler*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(84:4) {#if !offcanvas.open}",
    		ctx
    	});

    	return block;
    }

    // (85:4) <Offcanvas state={offcanvas} classes="offcanvas-nav navbar-dark bg-primary" on:hidden={() => toggleOffcanvas(false)} use={useOffcanvas}>
    function create_default_slot$1(ctx) {
    	let button;
    	let t;
    	let ul;
    	let links;
    	let current;
    	let mounted;
    	let dispose;
    	links = new Link_list_items({ $$inline: true });

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = space();
    			ul = element("ul");
    			create_component(links.$$.fragment);
    			attr_dev(button, "class", "btn btn-sm btn-primary pin bi-pin-angle svelte-34qebo");
    			attr_dev(button, "data-bs-toggle", "tooltip");
    			attr_dev(button, "title", "Pin sidebar");
    			add_location(button, file$3, 85, 8, 2601);
    			attr_dev(ul, "class", "navbar-nav navbar-dark flex-column mt-4");
    			add_location(ul, file$3, 86, 8, 2742);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, ul, anchor);
    			mount_component(links, ul, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*togglePin*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(links.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(links.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(ul);
    			destroy_component(links);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(85:4) <Offcanvas state={offcanvas} classes=\\\"offcanvas-nav navbar-dark bg-primary\\\" on:hidden={() => toggleOffcanvas(false)} use={useOffcanvas}>",
    		ctx
    	});

    	return block;
    }

    // (112:16) {:else}
    function create_else_block$1(ctx) {
    	let a;
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			a = element("a");
    			i = element("i");
    			t = text("\r\n                        Login");
    			attr_dev(i, "class", "bi-person");
    			add_location(i, file$3, 113, 24, 3919);
    			attr_dev(a, "class", "btn btn-sm btn-primary");
    			attr_dev(a, "href", urls.loginUrl);
    			add_location(a, file$3, 112, 20, 3836);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, i);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(112:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (105:16) {#if user.isSigned}
    function create_if_block$1(ctx) {
    	let pre;
    	let t3;
    	let a;
    	let i;

    	const block = {
    		c: function create() {
    			pre = element("pre");

    			pre.textContent = `                        ${user.email}
                    `;

    			t3 = space();
    			a = element("a");
    			i = element("i");
    			attr_dev(pre, "class", "user-info text-nowrap svelte-34qebo");
    			attr_dev(pre, "data-bs-toggle", "tooltip");
    			attr_dev(pre, "title", "Current user");
    			add_location(pre, file$3, 105, 20, 3433);
    			attr_dev(i, "class", "bi bi-box-arrow-right");
    			add_location(i, file$3, 109, 24, 3726);
    			attr_dev(a, "class", "btn btn-sm btn-primary");
    			attr_dev(a, "href", urls.logoutUrl);
    			attr_dev(a, "data-bs-toggle", "tooltip");
    			attr_dev(a, "title", "Logout");
    			add_location(a, file$3, 108, 20, 3602);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, pre, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, a, anchor);
    			append_dev(a, i);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(pre);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(105:16) {#if user.isSigned}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let t0;
    	let t1;
    	let header;
    	let nav;
    	let div2;
    	let div0;
    	let button0;
    	let i0;
    	let i0_class_value;
    	let t2;
    	let span;
    	let t3;
    	let t4;
    	let div1;
    	let t5;
    	let button1;
    	let i1;
    	let i1_class_value;
    	let button1_title_value;
    	let t6;
    	let main;
    	let div4;
    	let div3;
    	let button2;
    	let t7;
    	let ul;
    	let links;
    	let t8;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = !/*pinned*/ ctx[1] && create_if_block_1$1(ctx);

    	function select_block_type(ctx, dirty) {
    		if (user.isSigned) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type();
    	let if_block1 = current_block_type(ctx);
    	links = new Link_list_items({ $$inline: true });
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	const block = {
    		c: function create() {
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			header = element("header");
    			nav = element("nav");
    			div2 = element("div");
    			div0 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t2 = space();
    			span = element("span");
    			t3 = text(/*title*/ ctx[0]);
    			t4 = space();
    			div1 = element("div");
    			if_block1.c();
    			t5 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t6 = space();
    			main = element("main");
    			div4 = element("div");
    			div3 = element("div");
    			button2 = element("button");
    			t7 = space();
    			ul = element("ul");
    			create_component(links.$$.fragment);
    			t8 = space();
    			if (default_slot) default_slot.c();

    			attr_dev(i0, "class", i0_class_value = /*offcanvas*/ ctx[2].open && !/*pinned*/ ctx[1]
    			? "bi-x"
    			: "bi-list");

    			add_location(i0, file$3, 98, 20, 3152);
    			attr_dev(span, "class", "font-monospace");
    			add_location(span, file$3, 99, 20, 3238);
    			attr_dev(button0, "class", "btn btn-primary");
    			add_location(button0, file$3, 97, 16, 3063);
    			attr_dev(div0, "class", "d-flex float-start");
    			add_location(div0, file$3, 96, 12, 3013);

    			attr_dev(i1, "class", i1_class_value = /*$isDarkTheme*/ ctx[3]
    			? "bi-lightbulb"
    			: "bi-lightbulb-off");

    			add_location(i1, file$3, 118, 20, 4231);
    			attr_dev(button1, "class", "btn btn-sm btn-primary mx-1");
    			attr_dev(button1, "data-bs-toggle", "tooltip");
    			attr_dev(button1, "title", button1_title_value = /*$isDarkTheme*/ ctx[3] ? "Lights On" : "Lights Off");
    			add_location(button1, file$3, 117, 16, 4042);
    			attr_dev(div1, "class", "d-flex float-end");
    			add_location(div1, file$3, 103, 12, 3344);
    			attr_dev(div2, "class", "container-fluid");
    			add_location(div2, file$3, 94, 8, 2968);
    			attr_dev(nav, "class", "navbar navbar-expand-md navbar-dark fixed-top bg-primary py-0 py-md-0");
    			add_location(nav, file$3, 93, 4, 2875);
    			attr_dev(header, "class", "svelte-34qebo");
    			add_location(header, file$3, 92, 0, 2861);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "btn btn-sm btn-primary pin bi-pin svelte-34qebo");
    			attr_dev(button2, "data-bs-toggle", "tooltip");
    			attr_dev(button2, "title", "Unpin sidebar");
    			add_location(button2, file$3, 128, 12, 4564);
    			attr_dev(div3, "class", "position-fixed pin-wrap svelte-34qebo");
    			add_location(div3, file$3, 127, 8, 4513);
    			attr_dev(ul, "class", "navbar-nav navbar-dark flex-column mt-4 position-fixed");
    			add_location(ul, file$3, 130, 8, 4731);
    			attr_dev(div4, "class", "offcanvas-nav navbar-dark bg-primary svelte-34qebo");
    			toggle_class(div4, "d-none", !/*pinned*/ ctx[1]);
    			add_location(div4, file$3, 126, 4, 4430);
    			attr_dev(main, "class", "svelte-34qebo");
    			toggle_class(main, "pinned-layout", /*pinned*/ ctx[1]);
    			add_location(main, file$3, 125, 0, 4389);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, header, anchor);
    			append_dev(header, nav);
    			append_dev(nav, div2);
    			append_dev(div2, div0);
    			append_dev(div0, button0);
    			append_dev(button0, i0);
    			append_dev(button0, t2);
    			append_dev(button0, span);
    			append_dev(span, t3);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			if_block1.m(div1, null);
    			append_dev(div1, t5);
    			append_dev(div1, button1);
    			append_dev(button1, i1);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div4);
    			append_dev(div4, div3);
    			append_dev(div3, button2);
    			append_dev(div4, t7);
    			append_dev(div4, ul);
    			mount_component(links, ul, null);
    			append_dev(main, t8);

    			if (default_slot) {
    				default_slot.m(main, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(document_1.body, "mouseover", /*bodyMouseover*/ ctx[7], false, false, false),
    					listen_dev(button0, "click", /*click_handler_1*/ ctx[12], false, false, false),
    					listen_dev(button1, "click", /*click_handler_2*/ ctx[13], false, false, false),
    					listen_dev(button2, "click", /*togglePin*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*pinned*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*pinned*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*offcanvas, pinned*/ 6 && i0_class_value !== (i0_class_value = /*offcanvas*/ ctx[2].open && !/*pinned*/ ctx[1]
    			? "bi-x"
    			: "bi-list")) {
    				attr_dev(i0, "class", i0_class_value);
    			}

    			if (!current || dirty & /*title*/ 1) set_data_dev(t3, /*title*/ ctx[0]);
    			if_block1.p(ctx, dirty);

    			if (!current || dirty & /*$isDarkTheme*/ 8 && i1_class_value !== (i1_class_value = /*$isDarkTheme*/ ctx[3]
    			? "bi-lightbulb"
    			: "bi-lightbulb-off")) {
    				attr_dev(i1, "class", i1_class_value);
    			}

    			if (!current || dirty & /*$isDarkTheme*/ 8 && button1_title_value !== (button1_title_value = /*$isDarkTheme*/ ctx[3] ? "Lights On" : "Lights Off")) {
    				attr_dev(button1, "title", button1_title_value);
    			}

    			if (!current || dirty & /*pinned*/ 2) {
    				toggle_class(div4, "d-none", !/*pinned*/ ctx[1]);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*pinned*/ 2) {
    				toggle_class(main, "pinned-layout", /*pinned*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(links.$$.fragment, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(links.$$.fragment, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(header);
    			if_block1.d();
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(main);
    			destroy_component(links);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const pinnedKey = "sidebar-pinned";

    function instance$3($$self, $$props, $$invalidate) {
    	let $isDarkTheme;
    	validate_store(isDarkTheme, 'isDarkTheme');
    	component_subscribe($$self, isDarkTheme, $$value => $$invalidate(3, $isDarkTheme = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Offcanvas_layout', slots, ['default']);
    	let { title: title$1 = title } = $$props;

    	let pinned = localStorage.getItem(pinnedKey) == null
    	? true
    	: localStorage.getItem(pinnedKey) == "true";

    	let offcanvas = { open: false };
    	let offcanvasRef;

    	function useOffcanvas(e) {
    		offcanvasRef = e;
    	}

    	function toggleOffcanvas(state) {
    		if (pinned) {
    			$$invalidate(1, pinned = false);
    			return;
    		}

    		if (state == undefined) {
    			$$invalidate(2, offcanvas.open = !offcanvas.open, offcanvas);
    		} else {
    			$$invalidate(2, offcanvas.open = state, offcanvas);
    		}
    	}

    	let gutterTimeout;
    	let bodyTimeout;

    	function gutterMouseover() {
    		if (gutterTimeout) {
    			clearInterval(gutterTimeout);
    			gutterTimeout = null;
    		}

    		if (offcanvas.open) {
    			return;
    		}

    		gutterTimeout = setTimeout(
    			() => {
    				if (!offcanvas.open && document && document.querySelectorAll(".gutter:hover").length > 0) {
    					$$invalidate(2, offcanvas.open = true, offcanvas);
    				}

    				gutterTimeout = null;
    			},
    			500
    		);
    	}

    	function bodyMouseover() {
    		if (bodyTimeout) {
    			clearInterval(bodyTimeout);
    			bodyTimeout = null;
    		}

    		if (!offcanvas.open) {
    			return;
    		}

    		if (offcanvasRef.querySelectorAll(".offcanvas-body:hover").length) {
    			return;
    		}

    		bodyTimeout = setTimeout(
    			() => {
    				if (offcanvas.open && !offcanvasRef.querySelectorAll(".offcanvas-body:hover").length) {
    					$$invalidate(2, offcanvas.open = false, offcanvas);
    				}

    				bodyTimeout = null;
    			},
    			5000
    		);
    	}

    	function togglePin() {
    		$$invalidate(1, pinned = !pinned);
    	}

    	onDestroy(() => {
    		if (gutterTimeout) {
    			clearInterval(gutterTimeout);
    		}

    		if (bodyTimeout) {
    			clearInterval(bodyTimeout);
    		}
    	});

    	beforeUpdate(hideTooltips);
    	afterUpdate(createTooltips);
    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Offcanvas_layout> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => toggleOffcanvas(true);
    	const hidden_handler = () => toggleOffcanvas(false);
    	const click_handler_1 = () => toggleOffcanvas();
    	const click_handler_2 = () => set_store_value(isDarkTheme, $isDarkTheme = !$isDarkTheme, $isDarkTheme);

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title$1 = $$props.title);
    		if ('$$scope' in $$props) $$invalidate(14, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		afterUpdate,
    		beforeUpdate,
    		createTooltips,
    		hideTooltips,
    		Offcanvas,
    		Links: Link_list_items,
    		urls,
    		user,
    		configTitle: title,
    		isDarkTheme,
    		title: title$1,
    		pinnedKey,
    		pinned,
    		offcanvas,
    		offcanvasRef,
    		useOffcanvas,
    		toggleOffcanvas,
    		gutterTimeout,
    		bodyTimeout,
    		gutterMouseover,
    		bodyMouseover,
    		togglePin,
    		$isDarkTheme
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title$1 = $$props.title);
    		if ('pinned' in $$props) $$invalidate(1, pinned = $$props.pinned);
    		if ('offcanvas' in $$props) $$invalidate(2, offcanvas = $$props.offcanvas);
    		if ('offcanvasRef' in $$props) offcanvasRef = $$props.offcanvasRef;
    		if ('gutterTimeout' in $$props) gutterTimeout = $$props.gutterTimeout;
    		if ('bodyTimeout' in $$props) bodyTimeout = $$props.bodyTimeout;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*pinned*/ 2) {
    			{
    				localStorage.setItem(pinnedKey, pinned.toString());
    			}
    		}
    	};

    	return [
    		title$1,
    		pinned,
    		offcanvas,
    		$isDarkTheme,
    		useOffcanvas,
    		toggleOffcanvas,
    		gutterMouseover,
    		bodyMouseover,
    		togglePin,
    		slots,
    		click_handler,
    		hidden_handler,
    		click_handler_1,
    		click_handler_2,
    		$$scope
    	];
    }

    class Offcanvas_layout extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Offcanvas_layout",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get title() {
    		throw new Error("<Offcanvas_layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Offcanvas_layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* App\shared\components\data-grid\placeholder-row.svelte generated by Svelte v3.52.0 */

    const file$2 = "App\\shared\\components\\data-grid\\placeholder-row.svelte";

    function create_fragment$2(ctx) {
    	let tr;
    	let td;
    	let div;
    	let span;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td = element("td");
    			div = element("div");
    			span = element("span");
    			attr_dev(span, "class", "placeholder placeholder-lg col-12 rounded");
    			set_style(span, "height", /*placeholderHeight*/ ctx[0]);
    			add_location(span, file$2, 5, 12, 151);
    			attr_dev(div, "class", "placeholder-glow");
    			add_location(div, file$2, 4, 8, 107);
    			attr_dev(td, "colspan", "99999");
    			add_location(td, file$2, 3, 4, 79);
    			add_location(tr, file$2, 2, 0, 69);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td);
    			append_dev(td, div);
    			append_dev(div, span);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*placeholderHeight*/ 1) {
    				set_style(span, "height", /*placeholderHeight*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Placeholder_row', slots, []);
    	let { placeholderHeight = "25vh" } = $$props;
    	const writable_props = ['placeholderHeight'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Placeholder_row> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('placeholderHeight' in $$props) $$invalidate(0, placeholderHeight = $$props.placeholderHeight);
    	};

    	$$self.$capture_state = () => ({ placeholderHeight });

    	$$self.$inject_state = $$props => {
    		if ('placeholderHeight' in $$props) $$invalidate(0, placeholderHeight = $$props.placeholderHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [placeholderHeight];
    }

    class Placeholder_row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { placeholderHeight: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Placeholder_row",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get placeholderHeight() {
    		throw new Error("<Placeholder_row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholderHeight(value) {
    		throw new Error("<Placeholder_row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* App\shared\components\data-grid.svelte generated by Svelte v3.52.0 */
    const file$1 = "App\\shared\\components\\data-grid.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[36] = list[i];
    	child_ctx[38] = i;
    	return child_ctx;
    }

    const get_row_slot_changes_1 = dirty => ({});

    const get_row_slot_context_1 = ctx => ({
    	data: /*data*/ ctx[36],
    	index: /*index*/ ctx[38]
    });

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[36] = list[i];
    	child_ctx[38] = i;
    	return child_ctx;
    }

    const get_row_slot_changes = dirty => ({ data: dirty[0] & /*dataFunc*/ 2 });

    const get_row_slot_context = ctx => ({
    	data: /*data*/ ctx[36],
    	index: /*index*/ ctx[38]
    });

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[40] = list[i];
    	return child_ctx;
    }

    const get_caption_slot_changes = dirty => ({});
    const get_caption_slot_context = ctx => ({});

    // (43:0) {#if dataPageFunc && pagerVerticalPos == "top"}
    function create_if_block_4(ctx) {
    	let nav;
    	let div;
    	let t1;
    	let ul;
    	let li0;
    	let button0;
    	let t3;
    	let li1;
    	let button1;
    	let t5;
    	let li2;
    	let button2;
    	let t7;
    	let li3;
    	let button3;
    	let t9;
    	let li4;
    	let button4;
    	let ul_class_value;
    	let nav_class_value;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div = element("div");
    			div.textContent = "some text";
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			button0 = element("button");
    			button0.textContent = "Previous";
    			t3 = space();
    			li1 = element("li");
    			button1 = element("button");
    			button1.textContent = "1";
    			t5 = space();
    			li2 = element("li");
    			button2 = element("button");
    			button2.textContent = "2";
    			t7 = space();
    			li3 = element("li");
    			button3 = element("button");
    			button3.textContent = "3";
    			t9 = space();
    			li4 = element("li");
    			button4 = element("button");
    			button4.textContent = "Next";
    			add_location(div, file$1, 44, 4, 1343);
    			attr_dev(button0, "class", "page-link");
    			add_location(button0, file$1, 47, 39, 1472);
    			attr_dev(li0, "class", "page-item disabled");
    			add_location(li0, file$1, 47, 8, 1441);
    			attr_dev(button1, "class", "page-link");
    			add_location(button1, file$1, 48, 37, 1559);
    			attr_dev(li1, "class", "page-item active");
    			add_location(li1, file$1, 48, 8, 1530);
    			attr_dev(button2, "class", "page-link");
    			add_location(button2, file$1, 49, 30, 1632);
    			attr_dev(li2, "class", "page-item");
    			add_location(li2, file$1, 49, 8, 1610);
    			attr_dev(button3, "class", "page-link");
    			add_location(button3, file$1, 50, 30, 1705);
    			attr_dev(li3, "class", "page-item");
    			add_location(li3, file$1, 50, 8, 1683);
    			attr_dev(button4, "class", "page-link");
    			add_location(button4, file$1, 51, 30, 1778);
    			attr_dev(li4, "class", "page-item");
    			add_location(li4, file$1, 51, 8, 1756);
    			attr_dev(ul, "class", ul_class_value = "pagination justify-content-" + /*pagerHorizontalPos*/ ctx[27]);
    			add_location(ul, file$1, 46, 4, 1371);
    			attr_dev(nav, "class", nav_class_value = "d-flex justify-content-" + /*pagerHorizontalPos*/ ctx[27]);
    			add_location(nav, file$1, 43, 0, 1280);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div);
    			append_dev(nav, t1);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, button0);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(li1, button1);
    			append_dev(ul, t5);
    			append_dev(ul, li2);
    			append_dev(li2, button2);
    			append_dev(ul, t7);
    			append_dev(ul, li3);
    			append_dev(li3, button3);
    			append_dev(ul, t9);
    			append_dev(ul, li4);
    			append_dev(li4, button4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*pagerHorizontalPos*/ 134217728 && ul_class_value !== (ul_class_value = "pagination justify-content-" + /*pagerHorizontalPos*/ ctx[27])) {
    				attr_dev(ul, "class", ul_class_value);
    			}

    			if (dirty[0] & /*pagerHorizontalPos*/ 134217728 && nav_class_value !== (nav_class_value = "d-flex justify-content-" + /*pagerHorizontalPos*/ ctx[27])) {
    				attr_dev(nav, "class", nav_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(43:0) {#if dataPageFunc && pagerVerticalPos == \\\"top\\\"}",
    		ctx
    	});

    	return block;
    }

    // (78:4) {#if caption || $$slots.caption}
    function create_if_block_3(ctx) {
    	let caption_1;
    	let t0;
    	let t1;
    	let current;
    	const caption_slot_template = /*#slots*/ ctx[32].caption;
    	const caption_slot = create_slot(caption_slot_template, ctx, /*$$scope*/ ctx[31], get_caption_slot_context);

    	const block = {
    		c: function create() {
    			caption_1 = element("caption");
    			t0 = text(/*caption*/ ctx[23]);
    			t1 = space();
    			if (caption_slot) caption_slot.c();
    			add_location(caption_1, file$1, 78, 8, 2732);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, caption_1, anchor);
    			append_dev(caption_1, t0);
    			append_dev(caption_1, t1);

    			if (caption_slot) {
    				caption_slot.m(caption_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*caption*/ 8388608) set_data_dev(t0, /*caption*/ ctx[23]);

    			if (caption_slot) {
    				if (caption_slot.p && (!current || dirty[1] & /*$$scope*/ 1)) {
    					update_slot_base(
    						caption_slot,
    						caption_slot_template,
    						ctx,
    						/*$$scope*/ ctx[31],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[31])
    						: get_slot_changes(caption_slot_template, /*$$scope*/ ctx[31], dirty, get_caption_slot_changes),
    						get_caption_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(caption_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(caption_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(caption_1);
    			if (caption_slot) caption_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(78:4) {#if caption || $$slots.caption}",
    		ctx
    	});

    	return block;
    }

    // (89:16) {:else}
    function create_else_block(ctx) {
    	let th;
    	let t_value = /*row*/ ctx[40].text + "";
    	let t;
    	let th_style_value;

    	const block = {
    		c: function create() {
    			th = element("th");
    			t = text(t_value);
    			attr_dev(th, "scope", "col");

    			attr_dev(th, "style", th_style_value = "" + ((/*row*/ ctx[40].width
    			? "width: " + /*row*/ ctx[40].width + "; "
    			: "") + (/*row*/ ctx[40].minWidth
    			? "min-width: " + /*row*/ ctx[40].minWidth + "; "
    			: "")));

    			add_location(th, file$1, 89, 20, 3041);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*headers*/ 1 && t_value !== (t_value = /*row*/ ctx[40].text + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*headers*/ 1 && th_style_value !== (th_style_value = "" + ((/*row*/ ctx[40].width
    			? "width: " + /*row*/ ctx[40].width + "; "
    			: "") + (/*row*/ ctx[40].minWidth
    			? "min-width: " + /*row*/ ctx[40].minWidth + "; "
    			: "")))) {
    				attr_dev(th, "style", th_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(89:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (87:16) {#if typeof row == "string"}
    function create_if_block_2(ctx) {
    	let th;
    	let t_value = /*row*/ ctx[40] + "";
    	let t;

    	const block = {
    		c: function create() {
    			th = element("th");
    			t = text(t_value);
    			attr_dev(th, "scope", "col");
    			add_location(th, file$1, 87, 20, 2968);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*headers*/ 1 && t_value !== (t_value = /*row*/ ctx[40] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(87:16) {#if typeof row == \\\"string\\\"}",
    		ctx
    	});

    	return block;
    }

    // (86:12) {#each headers as row}
    function create_each_block_2(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (typeof /*row*/ ctx[40] == "string") return create_if_block_2;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(86:12) {#each headers as row}",
    		ctx
    	});

    	return block;
    }

    // (96:8) {#if dataFunc}
    function create_if_block_1(ctx) {
    	let await_block_anchor;
    	let promise;
    	let current;

    	let info_1 = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: false,
    		pending: create_pending_block_1,
    		then: create_then_block_1,
    		catch: create_catch_block_1,
    		value: 35,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*dataFunc*/ ctx[1](), info_1);

    	const block = {
    		c: function create() {
    			await_block_anchor = empty();
    			info_1.block.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, await_block_anchor, anchor);
    			info_1.block.m(target, info_1.anchor = anchor);
    			info_1.mount = () => await_block_anchor.parentNode;
    			info_1.anchor = await_block_anchor;
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info_1.ctx = ctx;

    			if (dirty[0] & /*dataFunc*/ 2 && promise !== (promise = /*dataFunc*/ ctx[1]()) && handle_promise(promise, info_1)) ; else {
    				update_await_block_branch(info_1, ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info_1.block);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info_1.blocks[i];
    				transition_out(block);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(await_block_anchor);
    			info_1.block.d(detaching);
    			info_1.token = null;
    			info_1 = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(96:8) {#if dataFunc}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script lang="ts">import PlaceholderRow from "./data-grid/placeholder-row.svelte";  export let headers = [];  export let dataFunc = undefined;  export let dataPageFunc = undefined;  export let primary = false;  export let secondary = false;  export let success = false;  export let danger = false;  export let warning = false;  export let info = false;  export let light = false;  export let dark = false;  export let striped = false;  export let stripedColumns = false;  export let hover = false;  export let bordered = false;  export let borderless = false;  export let small = false;  export let responsive = false;  export let responsiveSm = false;  export let responsiveMd = false;  export let responsiveLg = false;  export let responsiveXl = false;  export let responsiveXxl = false;  export let caption = "";  export let headerGroupDivider = false;  export let placeholderHeight = "50vh";  export let take = 50;  export let pagerVerticalPos = "top";  export let pagerHorizontalPos = "end";  let skip = 0;  let count;  async function readDataPage() {      if (!dataPageFunc) {          return [];      }
    function create_catch_block_1(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block_1.name,
    		type: "catch",
    		source: "(1:0) <script lang=\\\"ts\\\">import PlaceholderRow from \\\"./data-grid/placeholder-row.svelte\\\";  export let headers = [];  export let dataFunc = undefined;  export let dataPageFunc = undefined;  export let primary = false;  export let secondary = false;  export let success = false;  export let danger = false;  export let warning = false;  export let info = false;  export let light = false;  export let dark = false;  export let striped = false;  export let stripedColumns = false;  export let hover = false;  export let bordered = false;  export let borderless = false;  export let small = false;  export let responsive = false;  export let responsiveSm = false;  export let responsiveMd = false;  export let responsiveLg = false;  export let responsiveXl = false;  export let responsiveXxl = false;  export let caption = \\\"\\\";  export let headerGroupDivider = false;  export let placeholderHeight = \\\"50vh\\\";  export let take = 50;  export let pagerVerticalPos = \\\"top\\\";  export let pagerHorizontalPos = \\\"end\\\";  let skip = 0;  let count;  async function readDataPage() {      if (!dataPageFunc) {          return [];      }",
    		ctx
    	});

    	return block;
    }

    // (99:12) {:then response}
    function create_then_block_1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*response*/ ctx[35];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*dataFunc*/ 2 | dirty[1] & /*$$scope*/ 1) {
    				each_value_1 = /*response*/ ctx[35];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block_1.name,
    		type: "then",
    		source: "(99:12) {:then response}",
    		ctx
    	});

    	return block;
    }

    // (100:16) {#each response as data, index}
    function create_each_block_1(ctx) {
    	let current;
    	const row_slot_template = /*#slots*/ ctx[32].row;
    	const row_slot = create_slot(row_slot_template, ctx, /*$$scope*/ ctx[31], get_row_slot_context);

    	const block = {
    		c: function create() {
    			if (row_slot) row_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (row_slot) {
    				row_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (row_slot) {
    				if (row_slot.p && (!current || dirty[0] & /*dataFunc*/ 2 | dirty[1] & /*$$scope*/ 1)) {
    					update_slot_base(
    						row_slot,
    						row_slot_template,
    						ctx,
    						/*$$scope*/ ctx[31],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[31])
    						: get_slot_changes(row_slot_template, /*$$scope*/ ctx[31], dirty, get_row_slot_changes),
    						get_row_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (row_slot) row_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(100:16) {#each response as data, index}",
    		ctx
    	});

    	return block;
    }

    // (97:31)                   <PlaceholderRow placeholderHeight={placeholderHeight}
    function create_pending_block_1(ctx) {
    	let placeholderrow;
    	let current;

    	placeholderrow = new Placeholder_row({
    			props: {
    				placeholderHeight: /*placeholderHeight*/ ctx[25]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(placeholderrow.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(placeholderrow, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const placeholderrow_changes = {};
    			if (dirty[0] & /*placeholderHeight*/ 33554432) placeholderrow_changes.placeholderHeight = /*placeholderHeight*/ ctx[25];
    			placeholderrow.$set(placeholderrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(placeholderrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(placeholderrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(placeholderrow, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block_1.name,
    		type: "pending",
    		source: "(97:31)                   <PlaceholderRow placeholderHeight={placeholderHeight}",
    		ctx
    	});

    	return block;
    }

    // (105:8) {#if dataPageFunc}
    function create_if_block(ctx) {
    	let await_block_anchor;
    	let current;

    	let info_1 = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: false,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 35,
    		blocks: [,,,]
    	};

    	handle_promise(/*readDataPage*/ ctx[28](), info_1);

    	const block = {
    		c: function create() {
    			await_block_anchor = empty();
    			info_1.block.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, await_block_anchor, anchor);
    			info_1.block.m(target, info_1.anchor = anchor);
    			info_1.mount = () => await_block_anchor.parentNode;
    			info_1.anchor = await_block_anchor;
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			update_await_block_branch(info_1, ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info_1.block);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info_1.blocks[i];
    				transition_out(block);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(await_block_anchor);
    			info_1.block.d(detaching);
    			info_1.token = null;
    			info_1 = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(105:8) {#if dataPageFunc}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script lang="ts">import PlaceholderRow from "./data-grid/placeholder-row.svelte";  export let headers = [];  export let dataFunc = undefined;  export let dataPageFunc = undefined;  export let primary = false;  export let secondary = false;  export let success = false;  export let danger = false;  export let warning = false;  export let info = false;  export let light = false;  export let dark = false;  export let striped = false;  export let stripedColumns = false;  export let hover = false;  export let bordered = false;  export let borderless = false;  export let small = false;  export let responsive = false;  export let responsiveSm = false;  export let responsiveMd = false;  export let responsiveLg = false;  export let responsiveXl = false;  export let responsiveXxl = false;  export let caption = "";  export let headerGroupDivider = false;  export let placeholderHeight = "50vh";  export let take = 50;  export let pagerVerticalPos = "top";  export let pagerHorizontalPos = "end";  let skip = 0;  let count;  async function readDataPage() {      if (!dataPageFunc) {          return [];      }
    function create_catch_block(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(1:0) <script lang=\\\"ts\\\">import PlaceholderRow from \\\"./data-grid/placeholder-row.svelte\\\";  export let headers = [];  export let dataFunc = undefined;  export let dataPageFunc = undefined;  export let primary = false;  export let secondary = false;  export let success = false;  export let danger = false;  export let warning = false;  export let info = false;  export let light = false;  export let dark = false;  export let striped = false;  export let stripedColumns = false;  export let hover = false;  export let bordered = false;  export let borderless = false;  export let small = false;  export let responsive = false;  export let responsiveSm = false;  export let responsiveMd = false;  export let responsiveLg = false;  export let responsiveXl = false;  export let responsiveXxl = false;  export let caption = \\\"\\\";  export let headerGroupDivider = false;  export let placeholderHeight = \\\"50vh\\\";  export let take = 50;  export let pagerVerticalPos = \\\"top\\\";  export let pagerHorizontalPos = \\\"end\\\";  let skip = 0;  let count;  async function readDataPage() {      if (!dataPageFunc) {          return [];      }",
    		ctx
    	});

    	return block;
    }

    // (108:12) {:then response}
    function create_then_block(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*response*/ ctx[35];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*readDataPage*/ 268435456 | dirty[1] & /*$$scope*/ 1) {
    				each_value = /*response*/ ctx[35];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(108:12) {:then response}",
    		ctx
    	});

    	return block;
    }

    // (109:16) {#each response as data, index}
    function create_each_block(ctx) {
    	let current;
    	const row_slot_template = /*#slots*/ ctx[32].row;
    	const row_slot = create_slot(row_slot_template, ctx, /*$$scope*/ ctx[31], get_row_slot_context_1);

    	const block = {
    		c: function create() {
    			if (row_slot) row_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (row_slot) {
    				row_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (row_slot) {
    				if (row_slot.p && (!current || dirty[1] & /*$$scope*/ 1)) {
    					update_slot_base(
    						row_slot,
    						row_slot_template,
    						ctx,
    						/*$$scope*/ ctx[31],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[31])
    						: get_slot_changes(row_slot_template, /*$$scope*/ ctx[31], dirty, get_row_slot_changes_1),
    						get_row_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (row_slot) row_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(109:16) {#each response as data, index}",
    		ctx
    	});

    	return block;
    }

    // (106:35)                   <PlaceholderRow placeholderHeight={placeholderHeight}
    function create_pending_block(ctx) {
    	let placeholderrow;
    	let current;

    	placeholderrow = new Placeholder_row({
    			props: {
    				placeholderHeight: /*placeholderHeight*/ ctx[25]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(placeholderrow.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(placeholderrow, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const placeholderrow_changes = {};
    			if (dirty[0] & /*placeholderHeight*/ 33554432) placeholderrow_changes.placeholderHeight = /*placeholderHeight*/ ctx[25];
    			placeholderrow.$set(placeholderrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(placeholderrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(placeholderrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(placeholderrow, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(106:35)                   <PlaceholderRow placeholderHeight={placeholderHeight}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let t0;
    	let table;
    	let t1;
    	let thead;
    	let tr;
    	let t2;
    	let tbody;
    	let t3;
    	let current;
    	let if_block0 = /*dataPageFunc*/ ctx[2] && /*pagerVerticalPos*/ ctx[26] == "top" && create_if_block_4(ctx);
    	let if_block1 = (/*caption*/ ctx[23] || /*$$slots*/ ctx[29].caption) && create_if_block_3(ctx);
    	let each_value_2 = /*headers*/ ctx[0];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let if_block2 = /*dataFunc*/ ctx[1] && create_if_block_1(ctx);
    	let if_block3 = /*dataPageFunc*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			table = element("table");
    			if (if_block1) if_block1.c();
    			t1 = space();
    			thead = element("thead");
    			tr = element("tr");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			tbody = element("tbody");
    			if (if_block2) if_block2.c();
    			t3 = space();
    			if (if_block3) if_block3.c();
    			add_location(tr, file$1, 84, 8, 2860);
    			add_location(thead, file$1, 83, 4, 2843);
    			toggle_class(tbody, "table-group-divider", /*headerGroupDivider*/ ctx[24]);
    			add_location(tbody, file$1, 94, 4, 3266);
    			attr_dev(table, "class", "table");
    			toggle_class(table, "table-primary", /*primary*/ ctx[3]);
    			toggle_class(table, "table-secondary", /*secondary*/ ctx[4]);
    			toggle_class(table, "table-success", /*success*/ ctx[5]);
    			toggle_class(table, "table-danger", /*danger*/ ctx[6]);
    			toggle_class(table, "table-warning", /*warning*/ ctx[7]);
    			toggle_class(table, "table-info", /*info*/ ctx[8]);
    			toggle_class(table, "table-light", /*light*/ ctx[9]);
    			toggle_class(table, "table-dark", /*dark*/ ctx[10]);
    			toggle_class(table, "table-striped", /*striped*/ ctx[11]);
    			toggle_class(table, "table-striped-columns", /*stripedColumns*/ ctx[12]);
    			toggle_class(table, "table-hover", /*hover*/ ctx[13]);
    			toggle_class(table, "table-bordered", /*bordered*/ ctx[14]);
    			toggle_class(table, "table-borderless", /*borderless*/ ctx[15]);
    			toggle_class(table, "table-sm", /*small*/ ctx[16]);
    			toggle_class(table, "caption-top", /*caption*/ ctx[23] || /*$$slots*/ ctx[29].caption);
    			toggle_class(table, "table-responsive", /*responsive*/ ctx[17]);
    			toggle_class(table, "table-responsive-sm", /*responsiveSm*/ ctx[18]);
    			toggle_class(table, "table-responsive-md", /*responsiveMd*/ ctx[19]);
    			toggle_class(table, "table-responsive-lg", /*responsiveLg*/ ctx[20]);
    			toggle_class(table, "table-responsive-xl", /*responsiveXl*/ ctx[21]);
    			toggle_class(table, "table-responsive-xxl", /*responsiveXxl*/ ctx[22]);
    			add_location(table, file$1, 55, 0, 1850);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, table, anchor);
    			if (if_block1) if_block1.m(table, null);
    			append_dev(table, t1);
    			append_dev(table, thead);
    			append_dev(thead, tr);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			append_dev(table, t2);
    			append_dev(table, tbody);
    			if (if_block2) if_block2.m(tbody, null);
    			append_dev(tbody, t3);
    			if (if_block3) if_block3.m(tbody, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*dataPageFunc*/ ctx[2] && /*pagerVerticalPos*/ ctx[26] == "top") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*caption*/ ctx[23] || /*$$slots*/ ctx[29].caption) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*caption, $$slots*/ 545259520) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(table, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (dirty[0] & /*headers*/ 1) {
    				each_value_2 = /*headers*/ ctx[0];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			if (/*dataFunc*/ ctx[1]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*dataFunc*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(tbody, t3);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*dataPageFunc*/ ctx[2]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*dataPageFunc*/ 4) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(tbody, null);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*headerGroupDivider*/ 16777216) {
    				toggle_class(tbody, "table-group-divider", /*headerGroupDivider*/ ctx[24]);
    			}

    			if (!current || dirty[0] & /*primary*/ 8) {
    				toggle_class(table, "table-primary", /*primary*/ ctx[3]);
    			}

    			if (!current || dirty[0] & /*secondary*/ 16) {
    				toggle_class(table, "table-secondary", /*secondary*/ ctx[4]);
    			}

    			if (!current || dirty[0] & /*success*/ 32) {
    				toggle_class(table, "table-success", /*success*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*danger*/ 64) {
    				toggle_class(table, "table-danger", /*danger*/ ctx[6]);
    			}

    			if (!current || dirty[0] & /*warning*/ 128) {
    				toggle_class(table, "table-warning", /*warning*/ ctx[7]);
    			}

    			if (!current || dirty[0] & /*info*/ 256) {
    				toggle_class(table, "table-info", /*info*/ ctx[8]);
    			}

    			if (!current || dirty[0] & /*light*/ 512) {
    				toggle_class(table, "table-light", /*light*/ ctx[9]);
    			}

    			if (!current || dirty[0] & /*dark*/ 1024) {
    				toggle_class(table, "table-dark", /*dark*/ ctx[10]);
    			}

    			if (!current || dirty[0] & /*striped*/ 2048) {
    				toggle_class(table, "table-striped", /*striped*/ ctx[11]);
    			}

    			if (!current || dirty[0] & /*stripedColumns*/ 4096) {
    				toggle_class(table, "table-striped-columns", /*stripedColumns*/ ctx[12]);
    			}

    			if (!current || dirty[0] & /*hover*/ 8192) {
    				toggle_class(table, "table-hover", /*hover*/ ctx[13]);
    			}

    			if (!current || dirty[0] & /*bordered*/ 16384) {
    				toggle_class(table, "table-bordered", /*bordered*/ ctx[14]);
    			}

    			if (!current || dirty[0] & /*borderless*/ 32768) {
    				toggle_class(table, "table-borderless", /*borderless*/ ctx[15]);
    			}

    			if (!current || dirty[0] & /*small*/ 65536) {
    				toggle_class(table, "table-sm", /*small*/ ctx[16]);
    			}

    			if (!current || dirty[0] & /*caption, $$slots*/ 545259520) {
    				toggle_class(table, "caption-top", /*caption*/ ctx[23] || /*$$slots*/ ctx[29].caption);
    			}

    			if (!current || dirty[0] & /*responsive*/ 131072) {
    				toggle_class(table, "table-responsive", /*responsive*/ ctx[17]);
    			}

    			if (!current || dirty[0] & /*responsiveSm*/ 262144) {
    				toggle_class(table, "table-responsive-sm", /*responsiveSm*/ ctx[18]);
    			}

    			if (!current || dirty[0] & /*responsiveMd*/ 524288) {
    				toggle_class(table, "table-responsive-md", /*responsiveMd*/ ctx[19]);
    			}

    			if (!current || dirty[0] & /*responsiveLg*/ 1048576) {
    				toggle_class(table, "table-responsive-lg", /*responsiveLg*/ ctx[20]);
    			}

    			if (!current || dirty[0] & /*responsiveXl*/ 2097152) {
    				toggle_class(table, "table-responsive-xl", /*responsiveXl*/ ctx[21]);
    			}

    			if (!current || dirty[0] & /*responsiveXxl*/ 4194304) {
    				toggle_class(table, "table-responsive-xxl", /*responsiveXxl*/ ctx[22]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(table);
    			if (if_block1) if_block1.d();
    			destroy_each(each_blocks, detaching);
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Data_grid', slots, ['caption','row']);
    	const $$slots = compute_slots(slots);
    	let { headers = [] } = $$props;
    	let { dataFunc = undefined } = $$props;
    	let { dataPageFunc = undefined } = $$props;
    	let { primary = false } = $$props;
    	let { secondary = false } = $$props;
    	let { success = false } = $$props;
    	let { danger = false } = $$props;
    	let { warning = false } = $$props;
    	let { info = false } = $$props;
    	let { light = false } = $$props;
    	let { dark = false } = $$props;
    	let { striped = false } = $$props;
    	let { stripedColumns = false } = $$props;
    	let { hover = false } = $$props;
    	let { bordered = false } = $$props;
    	let { borderless = false } = $$props;
    	let { small = false } = $$props;
    	let { responsive = false } = $$props;
    	let { responsiveSm = false } = $$props;
    	let { responsiveMd = false } = $$props;
    	let { responsiveLg = false } = $$props;
    	let { responsiveXl = false } = $$props;
    	let { responsiveXxl = false } = $$props;
    	let { caption = "" } = $$props;
    	let { headerGroupDivider = false } = $$props;
    	let { placeholderHeight = "50vh" } = $$props;
    	let { take = 50 } = $$props;
    	let { pagerVerticalPos = "top" } = $$props;
    	let { pagerHorizontalPos = "end" } = $$props;
    	let skip = 0;
    	let count;

    	async function readDataPage() {
    		if (!dataPageFunc) {
    			return [];
    		}

    		const result = await dataPageFunc(skip, take);
    		count = result.count;
    		return result.page;
    	}

    	const writable_props = [
    		'headers',
    		'dataFunc',
    		'dataPageFunc',
    		'primary',
    		'secondary',
    		'success',
    		'danger',
    		'warning',
    		'info',
    		'light',
    		'dark',
    		'striped',
    		'stripedColumns',
    		'hover',
    		'bordered',
    		'borderless',
    		'small',
    		'responsive',
    		'responsiveSm',
    		'responsiveMd',
    		'responsiveLg',
    		'responsiveXl',
    		'responsiveXxl',
    		'caption',
    		'headerGroupDivider',
    		'placeholderHeight',
    		'take',
    		'pagerVerticalPos',
    		'pagerHorizontalPos'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Data_grid> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('headers' in $$props) $$invalidate(0, headers = $$props.headers);
    		if ('dataFunc' in $$props) $$invalidate(1, dataFunc = $$props.dataFunc);
    		if ('dataPageFunc' in $$props) $$invalidate(2, dataPageFunc = $$props.dataPageFunc);
    		if ('primary' in $$props) $$invalidate(3, primary = $$props.primary);
    		if ('secondary' in $$props) $$invalidate(4, secondary = $$props.secondary);
    		if ('success' in $$props) $$invalidate(5, success = $$props.success);
    		if ('danger' in $$props) $$invalidate(6, danger = $$props.danger);
    		if ('warning' in $$props) $$invalidate(7, warning = $$props.warning);
    		if ('info' in $$props) $$invalidate(8, info = $$props.info);
    		if ('light' in $$props) $$invalidate(9, light = $$props.light);
    		if ('dark' in $$props) $$invalidate(10, dark = $$props.dark);
    		if ('striped' in $$props) $$invalidate(11, striped = $$props.striped);
    		if ('stripedColumns' in $$props) $$invalidate(12, stripedColumns = $$props.stripedColumns);
    		if ('hover' in $$props) $$invalidate(13, hover = $$props.hover);
    		if ('bordered' in $$props) $$invalidate(14, bordered = $$props.bordered);
    		if ('borderless' in $$props) $$invalidate(15, borderless = $$props.borderless);
    		if ('small' in $$props) $$invalidate(16, small = $$props.small);
    		if ('responsive' in $$props) $$invalidate(17, responsive = $$props.responsive);
    		if ('responsiveSm' in $$props) $$invalidate(18, responsiveSm = $$props.responsiveSm);
    		if ('responsiveMd' in $$props) $$invalidate(19, responsiveMd = $$props.responsiveMd);
    		if ('responsiveLg' in $$props) $$invalidate(20, responsiveLg = $$props.responsiveLg);
    		if ('responsiveXl' in $$props) $$invalidate(21, responsiveXl = $$props.responsiveXl);
    		if ('responsiveXxl' in $$props) $$invalidate(22, responsiveXxl = $$props.responsiveXxl);
    		if ('caption' in $$props) $$invalidate(23, caption = $$props.caption);
    		if ('headerGroupDivider' in $$props) $$invalidate(24, headerGroupDivider = $$props.headerGroupDivider);
    		if ('placeholderHeight' in $$props) $$invalidate(25, placeholderHeight = $$props.placeholderHeight);
    		if ('take' in $$props) $$invalidate(30, take = $$props.take);
    		if ('pagerVerticalPos' in $$props) $$invalidate(26, pagerVerticalPos = $$props.pagerVerticalPos);
    		if ('pagerHorizontalPos' in $$props) $$invalidate(27, pagerHorizontalPos = $$props.pagerHorizontalPos);
    		if ('$$scope' in $$props) $$invalidate(31, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		PlaceholderRow: Placeholder_row,
    		headers,
    		dataFunc,
    		dataPageFunc,
    		primary,
    		secondary,
    		success,
    		danger,
    		warning,
    		info,
    		light,
    		dark,
    		striped,
    		stripedColumns,
    		hover,
    		bordered,
    		borderless,
    		small,
    		responsive,
    		responsiveSm,
    		responsiveMd,
    		responsiveLg,
    		responsiveXl,
    		responsiveXxl,
    		caption,
    		headerGroupDivider,
    		placeholderHeight,
    		take,
    		pagerVerticalPos,
    		pagerHorizontalPos,
    		skip,
    		count,
    		readDataPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('headers' in $$props) $$invalidate(0, headers = $$props.headers);
    		if ('dataFunc' in $$props) $$invalidate(1, dataFunc = $$props.dataFunc);
    		if ('dataPageFunc' in $$props) $$invalidate(2, dataPageFunc = $$props.dataPageFunc);
    		if ('primary' in $$props) $$invalidate(3, primary = $$props.primary);
    		if ('secondary' in $$props) $$invalidate(4, secondary = $$props.secondary);
    		if ('success' in $$props) $$invalidate(5, success = $$props.success);
    		if ('danger' in $$props) $$invalidate(6, danger = $$props.danger);
    		if ('warning' in $$props) $$invalidate(7, warning = $$props.warning);
    		if ('info' in $$props) $$invalidate(8, info = $$props.info);
    		if ('light' in $$props) $$invalidate(9, light = $$props.light);
    		if ('dark' in $$props) $$invalidate(10, dark = $$props.dark);
    		if ('striped' in $$props) $$invalidate(11, striped = $$props.striped);
    		if ('stripedColumns' in $$props) $$invalidate(12, stripedColumns = $$props.stripedColumns);
    		if ('hover' in $$props) $$invalidate(13, hover = $$props.hover);
    		if ('bordered' in $$props) $$invalidate(14, bordered = $$props.bordered);
    		if ('borderless' in $$props) $$invalidate(15, borderless = $$props.borderless);
    		if ('small' in $$props) $$invalidate(16, small = $$props.small);
    		if ('responsive' in $$props) $$invalidate(17, responsive = $$props.responsive);
    		if ('responsiveSm' in $$props) $$invalidate(18, responsiveSm = $$props.responsiveSm);
    		if ('responsiveMd' in $$props) $$invalidate(19, responsiveMd = $$props.responsiveMd);
    		if ('responsiveLg' in $$props) $$invalidate(20, responsiveLg = $$props.responsiveLg);
    		if ('responsiveXl' in $$props) $$invalidate(21, responsiveXl = $$props.responsiveXl);
    		if ('responsiveXxl' in $$props) $$invalidate(22, responsiveXxl = $$props.responsiveXxl);
    		if ('caption' in $$props) $$invalidate(23, caption = $$props.caption);
    		if ('headerGroupDivider' in $$props) $$invalidate(24, headerGroupDivider = $$props.headerGroupDivider);
    		if ('placeholderHeight' in $$props) $$invalidate(25, placeholderHeight = $$props.placeholderHeight);
    		if ('take' in $$props) $$invalidate(30, take = $$props.take);
    		if ('pagerVerticalPos' in $$props) $$invalidate(26, pagerVerticalPos = $$props.pagerVerticalPos);
    		if ('pagerHorizontalPos' in $$props) $$invalidate(27, pagerHorizontalPos = $$props.pagerHorizontalPos);
    		if ('skip' in $$props) skip = $$props.skip;
    		if ('count' in $$props) count = $$props.count;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		headers,
    		dataFunc,
    		dataPageFunc,
    		primary,
    		secondary,
    		success,
    		danger,
    		warning,
    		info,
    		light,
    		dark,
    		striped,
    		stripedColumns,
    		hover,
    		bordered,
    		borderless,
    		small,
    		responsive,
    		responsiveSm,
    		responsiveMd,
    		responsiveLg,
    		responsiveXl,
    		responsiveXxl,
    		caption,
    		headerGroupDivider,
    		placeholderHeight,
    		pagerVerticalPos,
    		pagerHorizontalPos,
    		readDataPage,
    		$$slots,
    		take,
    		$$scope,
    		slots
    	];
    }

    class Data_grid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$1,
    			create_fragment$1,
    			safe_not_equal,
    			{
    				headers: 0,
    				dataFunc: 1,
    				dataPageFunc: 2,
    				primary: 3,
    				secondary: 4,
    				success: 5,
    				danger: 6,
    				warning: 7,
    				info: 8,
    				light: 9,
    				dark: 10,
    				striped: 11,
    				stripedColumns: 12,
    				hover: 13,
    				bordered: 14,
    				borderless: 15,
    				small: 16,
    				responsive: 17,
    				responsiveSm: 18,
    				responsiveMd: 19,
    				responsiveLg: 20,
    				responsiveXl: 21,
    				responsiveXxl: 22,
    				caption: 23,
    				headerGroupDivider: 24,
    				placeholderHeight: 25,
    				take: 30,
    				pagerVerticalPos: 26,
    				pagerHorizontalPos: 27
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Data_grid",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get headers() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set headers(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dataFunc() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dataFunc(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dataPageFunc() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dataPageFunc(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primary() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primary(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get secondary() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set secondary(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get success() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set success(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get danger() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set danger(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warning() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warning(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get info() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set info(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dark() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dark(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get striped() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set striped(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stripedColumns() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stripedColumns(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hover() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hover(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bordered() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bordered(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get borderless() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set borderless(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get small() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set small(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsive() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsive(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsiveSm() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsiveSm(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsiveMd() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsiveMd(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsiveLg() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsiveLg(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsiveXl() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsiveXl(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsiveXxl() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsiveXxl(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get caption() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set caption(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get headerGroupDivider() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set headerGroupDivider(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholderHeight() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholderHeight(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get take() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set take(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pagerVerticalPos() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pagerVerticalPos(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pagerHorizontalPos() {
    		throw new Error("<Data_grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pagerHorizontalPos(value) {
    		throw new Error("<Data_grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const _fetch = async (url, method, func, content, raw = false) => {
        let init;
        if (content) {
            init = {
                headers: func == "json" ?
                    { "Accept": "application/json", "Content-Type": "application/json" } :
                    { "Accept": "text/plain; charset=utf-8", "Content-Type": "text/plain; charset=utf-8" },
                method,
                body: JSON.stringify(content)
            };
        }
        else {
            init = { method };
        }
        const response = await fetch(url, init);
        if (response.status == 401) {
            //
            // if we get unauthorized status, reload the entire page so that backend redirects to a user friendly /401 page
            //
            document.location.reload();
            return raw == false ? await response[func]() : response;
        }
        if (raw) {
            return response;
        }
        if (response.ok) {
            return await response[func]();
        }
        try {
            const error = (await response.text()).split("\n")[0];
            sessionStorage.setItem(errorKey, error);
        }
        catch (_a) { }
        document.location.assign(urls.errorUrl);
    };
    const parseQuery = (query) => Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join('&');
    const parseUrl = (url, query = null) => query ? `${url}?${parseQuery(query)}` : url;
    const get = async (url, query = null) => _fetch(parseUrl(url, query), "GET", "json");

    /* App\companies.svelte generated by Svelte v3.52.0 */
    const file = "App\\companies.svelte";

    // (12:12) 
    function create_row_slot(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*data*/ ctx[1].name + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*data*/ ctx[1].companyline + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*data*/ ctx[1].about + "";
    	let t4;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			add_location(td0, file, 12, 16, 533);
    			add_location(td1, file, 13, 16, 571);
    			add_location(td2, file, 14, 16, 616);
    			attr_dev(tr, "slot", "row");
    			add_location(tr, file, 11, 12, 491);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 2 && t0_value !== (t0_value = /*data*/ ctx[1].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*data*/ 2 && t2_value !== (t2_value = /*data*/ ctx[1].companyline + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*data*/ 2 && t4_value !== (t4_value = /*data*/ ctx[1].about + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_row_slot.name,
    		type: "slot",
    		source: "(12:12) ",
    		ctx
    	});

    	return block;
    }

    // (8:0) <Layout>
    function create_default_slot(ctx) {
    	let div;
    	let datagrid;
    	let current;

    	datagrid = new Data_grid({
    			props: {
    				dataPageFunc: /*getCompanies*/ ctx[0],
    				take: 10,
    				pagerHorizontalPos: "end",
    				hover: true,
    				striped: true,
    				bordered: true,
    				$$slots: {
    					row: [
    						create_row_slot,
    						({ data }) => ({ 1: data }),
    						({ data }) => data ? 2 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(datagrid.$$.fragment);
    			attr_dev(div, "class", "main container-fluid pt-4");
    			add_location(div, file, 8, 4, 330);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(datagrid, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const datagrid_changes = {};

    			if (dirty & /*$$scope, data*/ 6) {
    				datagrid_changes.$$scope = { dirty, ctx };
    			}

    			datagrid.$set(datagrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(datagrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(datagrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(datagrid);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(8:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let layout;
    	let current;

    	layout = new Offcanvas_layout({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Companies', slots, []);
    	const getCompanies = (skip, take) => get(urls.companiesSearchUrl, { search: "", skip, take });
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Companies> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Layout: Offcanvas_layout,
    		DataGrid: Data_grid,
    		urls,
    		get,
    		getCompanies
    	});

    	return [getCompanies];
    }

    class Companies extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Companies",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /// <reference types="svelte" />
    var Companies_entry = new Companies({ target: document.body });

    return Companies_entry;

})();
//# sourceMappingURL=companies.js.map
