import type {Directive} from "vue";
import {type Placement, type Instance, createPopper} from "@popperjs/core";
import type {StringMap} from "~/types/common";

class Container {
    private instances: StringMap<Instance> = {}
    private options: StringMap<Options> = {}

    public setInstance(id: string, instance: Instance): void {
        this.instances[id] = instance
    }

    public pullInstance(id: string): Instance|null {
        const instance = this.instances[id] || null
        delete this.instances[id]
        return instance
    }

    public setOptions(id: string, options: Options): void {
        this.options[id] = options
    }

    public getOptions(id: string): Options|null {
        return this.options[id] || null
    }

    public destroyOptions(id: string): void {
        delete this.options[id]
    }
}

const container = new Container()

type Options = {
    content: string
    placement?: Placement
    html?: boolean
}

const generateUid = () => {
    return 'tooltip-' + Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const createTooltipElement = (id: string, options: Options) => {
    const element = document.createElement('div')

    // set needed attributes
    element.id = id
    element.setAttribute('role', 'tooltip')
    element.classList.add(
        'inline-block',
        'px-3',
        'py-2',
        'text-xs',
        'font-medium',
        'text-white',
        'bg-gray-900',
        'rounded-md',
        'shadow-sm',
        'z-[125]',
        'max-w-xs'
    )

    if (options.html) {
        element.innerHTML = options.content
    } else {
        element.textContent = options.content
    }

    // create arrow element
    const arrow = document.createElement('span')

    // set needed attributes to arrow
    arrow.setAttribute('data-popper-arrow', '')
    arrow.classList.add(
        'absolute',
        'w-[8px]',
        'h-[8px]',
    )

    const square = document.createElement('span')

    // set needed attributes to square
    square.classList.add(
        'rotate-45',
        'absolute',
        'bg-gray-900',
        'w-[8px]',
        'h-[8px]',
    )

    // append square to arrow element
    arrow.appendChild(square)

    // append arrow element to the mail tooltip element
    element.appendChild(arrow)

    // append element to the end of body element
    document.body.appendChild(element)

    return element
}

export default <Directive<HTMLElement, Options>>{
    // called before bound element's attributes
    // or event listeners are applied
    created(el, binding) {
        //
    },

    // called right before the element is inserted into the DOM.
    beforeMount(el, binding) {
        //
    },

    // called when the bound element's parent component
    // and all its children are mounted.
    mounted(el, binding) {
        const id = generateUid()

        // set newly generated tooltip ID to the attribute
        el.setAttribute('data-tooltip', id)

        // set options to container
        container.setOptions(id, binding.value)

        // init events
        el.addEventListener('mouseenter', () => {
            const options = container.getOptions(id)

            if (! options) {
                return
            }

            // create new element which will present the tooltip
            const tooltip = createTooltipElement(id, options)

            // create Popper instance
            const instance = createPopper(el, tooltip, {
                placement: options.placement || 'auto',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 5],
                        },
                    },
                    {
                        name: 'arrow'
                    }
                ]
            })

            // set Popper instance to container
            container.setInstance(id, instance)
        })

        el.addEventListener('mouseleave', () => {
            const tooltip = document.getElementById(id)

            // remove HTML tooltip and caret element
            tooltip?.remove()

            // destroy Popper instance
            container.pullInstance(id)?.destroy()
        })
    },

    // called before the parent component is updated
    beforeUpdate(el, binding) {
        //
    },

    // called after the parent component and
    // all of its children have updated
    updated(el, binding) {
        const id = el.getAttribute('data-tooltip')

        if (! id) {
            return
        }

        // remove HTML tooltip element
        // because it got updated
        document.getElementById(id)?.remove()

        // set new options to container,
        // updating of options is mainly
        // done because of language switching
        container.setOptions(id, binding.value)
    },

    // called before the parent component is unmounted
    beforeUnmount(el, binding) {
        //
    },

    // called when the parent component is unmounted
    unmounted(el, binding) {
        const id = el.getAttribute('data-tooltip')

        if (! id) {
            return
        }

        // destroy Popper instance
        container.pullInstance(id)?.destroy()

        // destroy options reference
        container.destroyOptions(id)

        // remove tooltip element from the DOM
        document.getElementById(id)?.remove()
    }
}