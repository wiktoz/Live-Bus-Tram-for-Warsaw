import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import useSWR from 'swr'

const busURL = "https://www.wtp.waw.pl/wp-content/plugins/ztm-common/images/icons/autobus.svg"
const tramURL = "https://www.wtp.waw.pl/wp-content/plugins/ztm-common/images/icons/tramwaj.svg"

const fetcher = url => fetch(url).then(r => r.json())

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectStop({handleSelect, pickedLine}) {
    const [selected, setSelected] = useState(pickedLine ? pickedLine : {})

    const {data,error} = useSWR('/api/get/lines', fetcher)

    if(!data) return "Loading lines to select"
    if(error) return "No lines to select"

    const handleChildSelect = (e) => {
        setSelected(e)
        handleSelect(e)
    }

  return (
    <Listbox value={selected} onChange={(e) => handleChildSelect(e)}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Pick lines to show</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm">
              <span className="flex items-center">
                <img src={selected?.type == "bus" ? busURL : tramURL } alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected?.number}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data ? data.map((line) => (
                  <Listbox.Option
                    key={line.number}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-gray-600' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={line}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={line.type == "bus" ? busURL : tramURL } alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {line.number}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-gray-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                )) : ''}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
