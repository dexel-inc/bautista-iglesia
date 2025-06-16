import React from 'react'
import ZelleIco from '@/components/atoms/ZelleIco.tsx';
import { Trans, useTranslation } from 'react-i18next';

const DonationSection = () => {
  const { t } = useTranslation();

  return (
    <section id="donations" className="px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-center justify-between">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold title title-color mb-6">
            { t('common.support') } <span className="text-orange-500">{ t('common.our_ministry') }</span>
          </h2>

          <p className="mb-4 leading-relaxed">
            <Trans i18nKey='support.description' />
          </p>

          <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
            <span className="font-bold">
              { t('support.thanks') }
            </span>
          </div>
        </div>

        <div className="flex-1 w-full md:max-w-md">
          <div className="bg-white rounded-2xl border-1 border-gray-200 md:border-none shadow-md p-6 mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="content-center w-full">
                <ZelleIco className="w-20 h-20" />
              </div>
              <div className="text-left w-full">
                <p className="text-sm title-color font-semibold">
                  { t('common.inputs.name.field') }:
                </p>
                <p className="mb-2 text-sm">
                  [Nombre del receptor]
                </p>
                <p className="text-sm font-semibold title-color">
                  { t('common.inputs.email.field') }:
                </p>
                <p className="mb-2 text-sm">
                  ibfdeaz@gmail.com
                </p>

                <p className="text-sm font-semibold title-color">
                  { t('common.inputs.phone.field') }:
                </p>
                <p className="text-sm">
                  (520) 549-5633
                </p>
              </div>
            </div>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow">
            { t('support.support_now') }
          </button>
        </div>
      </div>
    </section>
  )
}

export default DonationSection
