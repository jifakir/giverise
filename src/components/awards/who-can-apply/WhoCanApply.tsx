import React, { useState } from 'react'
import { options, states } from '../../../dummy/data';
import { awardForm } from '../../../pages/awards/create';
import { CustomTagInput } from '../custom-tag-input';
import { MultiSelectCheckBox } from '../multi-select-checkbox';

type WhoProps = {
    fromModal?: boolean
    onChangeHandler: (name: string, val: any) => void
    state: awardForm
};

const WhoCanApply = ({ fromModal = false, state, onChangeHandler  }:WhoProps ) => {

    const [selectedRegion, setSelectedRegion] = useState<'worldwide' | 'us' | 'local' | string>('');
    const regionHandler = (v:string) => {
        setSelectedRegion(v as string);
        onChangeHandler('region', v);
    };

    return (
        <>
            {fromModal ? (
                <p className='text-xs text-body text-opacity-60 my-6'>
                    These location preferences will be displayed to applicants and the puboic, but anyone can submit applications.
                </p>
            ) : (
                <>
                    <h3 className='text-[22px] font-bold text-primary leading-8 mb-2'>
                        Who can apply to your award?
                    </h3>
                    <p className='text-secondary font-normal text-sm mb-7'>
                        This helps yourscholarship stand out to the right candidates.
                    </p>
                </>
            )}
            <div className="grid gap-4 grid-cols-3 mb-4 smMax:grid-cols-1 smMax:hidden">
                {options.map(option => (
                    <button key={option.region} onClick={() => setSelectedRegion(option.region)} className={`p-6 rounded-lg ${selectedRegion === option.region ? 'bg-primary-purple' : 'bg-primary-purple bg-opacity-5 hover:bg-primary-purple'}  text-center group `}>
                        <h3 className={`mb-6 text-base font-bold ${selectedRegion === option.region ? 'text-white' : 'group-hover:text-white text-primary'}`}>{option.title}</h3>
                        <p className={`text-xs font-normal ${selectedRegion === option.region ? 'text-white' : 'group-hover:text-white text-primary'}`}>
                            {option.description}
                        </p>
                    </button>
                ))}
            </div>
            <div className="mb-4 hidden smMax:block">
                <MultiSelectCheckBox
                    label={<label className='text-sm text-primary font-bold block mb-2'>Who can apply</label>}
                    options={[
                        {
                            label: 'US only',
                            value: 'us',
                        },
                        {
                            label: 'World wide',
                            value: 'worldwide',
                        },
                        {
                            label: 'My country of origin',
                            value: 'local',
                        },
                    ]}
                    value={selectedRegion}
                    customOption={false}
                    mode='single'
                    hideSearch={true}
                    placeholder='Select'
                    // inputClass='border-0 focus:bg-white'
                    onChange={v => regionHandler(v as string)}
                />
            </div>
            {selectedRegion === 'us' ? (
                <>
                    <MultiSelectCheckBox
                        label={(
                            <label className="flex items-center mb-2">
                                <strong className="mr-2">States</strong>
                                (optional)
                            </label>
                        )}
                        placeholder='Add states'
                        options={states}
                        onChange={(v) => onChangeHandler('states', v)}
                        className="mb-5"
                    />

                    <MultiSelectCheckBox
                        label={(
                            <label className="flex items-center mb-2">
                                <strong className="mr-2">Nationalities</strong>
                                (optional)
                            </label>
                        )}
                        placeholder='Add nationalities'
                        options={states}
                        onChange={(v) => onChangeHandler("nationalities",v)}
                        className="mb-5"
                    />
                </>
            ) : null}

            {selectedRegion === 'local' ? (
                <>
                    <MultiSelectCheckBox
                        label={(
                            <label className="flex items-center mb-2">
                                <strong className="mr-2">Country</strong>
                                (optional)
                            </label>
                        )}
                        placeholder='Add country'
                        options={states}
                        onChange={(v) => onChangeHandler('country', v)}
                        className="mb-5"
                    />

                    <MultiSelectCheckBox
                        label={(
                            <label className="flex items-center mb-2">
                                <strong className="mr-2">Nationalities</strong>
                                (optional)
                            </label>
                        )}
                        placeholder='Add nationalities'
                        options={states}
                        onChange={(v) => onChangeHandler('nationalities', v)}
                        className="mb-5"
                    />

                    <CustomTagInput
                        label={(
                            <div className="flex mb-2 flex-col">
                                <span>
                                    <strong className="mr-2">Tags</strong>
                                    (optional)
                                </span>
                                <p className='text-xs text-body'>Improve discoverability of your awards by adding tags relevant to the subject matter.</p>
                            </div>
                        )}
                        onChange={(v) => onChangeHandler('tags', v)}
                    />
                </>
            ) : null}

            {!fromModal && (
                <p className='text-xs text-body text-opacity-60 my-6'>These location preferences will be displayed to applicants and the puboic, but anyone can submit applications.</p>
            )}
        </>
    );
}

export default WhoCanApply;